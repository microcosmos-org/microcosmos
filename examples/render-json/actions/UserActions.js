import ApplicationActions from './ApplicationsActions.js';

export default class UserActions extends ApplicationActions {
  static get routeName() {
    return 'users';
  }

  show() {
    this.render.json({ message: 'Hello from /users/show' });
  }

  /**
   * Join for SSE
   * @return {void}
   */
  joinEvent() {
    this.streamer.join('user_event', this.stream);
  }

  /**
   * Emit SSE
   * @return {void}
   */
  emitEvent() {
    this.streamer.emitEvent('user_event', this.params.searchParams.get('event'));
    this.render.txt('emitted');
  }
}
