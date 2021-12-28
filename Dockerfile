# Install dependencies only when needed
FROM node:lts-alpine AS deps
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache \
  && apk upgrade --no-cache \
  && apk add --no-cache libc6-compat \
  && yarn config set registry https://registry.npm.taobao.org 

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache \
  && apk upgrade --no-cache \
  && yarn config set registry https://registry.npm.taobao.org \
  && yarn build

FROM nginx:alpine AS runner

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80