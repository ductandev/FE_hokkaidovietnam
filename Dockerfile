# pull official base image
FROM node:20.14-alpine

# set working directory
WORKDIR /app

# Copies everything over to Docker environment
COPY ./build .

# Install serve to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 3100

# Run application
CMD serve -s build