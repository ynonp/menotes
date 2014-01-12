use v5.16;
use ZMQSocketServer;

my $s = ZMQSocketServer->new;

say "Sending...";
my $counter = 0;
for(1..10) {
  $s->test($counter);
  sleep 1;
}


