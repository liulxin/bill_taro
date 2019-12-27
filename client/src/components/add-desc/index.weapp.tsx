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
export default class AddDesc extends Component<any> {
  state:State = {
    value: ''
  }

  closeHandler() {
    const { User: { setaddDescOpened } } = this.props
    setaddDescOpened(false)
  }

  change(e) {
    this.setState({
      value: e.detail.value.slice(0,30)
    })
  }

  render() {
    const { User: { addDescOpened, setaddDescValue } } = this.props
    const { value } = this.state
    const length = value.length
    return (
      <ActionSheet title='请添加备注' closeHandler={this.closeHandler.bind(this)} isOpened={addDescOpened} renderSubHeader={<View></View>} height={250}>
        <View className='inp'>
          <Input value={value} maxLength={30} placeholder='请输入备注内容' placeholderStyle={'color: #e6e6e6'} onInput={this.change}/>
        </View>
        <View className='tips'>
          <View className='leng'>{length} / 30</View>
          <View className={`conf ${length ? 'on': ''}`} onClick={() => setaddDescValue(this.state.value)}>确定</View>
        </View>
      </ActionSheet>
    )
  }
}