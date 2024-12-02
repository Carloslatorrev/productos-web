FROM node:18-alpine AS build

WORKDIR /app

COPY productos-react/package.json productos-react/package-lock.json /app/

RUN npm install

COPY productos-react /app/

RUN npm run build

FROM node:18-alpine

RUN npm install -g serve

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 5000

CMD ["serve", "-s", "/usr/share/nginx/html", "-l", "5000"]


