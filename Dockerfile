FROM node:10-alpine
RUN apk add --update --upgrade --no-cache bash git
ADD assets /opt/resource
RUN chmod +x /opt/resource/*
WORKDIR /opt/resource
RUN npm install --production
WORKDIR /
ENTRYPOINT ["/bin/bash"]
