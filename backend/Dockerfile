FROM node:22.14.0

WORKDIR /app

# USER node

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm",  "run"]

CMD ["start"]