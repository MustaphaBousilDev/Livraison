FROM node:alpine as development


# Create app directory
WORKDIR /app/frontend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY frontend/package*.json ./

RUN npm install

COPY . .

RUN cd frontend && npm run dev

CMD ["npm", "run", "dev"]