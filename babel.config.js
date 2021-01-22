module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [[
    'flow-react-proptypes'
  ], ['@babel/plugin-proposal-decorators', { 'legacy': true }], '@babel/plugin-proposal-class-properties']
}
