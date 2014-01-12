package Menotes::Model::SocketServer;

use base 'Catalyst::Model::Adaptor';
__PACKAGE__->config( class => 'ZMQSocketServer' );

1;
