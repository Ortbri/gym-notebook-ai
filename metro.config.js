// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// // eslint-disable-next-line no-undef
// const config = getDefaultConfig(__dirname);

// module.exports = config;

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// --- burnt ---
config.resolver.sourceExts.push('mjs');
config.resolver.sourceExts.push('cjs');
// --- end burnt ---

// --- sqlite ---
config.resolver.sourceExts.push('sql');
// --- end sqlite ---

module.exports = config;
