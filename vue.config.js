const {defineConfig} = require('@vue/cli-service');
const webpack = require('webpack');
const assetsDir = "assets";
module.exports = defineConfig({
    transpileDependencies: true,
    css: { extract: false },
    configureWebpack: {
        output: {
            filename: assetsDir + "/weather-widget.min.js",
            chunkFilename: assetsDir + "/weather-widget.min.js"
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
        ]
    },
    chainWebpack:
        config => {
            config.optimization.delete('splitChunks')

            if (config.plugins.has("extract-css")) {
                const extractCSSPlugin = config.plugin("extract-css");
                extractCSSPlugin &&
                extractCSSPlugin.tap(() => [
                    {
                        filename: assetsDir + "/weather-widget.min.css",
                        chunkFilename: assetsDir + "/weather-widget.min.css"
                    }
                ]);
            }
        }
})
