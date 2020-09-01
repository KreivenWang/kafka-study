
echo
echo '##########################################'
echo 'Starting producer for topic demo'
kafka_2.13-2.6.0_1/bin/kafka-console-producer.sh --bootstrap-server localhost:9091,localhost:9092,localhost:9093 --topic demo
