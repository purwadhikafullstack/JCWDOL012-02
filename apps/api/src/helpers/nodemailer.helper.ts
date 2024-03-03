import { configs } from '@/config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: configs.nodeMailer.host!,
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: configs.nodeMailer.user,
    pass: configs.nodeMailer.pass,
  },
});
