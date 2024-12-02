FROM node:18-alpine AS build

WORKDIR /app

COPY productos-react/package.json productos-react/package-lock.json /app/

RUN npm install

ENV REACT_APP_API_URL="https://productoapp-f3cmatc6gfhzawg3.canadacentral-01.azurewebsites.net/"

COPY productos-react /app/

RUN npm run build

FROM node:18-alpine

RUN npm install -g serve

COPY --from=build /app/build /app/build

EXPOSE 5000

CMD ["serve", "-s", "/usr/share/nginx/html", "-l", "5000"]


