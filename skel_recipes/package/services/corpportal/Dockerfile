FROM ubuntu:14.04.2

# install nodejs
RUN apt-get -y update && apt-get -y install curl python python-dev make g++ build-essential libkrb5-dev git && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y update && apt-get -y install nodejs

# install w3m www-browser to let xdg work
RUN apt-get -y install w3m

# install sass
RUN apt-get -y install ruby && \
    gem install sass

# install grunt and grunt-cli
RUN npm install -g grunt grunt-cli bower

# Cleaning
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Add application
RUN mkdir /usr/src/app && \
    groupadd -r node && useradd -r -g node node && \
    mkdir /home/node && chown -R node:node /usr/src/app && \
    chown -R node:node /home/node


ADD ./app /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN chown -R node:node /usr/src/app
USER node
RUN bower install --config.interactive=false
CMD grunt && grunt serve
