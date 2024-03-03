import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '@/prisma';
import { configs } from '@/config';
import passport from 'passport';
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

passport.use(
  new GoogleStrategy(
    {
      clientID: configs.google.clientID,
      clientSecret: configs.google.clientSecret,
      callbackURL: configs.google.callbackUrl,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile?._json.email;
        const user = await getUserWithEmail(email!);

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email: profile?._json.email!,
              name: profile?._json.name,
              image: profile?._json.picture,
              authType: 'Google',
              SocialAuth: {
                create: {
                  email: profile?._json.email!,
                  service: 'google',
                },
              },
            },
          });
          return done(null, newUser);
        }

        if (user) {
          done(null, user);
        }
      } catch (error: any) {
        done(null, error);
      }
    },
  ),
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
