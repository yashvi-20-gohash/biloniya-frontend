'use server'
import { connectDB } from '@/src/lib/mongodb';
import User from '@/src/models/User';
import { generateOTP } from '../_lib/utils';
import fs from 'fs';
import path from 'path';
import { compile } from 'handlebars';
import AWS from 'aws-sdk';

// AWS SES client setup
const ses = new AWS.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    region: process.env.AWS_REGION!,
});

interface EmailParams {
    toAddress: string;
    subject: string;
    body: string;
}

// Function to send email using AWS SES
export const sendEmail = async ({
    toAddress,
    subject,
    body,
}: EmailParams): Promise<{ success: boolean; message: string }> => {
    const params = {
        Destination: { ToAddresses: [toAddress] },
        Message: {
            Body: { Html: { Data: body } },
            Subject: { Data: subject },
        },
        Source: process.env.AWS_SES_EMAIL_FROM!,
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log('Email sent successfully:', data);
        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', (error as Error).message);
        return { success: false, message: 'Error sending email. Please try again later.' };
    }
};

export const resendOTP = async (email: string) => {
    try {
        await connectDB();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, error: 'User not found or already registered!' };
        }

        // Generate a new OTP
        const otp = generateOTP();
        user.otp = otp;
        user.registerExpires = Date.now() + 600000;

        await user.save();

        const templatePath = path.join(process.cwd(), 'src/lib/templates', 'resendOtp.hbs');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        const template = compile(htmlTemplate);
        const html = template({ OTP: otp, LOGO: `${process.env.NEXTAUTH_URL}/footer-logo.png` });

        const emailResult = await sendEmail({
            toAddress: user.email,
            subject: 'Resend OTP Request',
            body: html,
        });

        if (emailResult.success) {
            return {
                success: true,
                message: 'OTP has been resent successfully. Check your email.',
            };
        } else {
            return {
                success: false,
                error: emailResult.message,
            };
        }
    } catch (e) {
        console.error('Server error:', e);
        return { success: false, error: 'Server error. Please try again.' };
    }
};
