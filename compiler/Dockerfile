FROM node:22-alpine

WORKDIR /app

# Install g++ for C/C++ support, openjdk for Java, and python3
RUN apk update && apk add --no-cache \
    g++ \
    gcc\
    openjdk17 \
    python3 \
    py3-pip \
    && ln -sf python3 /usr/bin/python

COPY . .

RUN npm install

EXPOSE 8001

CMD ["node", "index.js"]