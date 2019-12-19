import Taro, { Component, Config } from '@tarojs/taro'
import { onError, Provider } from '@tarojs/mobx'
import StatusBarHeight from './store/status_bar_height'
import Index from './pages/index'

import './app.scss'

onError(error => {
  console.log('mobx global error listener:', error)
})

const store = {
  StatusBarHeight
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#41b378',
      navigationBarTextStyle: 'white',
      navigationStyle: 'custom'
    },
    cloud: true
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'yuntest-wcqeq'
      })
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
