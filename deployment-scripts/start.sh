#!/bin/bash

# Pull the latest build from Docker Hub
docker pull myappautomation/myapp:latest

# Start the application
docker-compose -f docker-compose.prod.yml up -d

# Copy over the correct Nginx config file
docker cp nginx-config-prod.conf my_app_backend:/etc/nginx/sites-enabled/myapp

# Restart Nginx
docker exec my_app_backend service nginx restart

# Remove unused images (keeps the image cache from growing)
if [ -n $(docker images -f "dangling=true" -q) ]; then
  docker rmi $(docker images -f "dangling=true" -q)
fi
