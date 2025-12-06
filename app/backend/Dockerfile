FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile


COPY . .

RUN pnpm run build


CMD [ "node", "dist/index.js" ]
