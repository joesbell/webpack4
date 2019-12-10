const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    index: "./scripts/index.js"//入口文件，不配置的话默认为src目录下的index.js
  },
  output: {
    filename: "[name].[hash].bundle.js",//【name】便是入口文件名
    path: path.join(__dirname, "dist")
  },
  module: {//处理对象文件模块
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']//处理css
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "images/",
              limit: 500
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'jquery',
          chunks: 'all'
        },
        commons: {
          test: /[\\/]scripts[\\/]/,
          name: 'commons',
          chunks: 'all',
          minChunks: 1,//最小引用2次
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  plugins: [//对应插件
    new HtmlWebpackPlugin({//配置
      title: "测试",
      filename: "index.html",//输出文件名
      template: "./index.html"//以当前目录下的Index.html文件为模板生成dist/index.html文件
    }),
    new CleanWebpackPlugin(),//传入数组，删除指定目录
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}