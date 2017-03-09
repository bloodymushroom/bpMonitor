import { observable, action } from 'mobx'

class Store {
  @observable user = 'test';

  @action updateUser(user) {
    this.user = user;
  }
}

const store = new Store();

export default store
