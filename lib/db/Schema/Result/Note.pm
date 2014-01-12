package db::Schema::Result::Note;

use strict;
use warnings;

use Moose;
use MooseX::NonMoose;
use MooseX::MarkAsMethods autoclean => 1;
extends 'db::Schema::ResultBase';

__PACKAGE__->table("notes");

__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_auto_increment => 1, is_nullable => 0 },
  "notebook_id",
  { data_type => "integer", is_nullable => 0 },
  "title",
  { data_type => "text", is_nullable => 0 },
  "text",
  { data_type => "text", is_nullable => 0 },
);

__PACKAGE__->set_primary_key("id");

__PACKAGE__->belongs_to(
  "notebook",
  "db::Schema::Result::Notebook",
  'notebook_id',
);

__PACKAGE__->meta->make_immutable;

1;


