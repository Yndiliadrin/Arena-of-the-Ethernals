FROM nginx
USER root

RUN apt update
RUN apt install -y apache2-utils

RUN mkdir /etc/apache2
RUN touch /etc/apache2/.htpasswd
RUN htpasswd -b /etc/apache2/.htpasswd review letsanalyzetexts
COPY nginx/nginx.headless.conf /etc/nginx/ 
RUN rm -r /etc/nginx/conf.d
RUN mv /etc/nginx/nginx.headless.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]