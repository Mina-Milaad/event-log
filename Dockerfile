# Stage 1: Build
FROM node:20-alpine AS build

# تثبيت أدوات البناء اللازمة لـ bcrypt
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

# نسخ ملفات الباكيج
COPY package*.json ./

# تثبيت الـ npm packages (بما فيها bcrypt)
RUN npm ci --omit=dev

# نسخ باقي المشروع
COPY . .

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# نسخ node_modules المبنية من المرحلة الأولى
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app ./

EXPOSE 5000
CMD ["node", "index.js"]
