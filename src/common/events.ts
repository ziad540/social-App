import {EventEmitter} from 'events'
import {sendEmail} from './email/emailService'

export const events = new EventEmitter();

type EmailConfirmationPayload = {
  to: string;
  firstName?: string;
  url: string;
}

// Listener for email confirmation requests
events.on('EmailConfirmationRequested', async (payload: EmailConfirmationPayload) => {
  const subject = 'Confirm your email';
  const html = `
    <p>Hello ${payload.firstName || ''},</p>
    <p>Thanks for signing up. Please confirm your email by clicking the link below:</p>
    <p><a href="${payload.url}">Confirm Email</a></p>
    <p>If you did not request this, you can ignore this email.</p>
  `;
  try {
    await sendEmail({ to: payload.to, subject, html });
    // eslint-disable-next-line no-console
    console.log('Confirmation email sent to', payload.to);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to send confirmation email', e);
  }
});
