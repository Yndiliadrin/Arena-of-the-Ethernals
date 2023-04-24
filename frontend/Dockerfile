FROM node:14.17.6-alpine as development

WORKDIR /usr/frontend/src/app

COPY ./container/frontend/ /usr/frontend/src/app/

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 49153 4200

CMD npm start