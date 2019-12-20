import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { inject, observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'

import './index.scss'

interface defaultProps {
  title: string
  icon?: 'back' | 'setting'
  to?: string
  background?: string
  color?: string
  textpos?: 'center' | 'left'
}

@inject('StatusBarHeight')
@observer
class NavBar extends Component<any> {

  static defaultProps: defaultProps = {
    title: 'bill_taro',
    icon: 'setting',
    to: 'setting',
    background: '#41b378',
    color: '#f5ebea',
    textpos: 'center'
  }

  iconHandler = () => {
    const {icon} = this.props
    console.log(1)
    console.log(icon)
    console.log(Taro.getCurrentPages())
  }

  componentDidMount() {
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

  render() {
    const { StatusBarHeight: { height, pheight }, title, background, icon, color, textpos } = this.props
    const customStyle = {
      'height': height + 'Px',
      'padding-top': pheight + 'Px',
      'background-color': background,
      'color': color
    }

    let Icon
    if (icon === 'setting') {
      Icon = <AtIcon className="sex-icon" prefixClass='icon' value='shezhi' size='18'></AtIcon>
    } else if (icon === 'back') {
      Icon = <AtIcon className="sex-icon" prefixClass='icon' value='fanhui' size='18'></AtIcon>
    }


    let titleStyle
    if (textpos === 'left') {
      titleStyle = `text-align: ${textpos}; padding-left: 50pX`
    } else {
      titleStyle = `text-align: ${textpos};`
    }


    return (
      <View style={customStyle} className="custom">
        <View className="nav_w">
          <View className="icon" onClick={this.iconHandler}>{Icon}</View>
          <View className="title" style={titleStyle}>{title}</View>
        </View>
      </View>
    )
  }
}

export default NavBar