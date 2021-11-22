FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS Builder

COPY ./ /TodoApi

RUN dotnet publish /TodoApi/TodoApi.csproj -c Release -r linux-musl-x64 \
    /p:PublishSingleFile=true /p:PublishReadyToRun=true /p:IncludeNativeLibrariesForSelfExtract=true \ 
    /p:PublishTrimmed=true --self-contained true

FROM alpine:latest AS APP

EXPOSE 5000

COPY --from=Builder /TodoApi/bin/Release/net6.0/linux-musl-x64/publish/TodoApi /TodoApi

ENV urls="http://*:5000"
ENV ConnectionStrings__MySQL="Server=tododb;Database=todoapi;User=todoapi;Password=todoapi;"

RUN apk update && apk add --no-cache libgcc libstdc++ icu

CMD [ "/TodoApi" ]