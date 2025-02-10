FROM nginx
COPY nginxfile.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/. /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]