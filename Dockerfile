FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install --only=production

RUN npm build --prefix client

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000