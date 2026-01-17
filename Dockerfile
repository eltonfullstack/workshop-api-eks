# Etapa 1: Builder (usada no dev e para build da imagem de produção)
FROM node:slim AS builder

RUN apt-get update -y \
    && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN npm ci

COPY . ./

FROM node:slim AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./
COPY --from=builder /app/start.sh .

COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

RUN chmod +x start.sh

EXPOSE 3000

ENTRYPOINT ["./start.sh"]
