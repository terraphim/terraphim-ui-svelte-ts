VERSION 0.7
FROM node:16.15.0

WORKDIR frontend

deps:
    # COPY package.json tsconfig.json yarn.lock vite.config.ts tsconfig.node.json index.html ./
    COPY . .
    COPY --dir src src
    COPY --dir public public
    RUN yarn

build:
    FROM +deps
    RUN yarn run build
    SAVE ARTIFACT dist /dist AS LOCAL dist