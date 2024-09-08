FROM node:20

# Set working directory
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port number the app runs on
EXPOSE 3000

# Start NestJS app in development mode
CMD ["npm", "run", "start:dev"]
