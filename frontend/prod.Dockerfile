#stage1
FROM node:14.17.6-alpine as deployment
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage2
FROM nginx:alpine
COPY --from=deployment /app/dist/frontend /usr/share/nginx/html