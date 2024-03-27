#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"




sudo docker rm -f cons-be-hokkaido
sleep 2

sudo docker rmi -f img-be-hokkaido
sleep 2



sudo docker build . -t img-be-hokkaido
sleep 2

sudo docker run -d -p 8085:8080 -e DATABASE_URL=mysql://root:xyz1234@143.198.81.177:3306/hokkaidovietnam?schema=public --name cons-be-hokkaido img-be-hokkaido
sleep 2




echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"
