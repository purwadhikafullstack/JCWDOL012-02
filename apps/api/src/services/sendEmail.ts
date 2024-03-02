import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/helpers/nodemailer.helper';

export enum EmailType {
  verification = 'verification',
  reset = 'reset-password',
}

export async function sendEmail(email: string, urlCode: string, type: EmailType) {
  try {
    const filePath = path.join(__dirname, '../templates', type + '.hbs');
    const source = fs.readFileSync(filePath, 'utf-8');
    const template = handlebars.compile(source);
    const html = template({
      email,
      urlCode,
    });
    await transporter.sendMail({
      from: 'alfianchabib109@gmail.com',
      to: email,
      subject: 'Wellcome to Megatronics',
      html,
    });
  } catch (error) {
    throw error;
  }
}
