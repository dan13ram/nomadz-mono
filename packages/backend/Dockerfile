FROM node:16 as base
WORKDIR /usr/src/app

COPY yarn.lock .
COPY tsconfig.json .
COPY codegen.yml .
COPY package.json .
COPY src ./src

ENV MONGODB_URI $MONGODB_URI
ENV JWT_SECRET $JWT_SECRET
ENV NOMADZ_CONTRACT $NOMADZ_CONTRACT
ENV RPC_URL $RPC_URL
ENV CHAIN_ID $CHAIN_ID

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]
