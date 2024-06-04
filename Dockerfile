FROM nginx

# Cài đặt git
RUN apt-get update && apt-get install -y git

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY build/ .


# docker build . -t img-fe-hokkaido
# docker run -d -p 3100:80 --name cons-fe-hokkaido img-fe-hokkaido 