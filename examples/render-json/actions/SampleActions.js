import ApplicationActions from './ApplicationsActions.js';

export default class SampleActions extends ApplicationActions {
  static get routeName() {
    return 'sample';
  }

  hello() {
    this.endJSON({ test: 'HELLO FROM SYNC' });
  }

  async helloFromAsync() {
    // use await etc..
    this.endJSON({ test: 'HELLO FROM ASYNC' });
  }
}
