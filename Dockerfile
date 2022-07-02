FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install -g pnpm && \
    pnpm i && \
    pnpm run build

ENV NODE_ENV=production
ENV PORT=3000

CMD [ "pnpm", "run", "start" ]
