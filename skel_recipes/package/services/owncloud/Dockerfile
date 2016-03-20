FROM comcloud/owncloud:latest 
MAINTAINER Comcloud Project <comcloudproject@gmail.com>

EXPOSE 80
EXPOSE 443

WORKDIR /tmp

ADD manifest.pp /tmp/manifest.pp
ADD data/start.sh /tmp/start.sh
ADD data/casserver.cer /tmp/casserver.cer
ADD data/config.php /var/www/html/owncloud/config/config.php
ADD data/index.php /var/www/html/owncloud/index.php

RUN chown -R www-data:www-data /var/www/html/owncloud/*

CMD ["/bin/bash", "/tmp/start.sh", "-d"]
