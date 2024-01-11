# Use an official Node runtime as a base image
FROM node:lts-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
