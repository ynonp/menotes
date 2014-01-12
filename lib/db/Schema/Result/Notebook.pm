package db::Schema::Result::Notebook;

use strict;
use warnings;

use Moose;
use MooseX::NonMoose;
use MooseX::MarkAsMethods autoclean => 1;
extends 'db::Schema::ResultBase';

__PACKAGE__->table("notebooks");

__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_auto_increment => 1, is_nullable => 0 },
  "name",
  { data_type => "text", is_nullable => 0 },
);

__PACKAGE__->set_primary_key("id");

__PACKAGE__->has_many(
  "notes",
  "db::Schema::Result::Note",
  { "foreign.notebook_id" => "self.id" },
  { cascade_copy => 1, cascade_delete => 1 },
);

__PACKAGE__->meta->make_immutable;

1;

