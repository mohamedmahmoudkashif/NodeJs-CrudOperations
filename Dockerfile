FROM node:boron-alpine

WORKDIR /src


COPY package.json /app
RUN npm install

ADD . .

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]