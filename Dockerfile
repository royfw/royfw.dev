# syntax=docker/dockerfile:1.7

# ---- builder ----
FROM node:24-alpine AS builder
WORKDIR /app

# 先複製 lock 檔做 layer cache
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# 複製其餘原始碼並 build
COPY . .
RUN npm run build

# ---- runtime ----
FROM nginx:1.27-alpine AS runtime

# 自訂 nginx config — 處理 trailing slash、gzip、SPA fallback、長 timeout
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 把 build 出來的靜態檔案丟進去
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
