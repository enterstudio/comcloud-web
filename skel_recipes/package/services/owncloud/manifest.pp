service { 'mysql':
	ensure => running,
	start => "/etc/init.d/mysql start",
	stop => "/etc/init.d/mysql stop",
} -> service { 'apache2':
    ensure    => running,
}

