import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { add } from '../../utils/count'
import './index.scss'

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '首页'
  }



  render () {
    const num = add(1, 1)
    return (
      <View className='index'>
        <Text>Hello world! { num }</Text>
        <View onClick={() => Taro.navigateTo({url: '/pages/my/index'})} className='jump'>跳转</View>
      </View>
    )
  }
}
