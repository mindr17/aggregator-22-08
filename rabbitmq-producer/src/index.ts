var amqp = require('amqplib/callback_api');

const main = async () => {
  amqp.connect('amqp://localhost', function(error0: any, connection: any) {
    if (error0) {
      throw error0;
    }

    connection.createChannel(function(error1: any, channel: any) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';
      var msg = 'Hello world';

      channel.assertQueue(queue, {
        durable: false
      });

      const mySendToQueue = async () => {
        const testRabbitMQMsg = {
          type: 'news',
          msg: {
            id: new Date(),
            date: new Date(),
            vendor: 'prime',
            ticker: 'ROSN',
            url: 'https://1prime.ru/industry_and_energy/20220908/838055637.html',
            title: `New msg at ${new Date()}`,
            text: 'Металлургический завод на Сицилии остановился из-за дороговизны энергии',
          },
        };
        const testRabbitMQMsgString = JSON.stringify(testRabbitMQMsg);

        setTimeout(() => {
          channel.sendToQueue(queue, Buffer.from(testRabbitMQMsgString));
          console.log(" [x] Sent %s", testRabbitMQMsgString);

          mySendToQueue();
        }, 10000);
      };

      mySendToQueue();

      // channel.sendToQueue(queue, Buffer.from(msg));
    });
  });
}
main();
