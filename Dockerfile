
FROM node:18-alpine AS build

WORKDIR /app

COPY productos-react/package.json productos-react/package-lock.json /app/

RUN npm install

COPY productos-react /app/productos-react

WORKDIR /app/productos-react

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/productos-react/build /usr/share/nginx/html/productos-react

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

