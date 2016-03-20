FROM comcloud/redmine:latest
MAINTAINER comcloud  <comcloudproject@gmail.com>

RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/log/supervisor

EXPOSE 3000

WORKDIR /var/www/redmine-2.3.4/

ADD data/account_controller.rb /var/www/redmine-2.3.4/app/controllers/account_controller.rb
ADD data/Gemfile /var/www/redmine-2.3.4/Gemfile
ADD data/application.rb /tmp/config/application.rb
ADD data/start.sh /tmp/start.sh
ADD data/casserver.cer /tmp/casserver.cer
ADD data/settings.yml /var/www/redmine-2.3.4/config/settings.yml

CMD bash /tmp/start.sh
