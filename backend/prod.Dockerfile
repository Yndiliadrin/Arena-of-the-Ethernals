FROM node:16.13.2-buster as deployment
USER root
WORKDIR /app
COPY ./container/aofe-backend /app/
RUN touch .env
RUN npm install
RUN npm run build