#  Use a Node.js base image with a specific version as the base image
FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev nano

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY ./package.json ./package-lock.json ./

# Instala las dependencias de tu aplicación
RUN npm install --legacy-peer-deps

# Reconstruye las dependencias para la plataforma de Docker
RUN npm rebuild

# Copia todo el contenido de tu proyecto al directorio de trabajo en el contenedor
COPY . .

# Construye la aplicación Next.js en modo de producción
RUN npm run build

# Expone el puerto 3000 para la aplicación Next.js
EXPOSE 3003

# Comando para ejecutar el script de inicio que maneja ambos comandos en paralelo
CMD ["npm","start"]
