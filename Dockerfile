FROM node

ENV APP_DIR=/var/www/html
ENV PORT=80
ENV NODE_ENV=production
ENV ENVIRONMENT=prod

COPY . ${APP_DIR}
WORKDIR ${APP_DIR}

RUN npm install --no-dev

ENV GOOGLE_APPLICATION_CREDENTIALS=${APP_DIR}/configs/gcloud.json

ENTRYPOINT ["npm", "start"]

EXPOSE ${PORT}