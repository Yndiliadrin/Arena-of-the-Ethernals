FROM node:16.13.2-buster as development

WORKDIR /app

COPY ./container/aofe-frontend/ /app/

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

CMD npm run start