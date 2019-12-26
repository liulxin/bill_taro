import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { inject, observer } from '@tarojs/mobx'
import './index.scss'

import {year, month} from '../../util/config'

const end = `${year}-${month}-01`

@inject('User')
@observer
export default class DateInOutCom extends Component<any> {

  MonthChange(e) {
    const {User: {setDetYearMonth}} = this.props
    setDetYearMonth(e.detail.value)
  }

  render() {
    const {User: {deTyear, deTmonth}} = this.props

    return (
      <View className='date-inout'>
        <View className='date'>
          <Picker mode='date' value='YYYY-MM' fields='month' onChange={this.MonthChange} end={end}>
            <Text className='text'>{deTyear}年{deTmonth}月</Text>
            <AtIcon value='chevron-down' size='14' color='#c7c7c7'></AtIcon>
          </Picker>
        </View>
        <View className='money'>
          <Text className='out'>支出¥600.00</Text>
          <Text>收入¥600.00</Text>
        </View>
      </View>
    )
  }
}