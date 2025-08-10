FROM node:18-alpine

RUN addgroup -S trackr-group && adduser -S trackr-user -G trackr-group
WORKDIR /app

COPY --chown=trackr-user:trackr-group package*.json ./
RUN npm install

COPY --chown=trackr-user:trackr-group . .

RUN npm run build
RUN npm install -g serve

RUN chown -R trackr-user:trackr-group /app

USER trackr-user

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
