FROM node:alpine

WORKDIR /app

COPY ./ ./

RUN npm install

EXPOSE 5000

CMD ["npm","run", "dev"]