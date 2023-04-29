FROM node:16.13.2-buster as development
USER root
WORKDIR /app

COPY ./container/aofe-backend/ /app/

RUN npm install
RUN chown -R node node_modules
RUN npm run build
CMD npm run dev