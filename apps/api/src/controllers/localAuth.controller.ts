import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { EmailType, sendEmail } from '@/services/sendEmail';
import { RegisterPayload, VerificationPayload } from '@/@types';
import { hashPassword } from '@/helpers/hashPassword.helper';
import generateConfirmation from '@/helpers/generateConfirmation.helper';
import dayjs from 'dayjs';
import { setRegisteringUser, updateRegisteringUser } from '@/models/user.model';

export class LocalAuthController {
  async register(req: Request, res: Response) {
    try {
      const { email }: RegisterPayload = req.body;
      const generatedConfirmationCode = generateConfirmation(20, email, EmailType.verification);

      const expiresAt = dayjs().add(1, 'hour').toDate();

      await setRegisteringUser(email, expiresAt, generatedConfirmationCode.code);

      await sendEmail(email, generatedConfirmationCode.url, EmailType.verification);

      return res
        .status(201)
        .json({ success: true, message: 'Check email inbox for confirmation, if not found please check spam.' });
    } catch (error) {
      console.log(error);
    }
  }

  async emailVerification(req: Request, res: Response) {
    try {
      const { name, email, password }: VerificationPayload = req.body;

      const hashedPassword: string = hashPassword(password);

      await updateRegisteringUser(email, name, hashedPassword);
      
      return res.status(201).json({
        success: true,
        message: 'Selamat, akun anda sudah terferifikasi',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async localLogin(req: Request | any, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      req.logIn(user, function (err: any) {
        if (err) {
          next(err);
        }
      });
      return res.status(200).send({
        success: true,
        message: 'Login success',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(req: Request | any, res: Response, next: NextFunction) {
    try {
      req.logOut(function (err: any) {
        if (err) {
          next(err);
        }
      });
      res.clearCookie('session');
      return res.status(200).send({
        message: 'Logout success',
      });
    } catch (error) {
      console.log(error);
    }
  }

  // async resendVerification(req: Request, res: Response) {
  //   try {
  //     const { email } = req.body;
  //     const generatedConfirmationCode = generateConfirmation(20, email);
  //     const expiresAt = dayjs().add(1, 'hour').toDate();
  //     await prisma.user.update({
  //       where: { email },
  //       data: {
  //         LocalAuth: {
  //           update: {
  //             confirmationCode: generatedConfirmationCode.code,
  //             confirmationTimeStamp: expiresAt,
  //           },
  //         },
  //       },
  //     });
  //     await sendEmail(email, generatedConfirmationCode.verificationUrl, EmailType.verification);
  //     return res.status(201).json({ message: 'Check email inbox for confirmation' });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
