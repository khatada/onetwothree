var webpack = require("webpack");

module.exports = [{
    entry: {
      "index": "./src/index.tsx"
    },
    output: {
        path: __dirname,
        filename: "./build/[name].js",
    },
    module: {
      loaders: [
        { test: /\.ts(x?)$/, loader: "ts-loader" },
        //{ test: /\.css$/, loaders: ["style-loader", "css-loader"] }
      ]
    },
    target: "web",
    resolve: {
      extensions: ["", ".js", ".ts" ,".tsx"]
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
    ]
}];
