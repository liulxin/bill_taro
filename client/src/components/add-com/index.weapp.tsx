import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Picker } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'
import ActionSheet from '../action-sheet/index.weapp'
import CustomDigit from '../custom-digit/index.weapp'
import { year, month, day } from '../../util/config'
import './index.scss'

interface State {
  value: string,
  get: boolean,
  confBackground_: string,
  confBackground: string,
  catId: string
  desc: string
}

@inject('CurrentPage')
@inject('User')
@observer
export default class AddCom extends Component<any> {

  state: State = {
    value: '',
    get: false,
    confBackground_: '#9ed9bd',
    confBackground: '#38b56f',
    catId: '',
    desc: ''
  }

  confirmHandler(value: string) {
    console.log(value)
  }

  inOutChange(value: boolean) {
    const { User: { income, outgoings } } = this.props
    this.setState({
      get: value,
      confBackground_: value ? '#f5d998' : '#9ed9bd',
      confBackground: value ? '#f3b93e' : '#38b56f',
      catId: value ? income[0]._id : outgoings[0]._id
    })
  }

  catIdSel(id: string) {
    this.setState({
      catId: id
    })
  }

  handleChange(value: string) {
    this.setState({
      value
    })
  }

  closeHandler() {
    const { CurrentPage: { setAdd } } = this.props
    setAdd(false)
  }

  descConfirm() {
    console.log(1)
  }

  componentDidMount() {
    const { User: { outgoings } } = this.props
    this.setState({
      catId: outgoings[0]._id
    })
  }

  render() {
    const { CurrentPage: { add }, User: { income, outgoings, setaddDescOpened } } = this.props
    const { value, get, confBackground_, confBackground, catId, desc } = this.state
    const cats = get ? income : outgoings
    return (
      <ActionSheet title='添加账单' closeHandler={this.closeHandler.bind(this)} isOpened={add} renderSubHeader={<View></View>} height={415}>
        <View className='flex jc-between p-20'>
          <View className='flex'>
            <View onClick={this.inOutChange.bind(this, false)} className={`out ${!get ? 'active' : ''}`}>支出</View>
            <View onClick={this.inOutChange.bind(this, true)} className={`in ${get ? 'active' : ''}`}>收入</View>
          </View>
          <Picker mode='date' value='YYYY-MM-DD' end={`${year}-${month}-${day}`} fields='day' onChange={(e) => { console.log(e) }}>
            <View className='date'>2019-12-27</View>
          </Picker>
        </View>
        <View className='number'>
          <View>￥{value}</View>
        </View>
        <ScrollView scrollX className='cats'>
          {
            cats.map(item => (
              <View className={`cat ${get ? 'in_' : 'out_'} ${item._id === catId ? 'active' : ''}`} key={String(item._id)} onClick={this.catIdSel.bind(this, item._id)}>
                <View className='b'>
                  <AtIcon prefixClass='icon' value={item.icon} size='18' color={item._id === catId ? '#f9fefa' : '#c6c6c6'}></AtIcon>
                </View>
                <View>{item.name}</View>
              </View>
            ))
          }
          <View className='cat catadd'>
            <View className='b'>
              <AtIcon value='add' size='18' color='#c6c6c6'></AtIcon>
            </View>
            <View>添加</View>
          </View>
        </ScrollView>
        <View className='desc'>
          <Text className='inp'>{desc}</Text>
          <Text className='lab' onClick={() => { setaddDescOpened(true) }}>{desc ? '修改' : '添加备注'}</Text>
        </View>
        <CustomDigit confBackground_={confBackground_} confBackground={confBackground} valueChange={this.handleChange.bind(this)} confirm={this.confirmHandler.bind(this)} />
      </ActionSheet>
    )
  }
}