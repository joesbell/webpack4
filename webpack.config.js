const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = env => {
  return {
    entry: {
      index: "./scripts/index.js" //入口文件，不配置的话默认为src目录下的index.js,
      // index2: "./scripts/index2.js"
    },
    output: {
      filename: "[name].[hash].bundle.js", //【name】便是入口文件名
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      //处理对象文件模块
      rules: [
        {
          test: /\.(sc|sa|c)ss$/,
          use: [
            env.NODE_ENV == "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
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
      minimize: env.NODE_ENV == "production",
      minimizer: [
        new TerserPlugin({
          /* your config */
          test: /\.js(\?.*)?$/i,
          exclude: /\/node_modules/
        }),
        new OptimizeCss({})
      ],
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // commons: {
          //   test: /[\\/]scripts[\\/]/,
          //   minChunks: 1,//最小引用2次
          //   minSize: 0 // 只要超出0字节就生成一个新包
          // },
          vendor: {
            test: /[\\/]node_modules[\\/]/
          }
        }
      }
    },
    plugins: [
      //对应插件
      new CleanWebpackPlugin(), //传入数组，删除指定目录
      new HtmlWebpackPlugin({
        //配置
        title: "测试",
        filename: "index.html", //输出文件名
        template: "./index.html" //以当前目录下的Index.html文件为模板生成dist/index.html文件
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id][hash].css"
      }),
      // 热更新，热更新不是刷新
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: "./dist",
      host: "localhost",
      port: "8888",
      stats: "errors-only",
      overlay: true, //用来显示编译的错误
      open: true, //自动打开浏览器
      hot: true, //热更新，这里需要配置hotModuleReplacementPlugin插件
      historyApiFallback: {
        rewrites: [{ from: /^\/$/, to: "/dist/index.html" }]
      }
    },
    devtool:
      env.NODE_ENV === "development"
        ? "cheap-module-eval-source-map"
        : "cheap-module-source-map"
  };
};
