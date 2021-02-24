MicroCosmos.JS🚀🌌
-
<b>Experimental High Performance HTTP/2 API Framework For Node.js 15 (ES6)</b>

[Example Microcosmos.js Project with simple Actions and SSE](https://github.com/microcosmos-org/microcosmos.js-sample)

Get started:
        
    npm install microcosmos.js --save
* Add `"type": "module"` in package.json.

* Generate local certificate for HTTP/2
  ```shell
  openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
  ```
* Create applications actions for shared actions logic `/actions/ApplicationsActions.js`
    ```javascript
    import { MicroAction } from 'microcosmos.js';

    export default class ApplicationActions extends MicroAction {
      // Here we put common logic for our app Action Stores
    }
    ```
* Sample Action Store: `/actions/UserActions.js`
  ```javascript
  import ApplicationActions from './ApplicationsActions.js';
  
  export default class UserActions extends ApplicationActions {
    static get routeName() {
      return 'users';
    }
  
    show() {
      this.endJSON({ message: 'Hello from /users/show' });
    }
  }
  ```
* Add Following to entry point of app e.g. index.js
    ```javascript
    import { readFileSync } from 'fs';
    import { MicroServer } from 'microcosmos.js';
    
    const cert = readFileSync('localhost-cert.pem');
    const key = readFileSync('localhost-privkey.pem');
    
    new MicroServer({ cert, key, port: 3000 }).listen();
    ```
* run `node index.js`
* go to https://localhost:3000/users/show

Actions
-
All Action Stores should be located within `/actions` folder in project root directory
and lib automatically initializes them.

Routes are <b>automatically</b> mapped to `/routeName/actionName`,
so if we have Action store `/actions/UsersAction.js` with `routeName` defined 
```javascript
static get routeName() {
  return 'users';
}
```
action `show()` defined as:
```javascript
show() {
  this.endJSON({ message: 'Hello from /users/show' });
}
```

action `show()` will be mapped to url: https://localhost:3000/users/show.
As you can see, `routeName` is defined by using <b>static</b> getter.

Actions can be sync or async
```javascript
async show() {
  const result = await someAction();
  this.endJSON({ message: 'Hello from /users/show' });
}
```

Params
-
Params object can be accessed by using `this.params`,
so if we need query urlSearchParams we access by `this.params.searchParams`.

Third part of the path is matched as `id` within params, so if we have path 
`https://localhost:3000/users/show/42` we can access `42` by:

```javascript
show() {
  this.params.id; // 42
}
```

On HTTP POST request we can access data by using `this.params.data`
```javascript
async create() {
  this.params.data; // {}
}
```
Streamer
-
Microcosmos also supports Server Sent Events, and those depend on Redis. If Redis 
has additional configuration it should be exported as object from `conifg/redis.js`
within project.

To join SSE: 
```this.streamer.join('event_name', this.stream)```within MicroActions Store.

Emit SSE: `this.streamer.emitEvent('event_name', data)`


```javascript
export default class UserActions extends ApplicationActions {
  static get routeName() {
    return 'users'
  }

  // Join for SSE
  joinEvent() {
    this.streamer.join('user_event', this.stream);
  }

  // Emit SSE
  emitEvent() {
    this.streamer.emitEvent('user_event', this.params.searchParams.get('event'));
    this.endTXT('ok');
  }
}
```
To listen for events for 'user_event' on client side you do:
```javascript
// chrome console
const event = new EventSource('/users/joinEvent');
event.onmessage = (event) => console.log(event.data);
```

and you can go to url: https://localhost:3000/users/emitEvent?event=helloFromUserEvent
and it should output `helloFromUserEvent` in the console every time you hit this link.
