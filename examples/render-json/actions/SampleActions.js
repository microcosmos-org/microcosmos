import ApplicationActions from './ApplicationsActions.js';

export default class SampleActions extends ApplicationActions {
  static get routeName() {
    return 'sample';
  }

  hello() {
    this.render.json({ test: 'HELLO FROM SYNC' });
  }

  async helloFromAsync() {
    // use await etc..
    this.render.json({ test: 'HELLO FROM ASYNC' });
  }
}
