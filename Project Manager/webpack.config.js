const path = require("path")
const clean = require("clean-webpack-plugin")

module.exports = {
    mode: "development",    
    entry: "./src/app.js",
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, "assets", "scripts"),
        publicPath: "assets/scripts/"
    },

    devServer: {
        static: "./" 
    },

    devtool: "eval-cheap-module-source-map",

    plugins: [
        new clean.CleanWebpackPlugin()
    ]
}