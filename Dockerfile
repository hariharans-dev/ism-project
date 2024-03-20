FROM node:18

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose ports
EXPOSE 5000
EXPOSE 4000
EXPOSE 3000

# Copy Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Start Supervisor
CMD ["/usr/bin/supervisord"]
