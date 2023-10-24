module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { loose: true }],
      '@babel/preset-typescript',
      'babel-preset-expo',
    ],
    plugins: [
      '@babel/plugin-transform-flow-strip-types', // Added as per your message
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ],
  };
};
