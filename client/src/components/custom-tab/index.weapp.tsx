import Taro, { Component } from '@tarojs/taro'
import { CoverView, CoverImage } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'

import config from '../../util/config'

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

const { tabicon_base_url } = config

const state: State = {
  list: [
    {
      key: 'detail',
      color: '#737375',
      selectColor: '#39b878',
      text: '明细',
      icon: tabicon_base_url + '/detail.png',
      selectIcon: tabicon_base_url + '/detail_a.png'
    },
    {
      key: 'record',
      color: '#737375',
      selectColor: '#39b878',
      text: '统计',
      icon: tabicon_base_url + '/record.png',
      selectIcon: tabicon_base_url + '/record_a.png'
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
    // ???????? ????????
    const { CurrentPage: { curSelectIndex, curSelectIndexChange, setAdd } } = this.props
    return (
      <CoverView className='custom-tab'>
        <CoverView className='wrap'>
          {
            list.map((item, index) => {
              return (
                <CoverView onClick={() => curSelectIndexChange(index)} className='tab-item' key={index}>
                  <CoverImage className={'img ' + item.key} src={curSelectIndex === index ? item.selectIcon : item.icon}></CoverImage>
                  <CoverView className='text' style={`color: ${curSelectIndex === index ? item.selectColor : item.color} `}>{item.text}</CoverView>
                </CoverView>
              )
            })
          }
        </CoverView>
        <CoverView className='center' onClick={() => setAdd(true)}>
          <CoverView className='circ'></CoverView>
          <CoverView className='rect'></CoverView>
          <CoverView className='icon-w'>
            <CoverImage className='img' src={add.icon}></CoverImage>
          </CoverView>
        </CoverView>
      </CoverView>
    )
  }
}