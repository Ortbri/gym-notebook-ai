module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push(['@babel/plugin-proposal-export-namespace-from']);
  plugins.push([
    'react-native-unistyles/plugin',
    {
      autoProcessRoot: 'app',
      autoProcessImports: ['~/components'],
    },
  ]);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
