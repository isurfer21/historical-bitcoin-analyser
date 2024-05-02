FROM node:20-alpine
WORKDIR /app
COPY . .
EXPOSE 8080
CMD ["node", "reverse-proxy.js", "-a=0.0.0.0", "-p=8080"]