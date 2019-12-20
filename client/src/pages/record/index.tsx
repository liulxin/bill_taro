import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import NavBar from '../../components/navbar/index.weapp'

export default class Record extends Component {
  config: Config = {
    navigationBarTitleText: '统计',
    navigationStyle: 'custom',
    usingComponents: {}
  }

  componentWillMount () { }

  componentDidMount () { 

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <NavBar textpos="center" icon="setting"/>
        <View>统计</View>
      </View>
    )
  }
}
