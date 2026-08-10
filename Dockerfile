# Stage 1: Build the site
FROM node:lts-slim AS build
WORKDIR /app

# Copy configuration files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Build the Astro site (outputs to /dist by default)
RUN npm run build

# Stage 2: Serve the site with Nginx
FROM nginx:alpine AS runtime

# This overwrites the default Nginx config with your custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
