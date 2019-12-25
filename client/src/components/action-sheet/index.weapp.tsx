import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

interface Props {
  isOpened: boolean,
  title: string,
  height?: number
}

export default class ActionSheet extends Component<any> {

  static defaultProps: Props = {
    isOpened: false,
    title: '请选择类型',
    height: 200
  }

  render() {
    const { title, height, isOpened, closeHandler } = this.props
    return (
      isOpened ? <View className='action-sheet' >
        <View className='main'>
          <View className='header'>
            {/* header */}
            <View className='head'>
              <View className='ico' onClick={closeHandler}><AtIcon value='close' size='16' color='#a8a8a8'></AtIcon></View>
              {title}
            </View>
            {/* sub-header */}
            {this.props.renderSubHeader}
          </View>
          <ScrollView style={{ height: `${height}px` }} scrollY={true}>
            {/* body */}
            {this.props.children}
          </ScrollView>
        </View>
      </View> : null
    )
  }
}