import { observable, action } from "mobx";

class CurrentPage {
  @observable curSelectIndex: number = 0;
  @observable add: boolean = false;

  @action.bound
  curSelectIndexChange(index: number) {
    this.curSelectIndex = index;
  }

  @action.bound
  setAdd(bol: boolean) {
    console.log(bol)
    this.add = bol;
  }
}

export default new CurrentPage();
