import {
  Consumer,
  ConsumerGroup,
  ConsumerGroupOptions,
  HighLevelProducer,
  KafkaClient,
  KafkaClientOptions,
} from 'kafka-node';
const brokerList = 'localhost:9091,localhost:9092,localhost:9093';
const opt = {
  client: {
    kafkaHost: brokerList,
  } as KafkaClientOptions,
  topic: 'demo',
  demoConsumerOpt: {
    kafkaHost: brokerList,
    fromOffset: 'earliest',
    groupId: 'demo-test-consumer-group-1',
  } as ConsumerGroupOptions,
};
console.log(opt);
class KafkaService {
  public client: KafkaClient;
  public consumer: Consumer;
  public consumerGroup: ConsumerGroup;
  public producer: HighLevelProducer;

  init() {
    this.initClient();
    this.initConsumerGroup();
  }

  initClient() {
    this.producer?.close(() => console.log('producer closed'));
    this.client?.close(() => console.log('kafka client closed'));

    console.log('init Client');
    this.client = new KafkaClient(opt.client);
    this.client.on('brokersChanged', () => console.log(`kafka client brokersChanged`));
    this.client.on('close', () => console.log(`kafka client closed`));
    this.client.on('connect', () => console.log(`kafk aclient connect`));
    this.client.on('error', (err) => console.error(`kafka client error`, err));
    this.client.on('socket_error', (err) => console.error(`kafka client socket_error`, err));
    this.client.on('ready', () => console.log(`kafka client ready`));
    this.client.on('reconnect', () => console.log(`kafka client reconnect`));
    this.client.on('zkReconnect', () => console.log(`kafka client zkReconnect`));

    console.log('init Producer');
    this.producer = new HighLevelProducer(this.client);
    this.producer.on('ready', () => console.log('producer read'));
  }

  initConsumerGroup() {
    console.log('init consumerGroup');
    this.consumerGroup?.close(true, (err) => {
      if (err) console.error(err);
      else console.log('consumerGroup closed');
    });
    this.consumerGroup = new ConsumerGroup(opt.demoConsumerOpt, opt.topic);
    console.log(this.consumerGroup.memberId, this.consumerGroup.generationId);
  }

  consume() {
    this.consumerGroup.on('connect', () => {
      console.log(`consumerGroup ${this.consumerGroup.memberId} on connect`);
    });
    this.consumerGroup.on('error', (error) => {
      console.log(`Error while creating consumer for topic ${opt.topic}`, error);
      console.log('reinitializing kafka client/consumer/producer');
      this.init();
    });

    this.consumerGroup.on('message', (message) => {
      console.log(
        `incoming message on topic ${message.topic}, offset ${message.offset}, key ${message.key}, partition ${message.partition}, value ${message.value}`
      );
    });
    // Error Event

    this.consumerGroup.on('offsetOutOfRange', (message) => console.warn(`consumer group offsetOutOfRange`, message));
    this.consumerGroup.on('rebalanced', () => console.log(`consumer group rebalanced`));
    this.consumerGroup.on('rebalancing', () => console.log(`consumer group rebalancing`));
  }
}

const kfkSvc = new KafkaService();
kfkSvc.init();
kfkSvc.consume();
