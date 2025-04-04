// module.exports = function (api) {
//   api.cache(true);
//   const plugins = [];

//   // plugins.push([
//   //   'react-native-unistyles/plugin',
//   //   {
//   //     autoProcessRoot: 'app',
//   //     autoProcessImports: ['~/components'],
//   //   },
//   // ]);

//   plugins.push([
//     'inline-import',
//     {
//       extensions: ['.sql'],
//     },
//   ]);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins,
//   };
// };

// module.exports = function(api) {
//   api.cache(true);

//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [["inline-import", { "extensions": [".sql"] }]] // <-- add this
//   };
// };

module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],

      // NOTE: this is only necessary if you are using reanimated for animations
      'react-native-reanimated/plugin',
    ],
  };
};
