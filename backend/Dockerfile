FROM node:16.13.2-buster as development
USER root
WORKDIR /app

COPY ./container/aofe-backend/ /app/

RUN npm install
RUN npm run build
CMD npm run dev