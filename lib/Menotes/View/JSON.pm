package Menotes::View::JSON;

use strict;
use base 'Catalyst::View::JSON';
use JSON::XS;

__PACKAGE__->config(
  expose_stash    => [ qw(data) ],
  allow_blessed => 1,
);

my $encoder = JSON::XS->new->utf8->pretty(0)->indent(0)
                      ->allow_blessed(1)->convert_blessed(1);

sub encode_json($) {
    my( $self, $c, $data ) = @_;
    $encoder->encode( $data );
}


=head1 NAME

Menotes::View::JSON - Catalyst JSON View

=head1 SYNOPSIS

See L<Menotes>

=head1 DESCRIPTION

Catalyst JSON View.

=head1 AUTHOR

Ynon Perek

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
