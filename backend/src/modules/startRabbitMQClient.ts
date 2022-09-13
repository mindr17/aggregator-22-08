import { myEmitter } from '../modules/myEmitter';
var amqp = require('amqplib/callback_api');

export const startRabbitMQClient = () => {
  amqp.connect('amqp://localhost', function(error0: any, connection: any) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1: any, channel: any) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';
  
      channel.assertQueue(queue, {
        durable: false
      });

      console.log("RabbitMQ Client started", queue);
      
      channel.consume(
        queue,
        function(msg: any) {
          // console.log(" [x] Received %s", msg.content.toString());

          myEmitter.emit('news', msg.content.toString());
        },
        {
          noAck: true
        }
      );
    });
  });
};
