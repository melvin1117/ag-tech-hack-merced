FROM node:18.20.6
WORKDIR /app

# Copy package files and install dependencies with legacy peer deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Expose port 3000 (default for Next.js dev server)
EXPOSE 3000

# Start the Next.js development server with hot reloading
CMD ["npm", "run", "dev"]
