import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CountNum from './count_num/index'
import { newAdd } from './utils'
import './index.scss'

interface State {
  count: number
}

export default class Index extends Component<any, State> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '我的'
  }

  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount () { 
    const newCout = newAdd(1, 2)
    this.setState({ count: newCout })
  }

  render () {
    const { count } = this.state
    return (
      <View className='index'>
        <Text>这是我的页面: {count}</Text>
        <CountNum />
      </View>
    )
  }
}
