/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Setting extends Component {

  config: Taro.Config = {
    navigationBarTitleText: '设置'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='setting'>
        setting
      </View>
    )
  }
}
