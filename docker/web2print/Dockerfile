FROM node:20-alpine

RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    python3 \
    py3-setuptools \
    make \
    bash \
    curl \
    dumb-init \
    imagemagick \
    graphicsmagick \
    ghostscript \
    font-noto ghostscript-fonts \
    poppler-data poppler-utils \
    cairo jpeg pango giflib \
    redis

RUN npm install -g bun
RUN npm install -g pm2 concurrently
