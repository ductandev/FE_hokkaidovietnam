#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"


sudo chmod 777 script.sh

sudo docker rm -f mysql-be-hokkaido
sleep 2

sudo docker rm -f cons-be-hokkaido
sleep 2

sudo docker rmi -f img-be-hokkaido
sleep 2

sudo apt  install docker.io -y
sleep 2

sudo docker run -d -e MYSQL_ROOT_PASSWORD=xyz1234 -p 3307:3306 --name mysql-be-hokkaido mysql
sleep 2

sudo docker build . -t img-be-hokkaido
sleep 2

sudo docker run -d -p 8085:8080 -e DATABASE_URL=mysql://root:xyz1234@143.198.81.177:3307/hokkaidovietnam?schema=public --name cons-be-hokkaido img-be-hokkaido
sleep 2

sudo apt install docker-compose -y
sleep 2

sudo docker-compose -f docker-compose-nginx.yml up -d
sleep 2


echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"
