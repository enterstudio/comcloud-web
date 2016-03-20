#!/bin/bash

cd /var/www/redmine-2.3.4
#gem install rack-cors
cp /tmp/config/application.rb /var/www/redmine-2.3.4/config/application.rb
/etc/init.d/mysql start &&\
    cd "/var/www/redmine-2.3.4" &&\
    bundle install &&\
    bundle exec rails server webrick -e production -b 0.0.0.0

exit 0
