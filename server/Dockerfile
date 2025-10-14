# Use Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port (match .env PORT)
EXPOSE 3000

# Start backend
CMD ["npm", "run", "dev"]
