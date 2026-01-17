#!/bin/sh

# 'set -x' imprime cada comando antes de executá-lo. Essencial para debug.
set -x

# 'set -e' para o script se um comando falhar.
set -e

echo "Rodando migrate..."
npx prisma migrate deploy

echo "Rodando generate..."
npx prisma generate

echo "Rodando seeds..."
npm run db:seed

echo "Migrations e seeds aplicados. Iniciando a aplicação..."
npx tsx src/server.ts