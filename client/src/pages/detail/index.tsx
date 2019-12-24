/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'
import ActionSheet from '../../components/action-sheet/index.weapp'

import './index.scss'

interface State {
  catText: string
}

@inject('User')
@observer
export default class Detail extends Component<any> {

  state: State = {
    catText: '类型'
  }

  showCat() {
    const { User: {id}} = this.props

    Taro.cloud.callFunction({
      name: "getCategory",
      data: {
        id
      }
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    let { catText } = this.state
    return (
      <View className='detail'>
        <View className='category p-40' onClick={this.showCat}>
          {catText} <AtIcon value='chevron-down' size='16' color='#FFF'></AtIcon>
        </View>
        <ActionSheet />
      </View>
    )
  }
}