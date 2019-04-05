FROM node:10-alpine
RUN apk add --update --upgrade --no-cache bash git
ADD assets /opt/resource
RUN chmod +x /opt/resource/*
WORKDIR /
ENTRYPOINT ["/bin/bash"]
