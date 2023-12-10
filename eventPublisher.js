const amqp = require('amqplib');

async function publishEvent(user) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'userRegistrationQueue';
    const message = JSON.stringify(user);

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Event published: ${message}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error publishing event:', error);
  }
}

module.exports = publishEvent;
