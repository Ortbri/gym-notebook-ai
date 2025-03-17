import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  trustedOrigins: ['faxtions://'],
  plugins: [expo()],
});
