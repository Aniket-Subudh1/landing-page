import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD 
  }
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export const sendEmail = async ({ to, subject, html, text }: EmailOptions): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: {
        name: 'EasyMyPG',
        address: process.env.EMAIL_USER || 'noreply@easymypg.com'
      },
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '')
    })
    
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

// Email templates
export const getWaitlistConfirmationEmail = (name: string, pgName: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to EasyMyPG Waitlist</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(145deg, #ffdbe1 0%, #fff1bd 40%, #fff1bd 60%, #ffcb0f 100%);
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #2e0730, #4a154b);
          border-radius: 15px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        }
        .title {
          color: #240029;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 10px;
        }
        .subtitle {
          color: #666;
          font-size: 16px;
          margin: 0;
        }
        .content {
          margin: 30px 0;
        }
        .highlight-box {
          background: linear-gradient(145deg, #fee899, #fef3c7);
          border-radius: 15px;
          padding: 25px;
          margin: 25px 0;
          border: 1px solid #fbbf24;
        }
        .pg-details {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }
        .pg-details h3 {
          color: #240029;
          margin: 0 0 15px;
          font-size: 18px;
        }
        .detail-item {
          margin: 8px 0;
          font-size: 14px;
        }
        .detail-label {
          font-weight: 600;
          color: #555;
        }
        .cta-button {
          display: inline-block;
          background: #240029;
          color: white;
          padding: 15px 30px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          margin: 20px 0;
          transition: all 0.3s ease;
        }
        .features {
          margin: 30px 0;
        }
        .feature-item {
          display: flex;
          align-items: center;
          margin: 12px 0;
          font-size: 14px;
        }
        .feature-check {
          width: 20px;
          height: 20px;
          background: #22c55e;
          border-radius: 50%;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 14px;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          color: #240029;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 500;
        }
        @media (max-width: 480px) {
          body { padding: 10px; }
          .container { padding: 20px; }
          .title { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">E</div>
          <h1 class="title">Welcome to EasyMyPG!</h1>
          <p class="subtitle">You're now on the waitlist for India's easiest PG management app</p>
        </div>

        <div class="content">
          <div class="highlight-box">
            <h2 style="color: #240029; margin: 0 0 15px; font-size: 20px;">🎉 Congratulations ${name}!</h2>
            <p style="margin: 0; font-size: 16px; color: #333;">
              You've successfully joined the EasyMyPG waitlist. We're excited to help you transform your PG management experience!
            </p>
          </div>

          <div class="pg-details">
            <h3>📋 Your Registration Details</h3>
            <div class="detail-item">
              <span class="detail-label">PG Name:</span> ${pgName}
            </div>
            <div class="detail-item">
              <span class="detail-label">Owner/Manager:</span> ${name}
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span> <span style="color: #22c55e; font-weight: 600;">Confirmed ✓</span>
            </div>
          </div>

          <h3 style="color: #240029; margin: 25px 0 15px;">🚀 What's Next?</h3>
          <div class="features">
            <div class="feature-item">
              <div class="feature-check">1</div>
              <span>Our team will contact you within 2-3 business days</span>
            </div>
            <div class="feature-item">
              <div class="feature-check">2</div>
              <span>Get exclusive early access to EasyMyPG beta</span>
            </div>
            <div class="feature-item">
              <div class="feature-check">3</div>
              <span>Free onboarding and setup assistance</span>
            </div>
            <div class="feature-item">
              <div class="feature-check">4</div>
              <span>Priority support and feature requests</span>
            </div>
          </div>

          <h3 style="color: #240029; margin: 25px 0 15px;">💡 Why You'll Love EasyMyPG</h3>
          <div class="features">
            <div class="feature-item">
              <div class="feature-check">✓</div>
              <span><strong>15x More Revenue:</strong> Automated rent collection</span>
            </div>
            <div class="feature-item">
              <div class="feature-check">✓</div>
              <span><strong>15x Less Stress:</strong> No more manual tracking</span>
            </div>
            <div class="feature-item">
              <div class="feature-check">✓</div>
              <span><strong>Digital Everything:</strong> From complaints to payments</span>
            </div>
            <div class="feature-item">
              <div class="feature-check">✓</div>
              <span><strong>Real-time Updates:</strong> Know your room status instantly</span>
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://easymypg.com" class="cta-button" style="color: white;">
              Learn More About EasyMyPG
            </a>
          </div>
        </div>

        <div class="footer">
          <p><strong>Questions?</strong> Reply to this email or contact us:</p>
          <div class="social-links">
            <a href="mailto:support@easymypg.com">📧 support@easymypg.com</a>
            <a href="tel:+919876543210">📞 +91 98765 43210</a>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            © 2025 EasyMyPG. All rights reserved.<br>
            You received this email because you signed up for our waitlist.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export const sendWaitlistConfirmation = async (
  email: string, 
  name: string, 
  pgName: string
): Promise<boolean> => {
  const subject = `🎉 Welcome to EasyMyPG Waitlist - You're In!`
  const html = getWaitlistConfirmationEmail(name, pgName)
  
  return sendEmail({
    to: email,
    subject,
    html
  })
}