import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'

import {tabicon_base_url} from '../../util/config'

import './index.scss'

interface List {
  key: string
  color: string
  selectColor: string
  text: string
  icon: string
  selectIcon: string
}

interface Add {
  key: string
  background: string
  icon: string
}

interface State {
  list: Array<List>,
  add: Add
}

const state: State = {
  list: [
    {
      key: 'detail',
      color: '#737375',
      selectColor: '#39b878',
      text: '明细',
      icon: tabicon_base_url + '/detail.png?1',
      selectIcon: tabicon_base_url + '/detail_a.png?1'
    },
    {
      key: 'record',
      color: '#737375',
      selectColor: '#39b878',
      text: '统计',
      icon: tabicon_base_url + '/record.png?1',
      selectIcon: tabicon_base_url + '/record_a.png?1'
    }
  ],
  add: {
    key: 'add',
    background: '#39b878',
    icon: tabicon_base_url + '/add.png?1'
  },
}

@inject('CurrentPage')
@observer
export default class CustomTab extends Component<any> {

  state: State = state

  render() {
    const { list, add } = this.state
    // curPage
    const { CurrentPage: { curSelectIndex, curSelectIndexChange, setAdd } } = this.props
    return (
      <View className='custom-tab'>
        <View className='wrap'>
          {
            list.map((item, index) => {
              return (
                <View onClick={() => curSelectIndexChange(index)} className='tab-item' key={String(item.key)}>
                  <Image className={'img ' + item.key} src={curSelectIndex === index ? item.selectIcon : item.icon}></Image>
                  <View className='text' style={`color: ${curSelectIndex === index ? item.selectColor : item.color} `}>{item.text}</View>
                </View>
              )
            })
          }
        </View>
        <View className='center' onClick={() => setAdd(true)}>
          <View className='circ'></View>
          <View className='rect'></View>
          <View className='icon-w'>
            <Image className='img' src={add.icon} mode='widthFix'></Image>
          </View>
        </View>
      </View>
    )
  }
}