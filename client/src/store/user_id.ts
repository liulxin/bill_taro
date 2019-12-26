import { observable, action, computed } from "mobx";
import Taro from '@tarojs/taro'

import { Cat } from "../util/interface";

import {year, month} from '../util/config'

const data = Taro.getStorageSync('categorys')

class User {
  @observable id: number = 0;
  @observable catId: string = "all";
  @observable categorys: Cat[] = data ? data : [];
  @observable catIsOpened: boolean = false;
  @observable dateInOutIsOpened: boolean = false;
  @observable deTyear: number = year
  @observable deTmonth: number = month

  @action.bound
  setId(id: number) {
    this.id = id;
  }

  @action.bound
  setCatId(id: string) {
    this.catId = id;
    this.catIsOpened = false;
  }

  @action.bound
  setCategorys(arr: Cat[]) {
    Taro.setStorage({
      key: 'categorys',
      data: arr
    })
    this.categorys = arr;
  }

  @action.bound
  setCatIsOpened(bol: boolean) {
    this.catIsOpened = bol;
  }

  @action.bound
  setDetYearMonth(time: string) {
    let t = time.split('-')
    this.deTyear = Number(t[0])
    this.deTmonth = Number(t[1])
  }

  @action.bound
  setDateInOutIsOpened(bol: boolean) {
    this.dateInOutIsOpened = bol;
  }

  @computed get income() {
    return this.categorys.filter(item => item.get);
  }

  @computed get outgoings() {
    return this.categorys.filter(item => !item.get);
  }

  @computed get catText() {
    let id = this.catId;
    let arr = this.categorys.filter(item => item._id === id);

    return arr.length ? arr[0].name : "分类";
  }
}

export default new User();
