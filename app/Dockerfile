FROM alpine:latest
RUN apk add --no-cache nginx
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
COPY ./build /etc/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]