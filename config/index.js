const config = {
  projectName: 'myTaro',
  date: '2020-8-14',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }]
    ]
  },
  plugins: [],
  defineConstants: {
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain (chain, webpack, PARSE_AST_TYPE) {
      chain.merge({optimization: {
        runtimeChunk: {
          name: 'runtime'
        },
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          name: 'vendors',
          cacheGroups: {
            common: {
              chunks: 'all',
              name: (module) => {
                return !!config.isBuildPlugin ? 'plugin/common' : /my\/utils.ts$/.test(module.resource) ? 'myutils' : 'common'
              },
              minChunks: 2,
              priority: 1,
              // text: module => {
              //   const commonReg = /my\/utils.ts$/
              //   return commonReg.test(module.resource)
              // }
            },
            vendors: {
              name: !!config.isBuildPlugin ? 'plugin/vendors' : 'vendors',
              minChunks: 2,
              test: module => {
                // 如果需要自定义配置，PARSE_AST_TYPE 可以从 webpackChain 第三个参数获得
                return /[\\/]node_modules[\\/]/.test(module.resource) && module.miniType !== PARSE_AST_TYPE.COMPONENT
              },
              priority: 10
            },
            taro: {
              name: !!config.isBuildPlugin ? 'plugin/taro' : 'taro',
              test: module => {
                // buildAdapter 为当前编译的端，在配置文件中可以通过 process.env.TARO_ENV 来获取
                const taroBaseReg = new RegExp(`@tarojs[\\/]taro|@tarojs[\\/]${process.env.TARO_ENV}`)
                return taroBaseReg.test(module.context)
              },
              priority: 100
            }
          }
        }
      }})
    },
    // addChunkPages (pages) {
    //   pages.set('pages/my/index', ['myutils'])
    // }
    // commonChunks(commonChunks) {
    //   // commonChunks 的取值即为默认的公共文件名数组
    //   commonChunks.push('myutils')
    //   return commonChunks
    // }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
