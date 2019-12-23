import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'

import './index.scss'

interface defaultProps {
  title: string
}

@inject('StatusBarHeight')
@observer
export default class CustomNav extends Component<any> {

  static defaultProps: defaultProps = {
    title: 'bill_taro'
  }

  componentDidMount() {
    this.setHeight()
  }

  setHeight() {
    const { StatusBarHeight } = this.props
    let styleheight: number = 0
    let paddingheight: number = 0
    // getSystemInfoSync
    let systemInfo: Taro.getSystemInfoSync.Result = Taro.getSystemInfoSync()

    if (!systemInfo.statusBarHeight) {
      //开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }

    let rect: Taro.getMenuButtonBoundingClientRect.Rect | null = null
    let gap: number = 4 // 胶囊按钮上下间距
    let height: number = 32 // 胶囊高度 -- 基本固定

    try {
      rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null
      // 边界情况
      if (rect === null || !rect.width || !rect.top || !rect.left || !rect.height) {
        throw 'getMenuButtonBoundingClientRect error'
      }
      gap = rect.top - systemInfo.statusBarHeight
    } catch (error) {
      if (systemInfo.platform === 'android') {
        gap = 8
      } else if (systemInfo.platform === 'devtools') {
        if (systemInfo.system.toLowerCase().includes('ios')) {
          gap = 5.5
        } else {
          gap = 7.5
        }
      } else {
        gap = 4
      }
    }

    styleheight = systemInfo.statusBarHeight + (gap + 4) * 2 + height // 多给了4个像素的空间
    paddingheight = systemInfo.statusBarHeight - 8 // paddingTop 就多减去8

    StatusBarHeight.setHeight(styleheight)
    StatusBarHeight.setPHeight(paddingheight)
  }

  navToSetting() {
    Taro.navigateTo({
      url: '../../pages/setting/index'
    })
  }

  render() {
    const { StatusBarHeight: { height, pheight }, title } = this.props

    const style = {
      'height': height + 'Px',
      'padding-top': pheight + 'Px'
    }

    return (
      <View className='custom-nav' style={style}>
        <View className='nav-w'>
          <View className='ico' onClick={this.navToSetting}><AtIcon prefixClass='icon' value='shezhi' size='20' color='#f4fffa'></AtIcon></View>
          <View className='title'>{title}</View>
        </View>
      </View>
    )
  }
}