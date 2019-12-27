import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import ActionSheet from '../action-sheet/index.weapp'

import './index.scss'

interface State {
  value: string
}

@inject('User')
@observer
export default class AddCat extends Component<any> {
  state:State = {
    value: ''
  }

  closeHandler() {
    const { User: { setaddCatOpened } } = this.props
    setaddCatOpened(false)
  }

  change(e) {
    this.setState({
      value: e.detail.value.slice(0,30)
    })
  }

  addCat() {
    console.log(this.state.value)
  }

  render() {
    const { User: { addCatOpened } } = this.props
    const { value } = this.state
    const length = value.length
    return (
      <ActionSheet title='请填写类别名' closeHandler={this.closeHandler.bind(this)} isOpened={addCatOpened} renderSubHeader={<View></View>} height={250}>
        <View className='inp'>
          <Input value={value} maxLength={4} placeholder='不能与已有类型名重复' placeholderStyle={'color: #e6e6e6'} onInput={this.change}/>
        </View>
        <View className='tips'>
          <View className='leng'>{length} / 4</View>
          <View className={`conf ${length ? 'on': ''}`} onClick={this.addCat}>确定</View>
        </View>
      </ActionSheet>
    )
  }
}