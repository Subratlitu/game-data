const amqp = require('amqplib');
const fs = require('fs');

async function subscribeToEvents() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'userRegistrationQueue';

    await channel.assertQueue(queue, { durable: false });
    channel.consume(
      queue,
      (msg) => {
        const eventData = JSON.parse(msg.content.toString());
        console.log(`Received event: ${JSON.stringify(eventData)}`);

        // Log the event to a file
        fs.appendFileSync('eventLog.txt', JSON.stringify(eventData) + '\n');

        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('Error subscribing to events:', error);
  }
}

module.exports = subscribeToEvents;
