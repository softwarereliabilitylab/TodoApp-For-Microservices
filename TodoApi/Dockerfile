FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS Builder

COPY ./ /TodoApi

RUN dotnet publish /TodoApi/TodoApi.csproj -c Release -r linux-musl-x64 \
    /p:PublishSingleFile=true /p:PublishReadyToRun=true /p:IncludeNativeLibrariesForSelfExtract=true \ 
    /p:PublishTrimmed=true --self-contained true

FROM alpine:latest AS APP

EXPOSE 5000

ENV urls="http://*:5000"
ENV Provider="MySQL"
ENV ConnectionStrings__MySQL="Server=tododb;Database=todoapi;User=todoapi;Password=todoapi;"
ENV ConnectionStrings__PostgreSQL="Host=tododb;Port=5432;User Id=todoapi;Password=todoapi;Database=todoapi;"
ENV ConnectionStrings__SQLServer="Server=tododb;Database=todoapi;User Id=sa;Password=Xt0d0ap!;"
ENV ConnectionStrings__SQLite="Filename=DB/todoapi.db"

RUN apk update && apk add --no-cache libgcc libstdc++ icu \
    && mkdir /DB
# /DB For SQLite


COPY --from=Builder /TodoApi/bin/Release/net6.0/linux-musl-x64/publish/TodoApi /TodoApi

CMD [ "/TodoApi" ]