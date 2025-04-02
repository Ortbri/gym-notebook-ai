module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push([
    'react-native-unistyles/plugin',
    {
      autoProcessRoot: 'app',
      autoProcessImports: ['~/components'],
    },
  ]);

  plugins.push([
    'inline-import',
    {
      extensions: ['.sql'],
    },
  ]);
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};

// module.exports = function(api) {
//   api.cache(true);

//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [["inline-import", { "extensions": [".sql"] }]] // <-- add this
//   };
// };
