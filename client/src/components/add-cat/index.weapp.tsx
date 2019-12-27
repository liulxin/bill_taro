import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import ActionSheet from '../action-sheet/index.weapp'

export default class AddCat extends Component {
  render() {
    return (
      <ActionSheet title='请填写类别名'>
        <View>类别</View>
      </ActionSheet>
    )
  }
}