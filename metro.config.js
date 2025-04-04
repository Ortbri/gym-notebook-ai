// const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// // eslint-disable-next-line no-undef
// const config = getSentryExpoConfig(__dirname, {
//   //   enabled: process.env.NODE_ENV === 'production',
//   enableSourceContextInDevelopment: true,
//   annotateReactComponents: true,
// });

// // --- burnt ---
// config.resolver.sourceExts.push('mjs');
// config.resolver.sourceExts.push('cjs');
// // --- end burnt ---

// // --- sqlite ---
// config.resolver.sourceExts.push('sql');
// // --- end sqlite ---

// module.exports = config;

// Learn more https://docs.expo.io/guides/customizing-metro
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

// const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getSentryExpoConfig(__dirname, {
  enableSourceContextInDevelopment: true,
  annotateReactComponents: true,
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// metro.config.js
// ...
config.resolver.assetExts.push('pte');
config.resolver.assetExts.push('bin');
// ...

// // --- sqlite ---
// config.resolver.sourceExts.push('sql');
// // --- end sqlite ---
// turned this on for better auth
// config.resolver.unstable_enablePackageExports = true;
// add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require('@tamagui/metro-plugin');
module.exports = withTamagui(config, {
  components: ['tamagui'],
  config: './tamagui.config.ts',
  outputCSS: './tamagui-web.css',
});
