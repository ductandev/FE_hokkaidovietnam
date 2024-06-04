# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Build for production.
RUN npm run build --production

# Install serve to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 3100

# Run application
CMD serve -s build