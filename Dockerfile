FROM node:20

WORKDIR /home/hbp

COPY ./app/build /home/hbp/app/build
COPY ./api /home/hbp/api
COPY ./docs /home/hbp/docs
COPY ./mock /home/hbp/mock
COPY ./reverse-proxy.js /home/hbp
COPY ./proxy-config.json /home/hbp
COPY ./static-server.js /home/hbp
COPY ./mime-types.json /home/hbp
COPY ./run.sh /home/hbp

EXPOSE 8080

CMD ["sh", "run.sh"]