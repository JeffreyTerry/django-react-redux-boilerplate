# FOR DEVELOPMENT ONLY
FROM node:latest
WORKDIR /my_app_frontend
COPY *.json ./
RUN npm install
COPY . .
ENV CI=true
EXPOSE 3000