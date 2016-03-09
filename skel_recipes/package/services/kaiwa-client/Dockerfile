FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive
ENV HOME /root

ENV XMPP_NAME Kaiwa
ENV XMPP_DOMAIN FQDN_HERE
ENV XMPP_WSS ws://FQDN_HERE:5280/xmpp-websocket/
ENV XMPP_MUC chat.DOMAIN_HERE
ENV XMPP_STARTUP groupchat/room%40FQDN_HERE
ENV XMPP_ADMIN admin

RUN sed -i 's/^#\s*\(deb.*universe\)$/\1/g' /etc/apt/sources.list && \
    sed -i 's/^#\s*\(deb.*multiverse\)$/\1/g' /etc/apt/sources.list && \
    apt-get -y update && \
    dpkg-divert --local --rename --add /sbin/initctl && \
    ln -sf /bin/true /sbin/initctl && \
    dpkg-divert --local --rename --add /usr/bin/ischroot && \
    ln -sf /bin/true /usr/bin/ischroot && \
    apt-get -y upgrade && \
    apt-get install -y vim wget sudo net-tools pwgen unzip openssh-server \
        logrotate supervisor language-pack-en software-properties-common \
        python-software-properties apt-transport-https ca-certificates curl && \
    apt-get clean

RUN locale-gen en_US && locale-gen en_US.UTF-8 && echo 'LANG="en_US.UTF-8"' > /etc/default/locale

RUN apt-get update && apt-get install -y --force-yes nodejs git-core uuid-dev

RUN apt-get remove -y --force-yes nodejs && apt-get install -y --force-yes nodejs-legacy npm

RUN git clone git://github.com/digicoop/kaiwa.git

RUN cd kaiwa && npm install

ADD app /app

RUN chmod +x /app/start.sh
CMD "/app/start.sh"
