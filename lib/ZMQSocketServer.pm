package ZMQSocketServer;
use Moose;
use Net::RabbitMQ;
use JSON;

has 'mq', is => 'ro', builder => '_build_mq';

# RabbitMQ web gui
# http://localhost:15672/

sub _build_mq {
  my $mq = Net::RabbitMQ->new();
  $mq->connect("localhost", { user => "guest", password => "guest" });
  $mq->channel_open(1);
  $mq->queue_declare(1, "events");
  return $mq;
}


sub test {
  my ( $self, $msg )  = @_;
  $msg //= 'hello';

  $self->mq->publish(1, 'events', $msg);
}


sub note_deleted {
  my ( $self, $note ) = @_;
  $self->mq->publish(1, 'events', to_json(
      {
        scope => 'note',
        action => 'delete',
        id => $note->id,
        notebook_id => $note->notebook_id,
      }
    ));
}

sub new_notebook {
  my ( $self, $notebook ) = @_;
  $self->mq->publish(1, 'events', to_json(
      {
        scope => 'notebook',
        action => 'add',
        notebook_id => $notebook->notebook_id,
      }
    ));
}

sub new_note {
  my ( $self, $note ) = @_;
  $self->mq->publish(1, 'events', to_json(
      {
        scope => 'note',
        action => 'add',
        id => $note->id,
        notebook_id => $note->notebook_id,
        note => {
          title => $note->title,
          text => $note->text,
          id => $note->id,
        }
      }
    ));
}


1;


