FROM node:16.13.2-buster as development

WORKDIR /usr/frontend/src/app

COPY ./container/aofe-frontend/ /usr/frontend/src/app/

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 49153 4200

CMD npm start