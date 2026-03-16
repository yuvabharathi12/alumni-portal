# Dockerfile for running the Node/Express backend
# This is intended for Railway (or any Docker-based deploy) to run the server.

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only server package files and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy server code
COPY server ./server

# Expose the port expected by the server (uses process.env.PORT)
EXPOSE 5000

# Start the server
CMD ["node", "server/server.js"]
