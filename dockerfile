FROM node:20-alpine AS build

WORKDIR /app

COPY Node/package*.json ./
RUN npm install

COPY Node /app
RUN npm run build

# segunda etapa

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/emails ./emails
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev
RUN npm install mysql2

EXPOSE 5000

CMD ["npm", "start"]
