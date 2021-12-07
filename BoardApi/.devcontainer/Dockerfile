FROM node:lts-alpine

EXPOSE 3000

# Already exist User node
ARG USER=node
#ARG USER_ID=1000
#ARG GROUP_ID=1000

RUN apk update && apk add --no-cache sudo \
    && yarn global add @nestjs/cli \
    #&& addgroup -g ${GROUP_ID} ${USER} \
    #&& adduser -D -u ${USER_ID} -s /bin/sh -G ${USER} ${USER} \
    && adduser ${USER} wheel \
    && echo '%wheel ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

USER ${USER}

# Composeファイル等で、マウントの設定を上書きしなければ、自動で一時的なDocker Volumeを作成。
VOLUME ["/BoardApi"]

WORKDIR /BoardApi