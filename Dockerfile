
FROM node:18

RUN npm install -g npm@10

# تحديث النظام والحزم
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y && \
    apt-get install -y --no-install-recommends \
        gir1.2-gdkpixbuf-2.0 \
        git \
        icu-devtools \
        imagemagick \
        libaom3 \
        libopenexr-3-1-30 \
        libsqlite3-0 \
        libtiff6 \
        libpam0g \
        libpq-dev \
        libgdk-pixbuf2.0-0 \
        libicu72 \
        libmagickcore-6.q16-6 \
        libmagickwand-6.q16-6 \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app


# نسخ ملفات npm
COPY package.json package-lock.json ./

# تثبيت الحزم بدون dev
RUN npm ci --omit=dev

# تحديث جميع مكتبات Node.js لمواجهة الثغرات
RUN npm update

# نسخ باقي ملفات المشروع
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
