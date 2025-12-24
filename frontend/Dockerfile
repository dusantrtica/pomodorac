FROM node:22-alpine

WORKDIR /app

COPY ./package.json .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:stable-alpine

COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
