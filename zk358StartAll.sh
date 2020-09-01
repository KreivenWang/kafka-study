
echo '######Starting Zookeeper Cluster localhost:2181'
apache-zookeeper-3.5.8-bin_1/bin/zkServer.sh restart


echo '######Starting Zookeeper Cluster localhost:2182'
apache-zookeeper-3.5.8-bin_2/bin/zkServer.sh restart


echo '######Starting Zookeeper Cluster localhost:2183'
apache-zookeeper-3.5.8-bin_3/bin/zkServer.sh restart