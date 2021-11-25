# TodoApp For Microservices

This project is a todo application that uses a microservice architecture.

It was created for learning microservice architecture.

![TodoUI](./images/TodoUI.png)

## Structure

|           Name            |       Type        | Languages | Environment |   OS   |          Framework           | Description                                          | Dependences |
| :-----------------------: | :---------------: | :-------: | :---------: | :----: | :--------------------------: | ---------------------------------------------------- | :---------: |
|          TodoApi          |      WebAPI       |    C#     |   .NET 6    | alpine |    ASP.NET Core 6 WebAPI     | CRUD WebAPI For Todo. Requirements MariaDB or MySQL. |   TodoDB    |
|          TodoUI           |       WebUI       |    C#     |   .NET 6    | alpine | ASP.NET Core 6 Blazor Server | WebUI For TodoApi. PWA Support (except offline)      |   TodoApi   |
|       TodoEndpoint        | External Endpoint |   ----    |    Nginx    | alpine |             ----             | Nginx Reverse Proxy/TodoApp Endpoint.                |   TodoUI    |
|          TodoDB           |        DB         |   ----    |   MariaDB   | ubuntu |             ----             | DB For TodoApi.                                      |    ----     |
| TodoDB-Console (Optional) | DB UI (Optional)  |   ----    |   adminer   | alpine |             ----             | TodoDB Optional UI                                   |   TodoDB    |

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

After deployment, it can be accessed on `localhost:5000`.

You can use Adminer on `localhost:8080` to access the DB.(The default is tododb for Server, todoapi for user, toadoapi for password, and todoapi for database.)

### Kubernetes

Requirements

- kubectl (Able to manipulate target Kubernetes)
- Docker
- skaffold

```bash
git clone git@github.com:Yutaro-B18016/TodoApp-For-Microservices.git

cd TodoApp-For-Microservices/

SKAFFOLD_DEFAULT_REPO=$DOCKER_REGISTRY skaffold -n $DEPLOY_NAMESPACE run
```

**$DOCKER_REGISTRY needs to be changed to your Docker Registry, and $DEPLOY_NAMESPACE to your deploy namespace.**

If you use the default namespace, `-n $DEPLOY_NAMESPACE` is optional.

If you are using a local Docker Registry such as Minikube, `SKAFFOLD_DEFAULT_REPO=$DOCKER_REGISTRY` is not necessary.

After deployment, it can be accessed on `Node IP:31000` using the node port.

The data in the DB is not persistent.

#### Sample NS/SC/PV/PVC (Use the sample to make the data persistent.)

The sample PV uses Node local.(It is not possible to increase the value of `replicas` in the database.)

**The node-name in [Todo-SC.yml](./deploy/k8s/Todo-SC.yml) needs to be changed to your node name.**

```bash
git clone git@github.com:Yutaro-B18016/TodoApp-For-Microservices.git

cd TodoApp-For-Microservices/deploy/k8s/

kubectl apply -f Todo-NS.yml

sudo mkdir -p /mnt/kubernetes/tododb

sudo chmod 777 /mnt/kubernetes/tododb

kubectl apply -f Todo-SC.yml

cd ../../

SKAFFOLD_DEFAULT_REPO=$DOCKER_REGISTRY skaffold -n todoapp run

cd ./deploy/k8s/

kubectl apply -n todoapp -f TodoDB-PVC.yml
```

#### Access using Ingress

**The default Ingress Controller is required.**

After deploying the app, do the following.

```bash
git clone git@github.com:Yutaro-B18016/TodoApp-For-Microservices.git

cd TodoApp-For-Microservices/deploy/k8s/

kubectl apply -n $DEPLOY_NAMESPACE -f Tododb-Ingress.yml
```

After deployment, it can be accessed by Ingress.

#### Accessing the DB using Adminer

```bash
git clone git@github.com:Yutaro-B18016/TodoApp-For-Microservices.git

cd TodoApp-For-Microservices/deploy/k8s/

kubectl apply -n $DEPLOY_NAMESPACE -f Tododb-Console.yml
```

After deployment, it can be accessed on `Node IP:31880` using the node port.(The default is tododb for Server, todoapi for user, toadoapi for password, and todoapi for database.)

## Development

Requirements

- Docker
- Docker Compose
- Visual Studio Code
- Remote - Containers (VSCode Extentions)
- Docker (VSCode Extentions)

![TodoUI-Dev](./images/TodoUI-Dev.png)

### TodoApi/TodoUI

Open the [TodoApi](./TodoApi/)/[TodoUI](./TodoUI) directory in VSCode.

After opening, select `Reopen in Container` in the notification at the bottom right.

## Configure

### TodoApi

|           ENV            |                         Default Value                         |         Type         |          Description          | Enable/Disable |
| :----------------------: | :-----------------------------------------------------------: | :------------------: | :---------------------------: | :------------: |
|           urls           |                         http://*:5000                         |  Internal Endpoint   |       TodoApi Endpoint        |     Enable     |
| ConnectionStrings__MySQL | Server=tododb;Database=todoapi;User=todoapi;Password=todoapi; | DB ConnectionStrings | TodoDB Connection Information |     Enable     |

#### GET/POST

- /api/todoitems

#### PUT/DELETE

- /api/todoitems/${id}

#### Request Header

- Content-Type: application/json

#### Type

- json

### TodoUI

|   ENV   |           Default Value           |       Type        |   Description   | Enable/Disable |
| :-----: | :-------------------------------: | :---------------: | :-------------: | :------------: |
|  urls   |           http://*:5000           | Internal Endpoint | TodoUI Endpoint |     Enable     |
| todoapi | http://todoapi:5000/api/todoitems |        URL        |   TodoApi URL   |     Enable     |

### TodoEndpoint

|     ENV     |           Default Value           |  Type   |   Description   | Enable/Disable |
| :---------: | :-------------------------------: | :-----: | :-------------: | :------------: |
|   todoui    |        http://todoui:5000         |   URL   |   TodoUI URL    |     Enable     |
| todoui_map  |                 /                 | Mapping | TodoUI Mapping  |     Enable     |
|   todoapi   | http://todoapi:5000/api/todoitems |   URL   |   TodoApi URL   |    Disable     |
| todoapi_map |          /api/todoitems           | Mapping | TodoApi Mapping |    Disable     |

If you want to expose the TodoApi to the External, you will need to change [default.conf.template](./TodoEndpoint/default.conf.template) and set the environment variables(`todoapi` and `todoapi_map`).

### TodoDB

|         ENV         | Default Value |    Type     |     Description      | Enable/Disable |
| :-----------------: | :-----------: | :---------: | :------------------: | :------------: |
| MYSQL_ROOT_PASSWORD |    todoapi    | DB Password | TodoDB Root Password |     Enable     |
|   MYSQL_DATABASE    |    todoapi    |   DB Name   |     TodoDB Name      |     Enable     |
|     MYSQL_USER      |    todoapi    |   DB USER   |     TodoDB USER      |     Enable     |
|   MYSQL_PASSWORD    |    todoapi    | DB Password | TodoDB Root Password |     Enable     |

### TodoDB-Console (Optional)

|          ENV           | Default Value |       Type        |   Description   | Enable/Disable |
| :--------------------: | :-----------: | :---------------: | :-------------: | :------------: |
| ADMINER_DEFAULT_SERVER |    tododb     | Internal Endpoint | TodoDB Endpoint |     Enable     |