const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// eslint-disable-next-line no-undef
const config = getSentryExpoConfig(__dirname, {
  //   enabled: process.env.NODE_ENV === 'production',
  enableSourceContextInDevelopment: true,
  annotateReactComponents: true,
});

// --- burnt ---
config.resolver.sourceExts.push('mjs');
config.resolver.sourceExts.push('cjs');
// --- end burnt ---

// --- sqlite ---
config.resolver.sourceExts.push('sql');
// --- end sqlite ---

module.exports = config;
