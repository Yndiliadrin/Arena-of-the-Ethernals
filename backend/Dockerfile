FROM node:16.13.2-buster as development

WORKDIR /app

COPY ./container/aofe-backend/ /app/

RUN npm install

CMD npm run dev