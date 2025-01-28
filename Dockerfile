# Single stage: Build and runtime in the same image
FROM node:20-alpine

# Define build arguments
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_ACCOUNT_ID
ARG AWS_SES_EMAIL_FROM
ARG AWS_ECR
ARG BUCKET_URL
ARG JWT_SECRET
ARG AWS_REGION
ARG NEXTAUTH_SECRET
ARG S3_BUCKET
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SUPER_ADMIN_URL
ARG NEXT_PUBLIC_USER_URL
ARG PORT
ARG EXPIRES_IN
ARG MONGODB_URI
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_BUCKET_URL

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies with fallback for lockfile issues
RUN yarn install --frozen-lockfile || (echo "WARNING: Lockfile update required. Attempting normal install..." && yarn install) && yarn cache clean

# Copy the entire application source code
COPY . .

# Build the application
RUN yarn build

# Remove unnecessary files to reduce image size
RUN rm -rf node_modules && yarn install --production && yarn cache clean

# Set environment variables
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID
ENV AWS_SES_EMAIL_FROM=$AWS_SES_EMAIL_FROM
ENV AWS_ECR=$AWS_ECR
ENV BUCKET_URL=$BUCKET_URL
ENV JWT_SECRET=$JWT_SECRET
ENV AWS_REGION=$AWS_REGION
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV S3_BUCKET=$S3_BUCKET
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SUPER_ADMIN_URL=$NEXT_PUBLIC_SUPER_ADMIN_URL
ENV NEXT_PUBLIC_USER_URL=$NEXT_PUBLIC_USER_URL
ENV PORT=$PORT
ENV EXPIRES_IN=$EXPIRES_IN
ENV MONGODB_URI=$MONGODB_URI
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_BUCKET_URL=$NEXT_PUBLIC_BUCKET_URL

# Expose the application port
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"]