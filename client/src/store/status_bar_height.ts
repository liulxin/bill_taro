import { observable, action } from "mobx";

class StatusBarHeight {
  @observable height: number = 0;
  @observable pheight: number = 0;

  @action.bound
  setHeight(height: number): void {
    this.height = height;
  }

  @action.bound
  setPHeight(height: number): void {
    this.pheight = height;
  }
}

export default new StatusBarHeight();
