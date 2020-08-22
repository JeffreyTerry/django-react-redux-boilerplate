#!/bin/bash

# Pull the latest build from Docker Hub
docker pull myappautomation/myapp:latest

# Stop the application
./stop.sh

# Start the application
./start.sh
