module.exports = {
  // 每行超过n列自动换行
  printWidth: 100,
  // 是否使用制表符，false表示用空格
  useTabs: false,
  // 缩进
  tabWidth: 2,
  // 结尾是否用分号
  semi: true,
  // 是否使用单引号
  singleQuote: false,
  // 是否在JSX中使用单引号
  jsxSingleQuote: false,
  // 箭头函数，如果只有一个参数，是否加括号。always加、avoid不加
  arrowParens: "always",
  // Example: true - { foo: bar }、false - {foo: bar}
  bracketSpacing: true,
  // 尾随逗号 all|es5|none，默认 all
  trailingComma: "all",
  // 设置插件，比如：tailwindcss 的格式化插件
  plugins: ["prettier-plugin-tailwindcss"],
};
