FROM node:18-alpine

RUN addgroup -S trackr-api-group && adduser -S trackr-api-user -G trackr-api-group

WORKDIR /app
COPY --chown=trackr-api-user:trackr-api-group package*.json ./
RUN npm install --production

COPY --chown=trackr-api-user:trackr-api-group . .

RUN mkdir -p /app/certs && chown -R trackr-api-user:trackr-api-group /app/certs

USER trackr-api-user

EXPOSE 3001

CMD ["npm", "run", "start"]
