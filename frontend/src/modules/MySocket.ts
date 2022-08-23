import { config } from '../config';
import {socketInterface} from './interfaces';

export class MySocket implements socketInterface {
  private _socket: WebSocket;

  constructor() {
    const URL = config.url;

    this._socket = new WebSocket(URL, 'echo-protocol');

    this._socket.onopen = (): void => {
      console.log('Connection open!');
    };

    this._socket.onmessage = ((event: { data: string; }) => {
      const fromBackendStr = event.data;
      const fromBackendObj = JSON.parse(fromBackendStr);
      const msgFromBackendEvent = new CustomEvent(fromBackendObj.type, { detail: fromBackendObj });
      
      window.dispatchEvent(msgFromBackendEvent);
    });

    this._socket.onclose = (event): void => {
      if (event.wasClean) {
        console.log('Connection closed!');
      } else {
        console.log('Connection failed!');
      }
      console.log(`event.code is ${event.code} because of ${event.reason}`);
    };

    this._socket.onerror = (error: any): void => {
      console.log(`error: ${error.message}`);
    };
  }

  public sendMessage(socketMsgJson: string): void {
    this._socket.send(socketMsgJson);
  }

  destroy(): void {
    this._socket.close();
  }
}
