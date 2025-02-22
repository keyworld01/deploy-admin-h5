FROM node:12.18.4-alpine3.10

WORKDIR /app

COPY package.json .

COPY package-lock.json .

# RUN npm install --registry=https://registry.npmmirror.com 国内源
RUN npm install

COPY . /app

RUN npm run build

RUN npm cache clean --force

CMD  npm run prd

EXPOSE 3001
