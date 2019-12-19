import { observable, action } from "mobx";

class StatusBarHeight {
  @observable height = 0;

  @action.bound 
  setHeight(height: number): void {
    this.height = height;
  }
}

export default new StatusBarHeight();
