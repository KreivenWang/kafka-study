
echo
echo '##########################################'
echo 'Creating topic demo'
kafka_2.13-2.6.0_1/bin/kafka-topics.sh --create --zookeeper localhost:2181,localhost:2182,localhost:2183 --replication-factor 3 --partitions 6 --topic demo
