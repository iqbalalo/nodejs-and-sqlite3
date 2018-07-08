FROM node:7
WORKDIR /app
COPY . /app
RUN npm install
CMD node index.js
EXPOSE 8080