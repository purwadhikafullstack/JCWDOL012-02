import passport from 'passport';
import prisma from '@/prisma';
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword } from '@/helpers/hashPassword.helper';
import { getUserWithEmail } from '@/models/user.model';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await getUserWithEmail(email);
      const isPasswordValid = comparePassword(password, user?.LocalAuth?.password!);
      if (!isPasswordValid)
        return done(null, false, {
          message: 'Wrong email or password',
        });
      return done(null, user!);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
