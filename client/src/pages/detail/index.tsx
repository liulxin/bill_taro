/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'
import ActionSheet from '../../components/action-sheet/index.weapp'

import './index.scss'

@inject('User')
@observer
export default class Detail extends Component<any> {

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

  closeHandler() {
    const { User: { setCatIsOpened } } = this.props
    setCatIsOpened(false)
  }

  componentDidMount() { }

  render() {
    let { User: { setCatId, catId, catText, outgoings, income, catIsOpened } } = this.props

    return (
      <View className='detail'>
        <View className='category p-40' onClick={this.showCat}>
          {catText} <AtIcon value='chevron-down' size='16' color='#FFF'></AtIcon>
        </View>
        <ActionSheet title='请选择类型' closeHandler={this.closeHandler.bind(this)} isOpened={catIsOpened} renderSubHeader={<View></View>} height={300}>
          <View className='bb'>
            <View className={`all item ${catId === 'all' ? 'active' : ''}`} onClick={() => setCatId('all')}>全部明细</View>
            <View className='tip'>支出</View>
            <View className='flex'>
              {
                income.map(item => <View className={`item ${catId === item._id ? 'active' : ''}`} onClick={() => setCatId(item._id)} key={String(item._id)}>{item.name}</View>)
              }
            </View>
            <View className='tip'>收入</View>
            <View className='flex'>
              {
                outgoings.map(item => <View className={`item ${catId === item._id ? 'active' : ''}`} onClick={() => setCatId(item._id)} key={String(item._id)}>{item.name}</View>)
              }
            </View>
          </View>
        </ActionSheet>
      </View>
    )
  }
}