FROM node:12.9.0-alpine
EXPOSE 5000
COPY . /app
WORKDIR /app
ENV NODE_ENV=production

RUN npm run client-install  && npm run build --prefix client \ 
   && npm rebuild node-sass && npm install

CMD ["npm", "start"]
