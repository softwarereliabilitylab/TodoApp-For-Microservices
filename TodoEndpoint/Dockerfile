FROM nginx:alpine

EXPOSE 80

ENV todoui="http://todoui:5000"
ENV todoui_map="/"

#ENV todoapi="http://todoapi:5000/api/todoitems"
#ENV todoapi_map="/api/todoitems"

COPY ./default.conf.template /etc/nginx/templates/default.conf.template