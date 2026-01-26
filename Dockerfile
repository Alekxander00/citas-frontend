FROM node:18-alpine AS builder

WORKDIR /app

# Copiar solo package.json primero
COPY package.json package-lock.json ./

# Instalar dependencias - IGNORA el lock file si hay problemas
RUN npm install --omit=dev

# Copiar el resto
COPY . .

# Construir
RUN npm run build

# Servir con nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]