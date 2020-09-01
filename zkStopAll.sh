
echo 'Stopping Zookeeper Cluster localhost:2181'
apache-zookeeper-3.6.1-bin_1/bin/zkServer.sh stop

echo 'Stopping Zookeeper Cluster localhost:2182'
apache-zookeeper-3.6.1-bin_2/bin/zkServer.sh stop

echo 'Stopping Zookeeper Cluster localhost:2183'
apache-zookeeper-3.6.1-bin_3/bin/zkServer.sh stop