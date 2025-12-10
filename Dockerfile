FROM node:24.11-alpine

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY ./src /code/src

COPY ./tsconfig.json /code/tsconfig.json

CMD ["npm", "run", "start:dev"]
