/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'

import DateInOutCom from '../../components/date-inout-com/index.weapp'

import './index.scss'

@inject('User')
@observer
export default class Detail extends Component<any> {

  // 类型
  showCat() {
    const { User: { id, setCategorys, setCatIsOpened } } = this.props

    const data = Taro.getStorageSync('categorys')
    if (!data) {
      Taro.cloud.callFunction({
        name: "getCategory",
        data: {
          id
        }
      }).then(res => {
        setCategorys(res.result.data)
      })
    }
    setCatIsOpened(true)
  }

  componentDidMount() { }

  render() {
    let { User: { catText } } = this.props
    return (
      <View className='detail'>
        <View className='category p-40' onClick={this.showCat}>
          {catText} <AtIcon value='chevron-down' size='16' color='#FFF'></AtIcon>
        </View>
        <DateInOutCom />
      </View>
    )
  }
}