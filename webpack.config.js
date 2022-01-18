const path = require('path');

module.exports = {
    mode: "development",
    entry: [
        path.resolve(__dirname, './src/js/app.js'),
        path.resolve(__dirname, './src/scss/app.scss'),
    ],
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/app.js',
    },

    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '.'),
        },
        compress: true,
        port: 9000,
    },
};

