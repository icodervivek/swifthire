# Stage 1: Build React app
FROM node:20-alpine AS build


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Expose port (Vite default is 5173, but Nginx uses 80)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
