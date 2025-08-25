FROM node:20-slim

# تحديث npm
RUN npm install -g npm@10

# تحديث النظام وحزم أساسية فقط
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        imagemagick \
        libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# نسخ ملفات npm
COPY package.json package-lock.json ./

# تثبيت الحزم من lockfile (بدون dev)
RUN npm ci --omit=dev

# نسخ باقي ملفات المشروع
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
