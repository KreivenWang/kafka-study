
echo
echo '##########################################'
echo 'Consuming from demo'
kafka_2.13-2.6.0_1/bin/kafka-console-consumer.sh --bootstrap-server localhost:9091,localhost:9092,localhost:9093 --topic demo --from-beginning
