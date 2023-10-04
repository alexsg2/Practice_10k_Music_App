module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { loose: true }], // Set loose mode here
      '@babel/preset-typescript',
      'babel-preset-expo',
    ],
    plugins: [
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ],
  };
};
