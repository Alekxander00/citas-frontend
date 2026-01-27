FROM node:18-alpine

WORKDIR /app

# 1. Copiar solo lo necesario
COPY package.json package-lock.json ./

# 2. Instalar dependencias (sin cache problemático)
RUN npm install --no-cache

# 3. Copiar el resto
COPY . .

# 4. Construir
RUN npm run build

# 5. Instalar serve globalmente
RUN npm install -g serve

# 6. Exponer puerto
EXPOSE 3000

# 7. Ejecutar
CMD ["serve", "-s", "dist", "-l", "3000"]