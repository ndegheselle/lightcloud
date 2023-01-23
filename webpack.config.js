import path from 'node:path'
import glob from 'glob-all'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin  from 'mini-css-extract-plugin'
import { PurgeCSSPlugin }  from 'purgecss-webpack-plugin'
import {VueLoaderPlugin} from 'vue-loader'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: './front/main.js',
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [  { loader: MiniCssExtractPlugin.loader }, "css-loader", "sass-loader"]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "styles.css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync([`./front/**/*.vue`, `./public/*.html`], { nodir: true }),
      safelist: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/, /data-v-.*/ ],
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
  },
};