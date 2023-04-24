#stage1
FROM node:16.13.2-buster as deployment
WORKDIR /app
COPY ./container/aofe-backend /app/
RUN npm install
RUN npm run build