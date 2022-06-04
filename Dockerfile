FROM node:16 as base
WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .
COPY packages/backend/src ./packages/backend/src
COPY packages/backend/codegen.yml ./packages/backend/codegen.yml
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/backend/tsconfig.json ./packages/backend/tsconfig.json

ENV MONGODB_URI $MONGODB_URI
ENV JWT_SECRET $JWT_SECRET
ENV NOMADZ_CONTRACT $NOMADZ_CONTRACT
ENV RPC_URL $RPC_URL
ENV CHAIN_ID $CHAIN_ID

RUN yarn install --frozen-lockfile

CMD ["yarn", "backend:start"]
