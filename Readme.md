# TodoApp For Microservices

This project is a todo application that uses a microservice architecture.

It was created for learning microservice architecture.

## Structure

|     Name     |   Role   | Languages | Environment |          Framework           | Description                                          | Dependences |
| :----------: | :------: | :-------: | :---------: | :--------------------------: | ---------------------------------------------------- | :---------: |
|   TodoApi    |  WebAPI  |    C#     |   .NET 6    |    ASP.NET Core 6 WebAPI     | CRUD WebAPI For Todo. Requirements MariaDB or MySQL. |   TodoDB    |
|    TodoUI    |  WebUI   |    C#     |   .NET 6    | ASP.NET Core 6 Blazor Server | WebUI For TodoApi.                                   |   TodoApi   |
| TodoEndpoint | Endpoint |   ----    |    Nginx    |             ----             | Nginx Reverse Proxy/TodoApp Endpoint.                |   TodoUI    |
|    TodoDB    |    DB    |   ----    |   MariaDB   |             ----             | DB For TodoApi.                                      |    ----     |

### Access Flow

TodoEndpoint -> TodoUI -> TodoApi -> TodoDB

## Deployment

### Docker

Requirements

- Docker
- Docker Compose (If you have less than Compose V2, use the `docker-compose` command instead of the `docker compose` command.)

```bash
git clone git@github.com:Yutaro-B18016/TodoApp-For-Microservices.git

cd TodoApp-For-Microservices/deploy/compose

docker compose up -d --build
```

After deployment, it can be accessed on localhost:5000.

### Kubernetes

Requirements

- kubectl (Able to manipulate target Kubernetes)
- skaffold

```bash
git clone git@github.com:Yutaro-B18016/TodoApp-For-Microservices.git

cd TodoApp-For-Microservices/

SKAFFOLD_DEFAULT_REPO=$DOCKER_REGISTRY skaffold -n $DEPLOY_NAMESPACE run
```

**$DOCKER_REGISTRY needs to be changed to your Docker Registry, and $DEPLOY_NAMESPACE to your deploy namespace.**

If you use the default namespace, `-n $DEPLOY_NAMESPACE` is optional.

After deployment, it can be accessed on Server IP:31000 using the node port.

## Development

Requirements

- Docker
- Docker Compose
- Visual Studio Code
- Remote - Containers(VSCode Extentions)

### TodoApi/TodoUI

Open the [TodoApi](./TodoApi/)/[TodoUI](./TodoUI) directory in VSCode.

After opening, select `Reopen in Container` in the notification at the bottom right.