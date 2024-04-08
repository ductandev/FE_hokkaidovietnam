FROM node:18

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# cài node module trên server
# RUN yarn install --legacy-peer-deps : lệnh này dùng để cho máy nào chạy ko dc, nó sẽ tìm đúng các thư viện thích hợp để cài cho máy của bạn
RUN yarn install --legacy-peer-deps

COPY prisma ./prisma/

RUN yarn prisma generate

# Cấu hình cho FE sẹt đường dẫn
# COPY nginx.conf /etc/nginx/nginx.conf

COPY . .

# quy định cứng cho port này bởi docker
EXPOSE 8082             
CMD ["yarn","start"]
# CMD ["node","start"]






# docker build . -t img-html              || img-html: tên image tự đặt trong docker

# docker run -d -p 3030:80 --name cons-html img-html


# docker exec -it "tên_Container" bash => CICD => git pull