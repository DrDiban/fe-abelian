# Use a specific node version for consistency
FROM node:16-buster-slim as build
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ARG REACT_APP_SERVER_URL 
ARG REACT_APP_ENV

RUN apt-get update && apt-get install -y vim

# Set the working directory to /app inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Verify the contents of the /app directory (for debugging)
RUN ls -la /app

# Verify the contents of the dist directory (for debugging)
RUN ls -la /app/dist || echo "Dist directory not found"

# Use nginx to serve the built application
FROM nginx:1.21.5
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

# Copy the built application to the nginx html directory
# COPY --from=build /app/dist /usr/share/nginx/html
# Copy the nginx configuration file

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
