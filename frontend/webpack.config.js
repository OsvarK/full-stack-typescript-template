const HtmlWebPackPlugin = require("html-webpack-plugin"); 
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../frontend/src/index.tsx'),
    output: {path: path.resolve(__dirname, '../frontend/build'), filename: 'bundle.js'},
    resolve: { extensions: ['.tsx', '.ts', '.js'] },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    plugins: [
        new HtmlWebPackPlugin({ 
            template: path.resolve(__dirname, '../frontend/src/index.html')
      }),
    ],
};