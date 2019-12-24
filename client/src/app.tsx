/* eslint-disable react/sort-comp */
import Taro, { Component } from '@tarojs/taro'
import { onError, Provider } from '@tarojs/mobx'
import Index from './pages/index'
import StatusBarHeight from './store/status_bar_height'
import CurrentPage from './store/current_page'
import User from './store/user_id'

import './app.scss'
import './assets/fonts/iconfont.scss'

onError(error => {
  console.log('mobx global error listener:', error)
})

const store = {
  StatusBarHeight,
  CurrentPage,
  User
}

class App extends Component {

  config: Taro.Config = {
    pages: [
      'pages/index/index',
      'pages/setting/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'biLL_taro',
      navigationBarTextStyle: 'black'
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
