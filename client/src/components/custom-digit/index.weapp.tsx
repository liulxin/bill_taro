import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import back from './back.png'
import './index.scss'

const nums = [
  {
    num: '1',
    width: 1
  },
  {
    num: '2',
    width: 1
  },
  {
    num: '3',
    width: 1
  },
  {
    num: '4',
    width: 1
  },
  {
    num: '5',
    width: 1
  },
  {
    num: '6',
    width: 1
  },
  {
    num: '7',
    width: 1
  },
  {
    num: '8',
    width: 1
  },
  {
    num: '9',
    width: 1
  },
  {
    num: '0',
    width: 2
  },
  {
    num: '.',
    width: 1
  }
]

interface Props {
  confBackground_?: string
  confBackground?: string
  value?: string
  confirm(value: string): void
  valueChange(value: string): void
}

interface State {
  value: string
}

function ver(value: string): boolean {
  return value.includes('.')
}

export default class CustomDigit extends Component<any> {

  static defaultProps: Props = {
    confBackground_: '#9ed9bd',
    confBackground: '#38b56f',
    value: '',
    confirm: function (value) {
      console.log('def', value)
    },
    valueChange: function (value) {
      console.log('def', value)
    }
  }

  state: State = {
    value: this.props.value
  }

  confirmHandler() {
    const { confirm } = this.props
    const { value } = this.state
    console.log(confirm)
    confirm(value)
  }

  change() {
    const { value } = this.state
    this.props.valueChange(value)
  }

  // 删除
  cancelHandler() {
    const { value } = this.state
    if (!value) {
      return
    }
    this.setState({
      value: value.slice(0, value.length - 1)
    }, this.change)
  }

  // 数字点击
  numClick(num) {
    const { value } = this.state
    if (!ver(value) || (ver(value) && num !== '.')) {
      this.setState({
        value: value + num
      }, this.change)
    }
  }

  render() {
    const { confBackground_, confBackground } = this.props
    const { value } = this.state
    return (
      <View className='custom-digit flex'>
        <View className='nums'>
          <View className='nums-w flex jc-between flex-w'>
            {
              nums.map(item => (
                <View className={`num-w w${item.width} gutter`} key={item.num} onClick={this.numClick.bind(this, item.num)}>
                  <View className='num'>{item.num}</View>
                </View>
              ))
            }
          </View>
        </View>
        <View className='handle'>
          <View className='handle-w flex jc-between'>
            <View className='back-w gutter'>
              <View className='back flex' onClick={this.cancelHandler}>
                <Image src={back} mode='widthFix' className='back-img' />
              </View>
            </View>
            <View className='conf-w gutter'>
              <View className='conf flex' onClick={this.confirmHandler} style={{ 'backgroundColor': value ? confBackground : confBackground_ }}>
                确认
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
