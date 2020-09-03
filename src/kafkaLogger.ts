const consoleLoggerProvider = (name: any) => {
  return {
    debug: console.log.bind,
    info: console.log.bind,
    warn: console.warn.bind,
    error: (msg: string) => {
      const redanduntErr = 'ignoring message ue to it bein from an old group';
      if (!msg.includes(redanduntErr)) console.error(msg);
    },
  };
};

export const initKafkaLogger: () => void = () => require('kafka-node/logging').setLoggerProvider(consoleLoggerProvider);
