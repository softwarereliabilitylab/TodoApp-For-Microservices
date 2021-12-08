FROM nginx:alpine

EXPOSE 80

ENV todoui="http://todoui:5000"
ENV todoui_map="/"

#ENV todoapi="http://todoapi:5000/api/todoitems"
#ENV todoapi_map="/api/todoitems"

#ENV boardapi="http://boardapi:3000/api/boarditems"
#ENV boardapi_map="/api/api/boarditems"

COPY ./default.conf.template /etc/nginx/templates/default.conf.template