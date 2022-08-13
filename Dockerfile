FROM node:16-alpine

RUN mkdir /opt/app 
 
WORKDIR /opt/app

RUN npm install -g @angular/cli 