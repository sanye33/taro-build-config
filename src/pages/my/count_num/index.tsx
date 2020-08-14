import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { newAdd } from '../utils'

export default function CountNum () {
  const a = newAdd(1, 1)
  return (
    <View>
      { a }
    </View>
  )
}