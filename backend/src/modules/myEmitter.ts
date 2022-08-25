import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {
  constructor () {
    super();
  }
}

export const myEmitter = new EventEmitter();
