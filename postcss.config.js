module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'nesting-rules': true // 开启嵌套规则
      },
      preserve: false // instruct all plugins to omit pre-polyfilled CSS
    },
    'cssnano': {}
  }
}
