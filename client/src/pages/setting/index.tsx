/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'


export default class Setting extends Component {

  config: Taro.Config = {
    navigationBarTitleText: '设置'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onShareAppMessage() {
    return {
      title: 'taro_bill 记账本',
      path: '/pages/index/index',
      imageUrl: 'https://7975-yuntest-wcqeq-1300805509.tcb.qcloud.la/tabicon/share.jpg?1'
    }
  }

  render() {
    return (
      <View className='setting'>
        <Button className='share' openType='share'><AtIcon value='share-2' size='16' color='#1b1b1b'></AtIcon><View className='text'>把记账本推荐给朋友</View></Button>
        <Button className='sug' open-type='feedback'>我要吐个槽</Button>
      </View>
    )
  }
}
