use strict;
use warnings;

use Menotes;

my $app = Menotes->apply_default_middlewares(Menotes->psgi_app);
$app;

