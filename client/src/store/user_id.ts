import { observable, action, computed } from "mobx";
import Taro from '@tarojs/taro'

import { Cat } from "../util/interface";

const data = Taro.getStorageSync('categorys')

class User {
  @observable id: number = 0;
  @observable catId: string = "all";
  @observable categorys: Cat[] = data ? data : [];
  @observable catIsOpened: boolean = false;

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

  @computed get income() {
    return this.categorys.filter(item => item.get);
  }

  @computed get outgoings() {
    return this.categorys.filter(item => !item.get);
  }

  @computed get catText() {
    let id = this.catId;
    let arr = this.categorys.filter(item => item._id === id);

    return arr.length ? arr[0].name : "全部明细";
  }
}

export default new User();
