FROM debian:bullseye-slim

EXPOSE 5000

ENV urls="http://*:5000"
ENV Provider="MySQL"
ENV ConnectionStrings__MySQL="Server=tododb;Database=todoapi;User=todoapi;Password=todoapi;"
ENV ConnectionStrings__PostgreSQL="Host=tododb;Port=5432;User Id=todoapi;Password=todoapi;Database=todoapi;"
ENV ConnectionStrings__SQLServer="Server=tododb;Database=todoapi;User Id=sa;Password=Xt0d0ap!;"
ENV ConnectionStrings__SQLite="Filename=DB/todoapi.db"

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

WORKDIR /TodoApi

# Composeファイル等で、マウントの設定を上書きしなければ、自動で一時的なDocker Volumeを作成。
VOLUME ["/TodoApi"]