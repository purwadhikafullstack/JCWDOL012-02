import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { configs } from '@/config';
import { strategyHelper } from '@/helpers/strategy.helper';

const googleStrategy = new GoogleStrategy(
  {
    clientID: configs.google.clientID,
    clientSecret: configs.google.clientSecret,
    callbackURL: configs.google.callbackUrl,
    scope: ['profile', 'email'],
  },
  async (accessToken, refreshToken, profile: Profile, done) => {
    try {
      strategyHelper(profile, done);
    } catch (error: any) {
      done(null, error);
    }
  },
);

const strategies = { google: googleStrategy };
export default strategies;
