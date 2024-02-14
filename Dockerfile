
FROM node:21

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "run", "start:prod"]