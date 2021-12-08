FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS Builder

COPY ./ /TodoUI

RUN dotnet publish /TodoUI/TodoUI.csproj -c Release -r linux-musl-x64 \
    /p:PublishSingleFile=true /p:PublishReadyToRun=true /p:IncludeNativeLibrariesForSelfExtract=true \ 
    --self-contained true

FROM alpine:latest AS APP

EXPOSE 5000

ENV urls="http://*:5000"
ENV todoapi="http://todoapi:5000/api/todoitems"
ENV boardapi="http://boardapi:3000/api/boarditems"

RUN apk update && apk add --no-cache libgcc libstdc++ icu 

COPY --from=Builder /TodoUI/bin/Release/net6.0/linux-musl-x64/publish/TodoUI /TodoUI/TodoUI
COPY --from=Builder /TodoUI/bin/Release/net6.0/linux-musl-x64/publish/wwwroot /TodoUI/wwwroot

WORKDIR /TodoUI

CMD [ "/TodoUI/TodoUI" ]