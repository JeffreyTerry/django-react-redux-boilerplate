#!/bin/bash

# RED='\033[0;31m'
# NC='\033[0m'

# Install Docker and nginx
sudo yum update -y

# Start Docker and set it to start on reboot
sudo service docker start
sudo chkconfig docker on

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add ec2-user to the docker group so I don't have to use sudo below
sudo usermod -aG docker ec2-user

# Log in to Dockerhub for Continuous Integration
# TODO get this code working and put it back in once I'm ready to start deploying the app.
# docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASS

# Pull the latest build from Docker Hub
docker pull myappautomation/myapp:latest

# Start the application
docker-compose -f docker-compose.prod.yml up -d

# Make any necessary migrations, create a superuser, add the default
# CustomPedagogyConfigurations to the database, and compress the raw images
# so that they're ideal for serving to the frontend.
docker exec my_app_backend python manage.py migrate
docker exec my_app_backend python manage.py createsuperuser_if_necessary
docker exec my_app_backend python manage.py compress_image_assets

docker-compose -f docker-compose.prod.yml down
