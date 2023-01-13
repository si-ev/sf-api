FROM node:19

WORKDIR /usr/src/sf-api

COPY ./ ./

RUN npm install 
