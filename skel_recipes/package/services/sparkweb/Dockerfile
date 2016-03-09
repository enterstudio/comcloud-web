FROM httpd:2.4

RUN apt-get -y update && apt-get -y install npm

ADD ./data/htdocs/ /usr/local/apache2/htdocs

WORKDIR /usr/local/apache2/htdocs

RUN npm install
RUN bower install