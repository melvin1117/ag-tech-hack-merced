FROM node:16

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port 3000 (create-react-app default)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
