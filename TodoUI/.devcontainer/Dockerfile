FROM debian:bullseye-slim

EXPOSE 5000

ENV urls="http://*:5000"
ENV todoapi="http://todoapi:5000/api/todoitems"
ENV boardapi="http://boardapi:3000/api/boarditems"

# bindマウントのためのユーザー追加のビルド変数、利用するユーザー名、ユーザーID、グループIDを指定
ARG USER=user
ARG USER_ID=1000
ARG GROUP_ID=1000
ARG DOT_VERSION=6.0

RUN apt-get update && apt-get install -y --no-install-recommends sudo curl wget ca-certificates apt-transport-https \
    && wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
    && apt-get install -y --no-install-recommends ./packages-microsoft-prod.deb && rm packages-microsoft-prod.deb \
    && apt-get update && apt-get install -y --no-install-recommends dotnet-sdk-${DOT_VERSION} \
    && apt-get remove -y --autoremove --purge wget && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && groupadd -g ${GROUP_ID} ${USER} \
    && useradd -u ${USER_ID} -m -s /bin/bash -g ${USER} -G sudo ${USER} \
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER ${USER}

ENV PATH=/home/${USER}/.dotnet/tools:$PATH

RUN dotnet tool install -g dotnet-aspnet-codegenerator

# Composeファイル等で、マウントの設定を上書きしなければ、自動で一時的なDocker Volumeを作成。
VOLUME ["/TodoUI"]

WORKDIR /TodoUI