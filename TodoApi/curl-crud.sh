#!/bin/sh

# POST
#httprepl http://localhost:5000/api/todoitems
#post -h Content-Type=application/json -c "{"name":"walk dog","isComplete":true}"
curl -X POST -H "Content-Type: application/json" -d '{"name":"walk dog","isComplete":true}' http://localhost:5000/api/todoitems

# GET
#connect http://localhost:5000/api/todoitems
#get
curl http://localhost:5000/api/todoitems

# PUT
#connect http://localhost:5000/api/todoitems/1
#put -h Content-Type=application/json -c "{"id":1,"name":"feed fish","isComplete":true}"
curl -X PUT -H "Content-Type: application/json" -d '{"id":1,"name":"feed fish","isComplete":true}' http://localhost:5000/api/todoitems/1

# DELETE
#connect http://localhost:5000/api/todoitems/1
#delete
curl -X DELETE http://localhost:5000/api/todoitems/1