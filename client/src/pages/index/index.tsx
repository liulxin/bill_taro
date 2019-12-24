/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import CustomNav from '../../components/custom-nav/index.weapp'
import CustomTab from '../../components/custom-tab/index.weapp'

import Detail from '../detail/index'
import './index.scss'

@inject('User')
@inject('CurrentPage')
@observer
export default class Index extends Component<any> {

  config: Taro.Config = {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }

  componentWillMount() { }

  componentDidMount() {
    this.getId()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 获取用户存储id
  getId() {
    const { User: { setId } } = this.props
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        setId(res.result._id)
      })
  }

  render() {
    const {CurrentPage: {curSelectIndex}} = this.props
    console.log(curSelectIndex)
    return (
      <View className='index'>
        <CustomNav title='记账本' />
        <Detail />
        <CustomTab />
      </View>
    )
  }
}
