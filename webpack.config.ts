import path from 'path'
import config from './config.json'

export default {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader'
      }
    ]
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public/')
    },
    port: config.applicationPort,
    devMiddleware: {
      publicPath: `https://localhost:${config.applicationPort}/dist/`
    },
    hot: true
  }
}
