/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import CustomNav from '../../components/custom-nav/index.weapp'
import CustomTab from '../../components/custom-tab/index.weapp'
import './index.scss'

export default class Index extends Component {

  config: Taro.Config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  test() {
    Taro.navigateTo({
      url: '../setting/index'
    })
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <CustomNav title='记账本' />
        <View onClick={this.test}>index</View>

        <CustomTab />
      </View>
    )
  }
}
