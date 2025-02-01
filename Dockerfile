FROM nginx
COPY nginx.conf /etc/nginx/sites-available/default
COPY dist/. /usr/share/nginx/html/assets/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]