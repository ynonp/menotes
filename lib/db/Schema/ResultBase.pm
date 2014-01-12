package db::Schema::ResultBase;
use Moose;

extends 'DBIx::Class::Core';

sub TO_JSON {
  return { $_[0]->get_inflated_columns };
}

1;
