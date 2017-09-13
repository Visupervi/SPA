var path = require('path');
// 导入在 内存中创建HTML页面 和 自动追加 script 标签 的插件
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/main.js'), //  配置打包文件的入口文件
  output: { // 要输出的打包好的文件的存放路径和名称
    path: path.join(__dirname, './dist'), // 配置输出文件的存放路径
    filename: 'bundle.js' // 输出文件的名称
  },
  plugins: [ // 插件配置项
    new htmlWebpackPlugin({ // 创建一个 根据指定HTML模板，创建 内存页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定模板文件路径
      filename: 'index.html' // 指定创建好的文件的名称
    })
  ],
  module: { // 第三方loader模块
    rules: [ // 定义了所有第三方文件的后缀名匹配规则
      // test 是个正则表达式，表示要匹配处理的文件后缀名类型
      // use 表示，匹配到的文件，用哪些加载器去处理
      // 注意1： 当需要调用多个加载器处理文件的时候，加载器的调用规则，是从后往前一次调用，后面的加载器先执行，然后把处理的结果，返回给 前面的加载，做进一步处理，最终，最前面的一个加载器，把处理的结果，交给 webpack 去打包合并；
      // 注意2： 在 webpack 2.x 中，每个 loader ,必须带上 -loader 后缀，不能省略！
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 每一种文件类型的匹配规则，是一个对象
      { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理 scss 文件的loader， 注意：当只有一个 loader的时候，可以省略 外部的数组，直接 把 loader 名称，交给 use 属性
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 配置处理 less 文件的 loader
      // 注意：可以通过 url-loader 的limit参数，指定转换的极限值，这个值的单位是 Byte， 只有小于给定值的图片，才会被转码，如果图片大小正好等于给定值，不转码！
      { test: /\.(png|gif|jpg|jpeg|bmp)$/, use: 'url-loader?limit=10' }, // 处理路径的loader
      { test: /\.(ttf|woff|woff2|svg|eot)$/, use: 'url-loader' }, // 处理字体文件
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 注意：一定要把 node_modules 排除掉
      { test: /\.vue$/, use: 'vue-loader' } // 处理Vue组件的loader
    ]
  }
}