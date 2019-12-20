import Taro, { Component, Config } from "@tarojs/taro"
import './index.scss'
import {CoverView } from "@tarojs/components"
import { AtIcon } from 'taro-ui'

class TabBar extends Component<any> {
  config: Config = {

  }

  render() {
    return (
      <CoverView className="tabbar">
        <CoverView className="wrap">
          <CoverView className="tabbar-item">明细</CoverView>
          <CoverView className="tabbar-item">统计</CoverView>
        </CoverView>
        <CoverView className="center">
          <CoverView className="circ"></CoverView>
          <CoverView className="rect"></CoverView>
          <CoverView className="icon-w"><AtIcon className="sex-icon" prefixClass='icon' value='jilu' size='18' color="#fff"></AtIcon></CoverView>
        </CoverView>
      </CoverView>
    )
  }
}

export default TabBar