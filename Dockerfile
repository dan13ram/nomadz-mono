FROM node:16 as base
WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .
COPY packages/backend/src ./packages/backend/src
COPY packages/backend/codegen.yml ./packages/backend/codegen.yml
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/backend/tsconfig.json ./packages/backend/tsconfig.json

ENV NODE_ENV $NODE_ENV
ENV MONGODB_URI $MONGODB_URI
ENV JWT_SECRET $JWT_SECRET
ENV CLOSE_WHITELIST_TIMESTAMP $CLOSE_WHITELIST_TIMESTAMP

RUN yarn install --frozen-lockfile

CMD ["yarn", "backend:start"]
