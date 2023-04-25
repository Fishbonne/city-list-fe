FROM nginx:1.23.4-alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/city-list-fe /usr/share/nginx/html
