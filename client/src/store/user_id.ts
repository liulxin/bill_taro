import { observable, action } from "mobx";

class User {
  @observable id: number = 0;

  @action.bound
  setId(id: number) {
    this.id = id;
  }
}

export default new User();