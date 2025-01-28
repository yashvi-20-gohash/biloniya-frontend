declare module 'nodemailer' {
  export interface AuthOptions {
    user: string
    pass: string
  }

  export interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean // true for 465, false for other ports
    service?: string // e.g., 'gmail'
    auth?: AuthOptions
    tls?: {
      rejectUnauthorized?: boolean
      minVersion?: string
      secureProtocol?: string
    }
    debug?: boolean
  }

  export interface Transporter {
    sendMail(options: MailOptions): Promise<void>
    // Add any other methods from Transporter you may use
  }

  export interface MailOptions {
    from?: string
    to: string
    subject: string
    text?: string
    html?: string
    // Add any other options from MailOptions you may use
  }

  export function createTransport(options: TransportOptions): Transporter

  const nodemailer: {
    createTransport: typeof createTransport
  }

  export default nodemailer
}
