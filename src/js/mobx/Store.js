import { observable, action } from 'mobx'

class Store {
  context = this;
  canvas = null;
  @observable user = 'test';
  @observable dayRange = '30';

  @action updateUser(user) {
    this.user = user;
  }

  @action addReading(arr) {
    this.allData.push(arr);
  }

  allData = Array.from( new Array(600), (x, index) => {
    var sys = Math.floor(Math.random() * 10) + 120;
    var dia = Math.floor(Math.random() * 10) + 80;
    return [sys, dia, index]
  })

  @observable currentIndex = this.allData.length;
}

const store = new Store();

export default store
