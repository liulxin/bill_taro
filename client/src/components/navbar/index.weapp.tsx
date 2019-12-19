import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { inject, observer } from '@tarojs/mobx'

import './index.scss'

interface defaultProps {
  title: string
}

@inject('StatusBarHeight')
@observer
class NavBar extends Component<any> {

  static defaultProps: defaultProps = {
    title: 'bill_taro'
  }

  render() {
    const { StatusBarHeight: { height }, title } = this.props
    const style = {
      'height': (height + 50) + 'Px',
      'padding-top': height + 'Px'
    }

    return (
      <View style={style} className="custom">
        <View className="title">{title}</View>
      </View>
    )
  }

  componentDidMount() {
    const { StatusBarHeight } = this.props
    // getSystemInfo
    Taro.getSystemInfo({}).then(res => {
      console.log(res)
      StatusBarHeight.setHeight(res.statusBarHeight || 0)
    })

    const rect = Taro.getMenuButtonBoundingClientRect()
    console.log(rect)
  }
}

export default NavBar