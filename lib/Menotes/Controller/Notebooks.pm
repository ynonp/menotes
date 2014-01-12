package Menotes::Controller::Notebooks;
use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller' }

sub index :Path GET Args(0) {
  my ( $self, $c ) = @_;

  my @books = $c->model("DB::Notebook")->all;
  $c->stash->{data} = \@books;
}

sub notebooks :Chained(/) PathPart CaptureArgs(1) {
  my ( $self, $c, $notebook_id ) = @_;

  my $book = $c->model('DB::Notebook')->find($notebook_id) or die "Invalid notebook: $notebook_id";
  $c->stash->{notebook} = $book;
}


sub add_notebook :POST Path Args(0) {
  my ( $self, $c ) = @_;
  my $name = $c->req->body_data->{name} or die 'Missing notebook name';

  my $book = $c->model('DB::Notebook')->create({ name => $name });

  $c->res->status(201);
  $c->res->location($c->uri_for($self->action_for('get_notes'), [$book->id]));
  $c->stash->{data} = $book;

  $c->model('SocketServer')->new_notebook($book);
}

sub get_notes :Chained(notebooks) PathPart(notes) Args(0) GET {
  my ( $self, $c ) = @_;
  my $book = $c->stash->{notebook};

  $c->stash->{data} = {
    notebook_id => $book->id,
    name => $book->name,
    notes => ref($book->notes) eq 'ARRAY' ? $book->notes : [$book->notes],
  };
}

sub add_note :Chained(notebooks) PathPart(notes) POST {
  my ( $self, $c ) = @_;
  my $book = $c->stash->{notebook};
  my $title = $c->req->body_data->{title} or die 'Missing: note title';
  my $text = $c->req->body_data->{text} or die 'Missing note text';

  my $note = $c->model('DB::Note')->create({
      notebook => $book,
      title => $title,
      text => $text,
  });
  $c->res->status(201);
  $c->res->location($c->uri_for($self->action_for('get_note'), [$book->id, $note->id]));

  $c->model('SocketServer')->new_note($note);
}

sub notes :Chained(notebooks) PathPart CaptureArgs(1) {
  my ( $self, $c, $note_id ) = @_;
  my $note = $c->model('DB::Note')->find($note_id) or die "Invalid note: $note_id";

  $c->stash->{note} = $note;
}

sub get_note :Chained(notes) PathPart('') GET {
  my ( $self, $c ) = @_;
  $c->stash->{data} = $c->stash->{note};
}

sub update_note :Chained(notes) PathPart('') PUT {
  my ( $self, $c ) = @_;

  my $note = $c->stash->{note};
  my $title = $c->req->body_data->{title} or die 'Missing title';
  my $text = $c->req->body_data->{text} or die 'Missing text';

  $note->update({ title => $title, text => $text });
}

sub delete_note :Chained(notes) PathPart('') DELETE {
  my ( $self, $c ) = @_;
  my $note = $c->stash->{note};
  $note->delete;

  $c->model('SocketServer')->note_deleted($note);
}


sub end :Private {
  my ( $self, $c ) = @_;
  $c->forward($c->view("JSON"));
}

1;
