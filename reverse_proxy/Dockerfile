FROM nginx
USER root

RUN apt update
RUN apt install -y apache2-utils

RUN mkdir /etc/apache2
RUN touch /etc/apache2/.htpasswd
RUN htpasswd -b /etc/apache2/.htpasswd Yndiliadrin fuckedUpB3y0nd4llRec0gn1ti0n
COPY nginx/nginx.conf /etc/nginx/ 
RUN rm -r /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]