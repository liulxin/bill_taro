import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

export default class DateInOutCom extends Component {
  render() {
    return (
      <View className='date-inout'>
        <View className='date'>
          <Text className='text'>{2019}年{12}月</Text>
          <AtIcon value='chevron-down' size='14' color='#c7c7c7'></AtIcon>
        </View>
        <View className='money'>
          <Text className='out'>支出¥600.00</Text>
          <Text>收入¥600.00</Text>
        </View>
      </View>
    )
  }
}