FROM node:20.15.1-alpine3.20 AS build

WORKDIR /root

COPY . /root

RUN npm i --save-dev && \
    npm run build

FROM node:20.15.1-alpine3.20

WORKDIR /root

COPY . /root
COPY --from=build /root/lingchair_http /root/lingchair_http

RUN npm i --save

CMD ["npm","start"]