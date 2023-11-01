FROM node:alpine as development


# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

RUN cd backend && npm run dev

CMD ["node", "server.js"]