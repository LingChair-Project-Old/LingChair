FROM node:20.15.1-alpine3.20

WORKDIR /root

COPY . /root

RUN npm i --save && \
    npm run build

CMD ["npm","start"]