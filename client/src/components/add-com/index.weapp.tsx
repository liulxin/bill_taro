import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import ActionSheet from '../action-sheet/index.weapp'
import CustomDigit from '../custom-digit/index.weapp'

import './index.scss'

@inject('CurrentPage')
@observer
export default class AddCom extends Component<any> {

  state = {
    value: 1
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  closeHandler() {
    const { CurrentPage: { setAdd } } = this.props
    setAdd(false)
  }

  render() {
    const { CurrentPage: { add } } = this.props
    return (
      <ActionSheet title='账单信息' closeHandler={this.closeHandler.bind(this)} isOpened={add} renderSubHeader={<View></View>} height={300}>
        <View>
          数字
        </View>
        <CustomDigit />
      </ActionSheet>
    )
  }
}