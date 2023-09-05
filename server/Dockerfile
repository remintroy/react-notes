FROM node:alpine

WORKDIR /home

COPY . .

RUN npm i -g pnpm@latest

RUN pnpm install

ENV PORT=80 MONGODB_URL=mongodb://localhost:27017/note_app

EXPOSE 80

CMD [ "pnpm", "run", "dev" ]