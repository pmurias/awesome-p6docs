unit class Pod::To::AwesomeJSON;

use JSON::Fast;

class Method {
  has $.desc;
  has $.name;
  has $.sig is rw;
}

multi to-text(Array $content) {
  $content.map(-> $thing {to-text($thing)}).join(''); 
}

multi to-text(Pod::FormattingCode $pod) {
  to-text($pod.contents);
}

multi to-text(Pod::Block::Para $para) {
  to-text($para.contents); 
}

multi to-text(Str $str) {
  $str;
}

multi jsonify(Array $contents) { 
  $contents.map(&jsonify);
}
multi jsonify(Pod::Block::Para $para) { 
  {para => jsonify($para.contents)}
}

multi jsonify(Str $str) { 
  $str;
}

multi jsonify(Pod::Block::Code $code) { 
  {code => jsonify($code.contents[0])}
}

multi jsonify(Pod::FormattingCode $formatting) {
  {type=> $formatting.type, contents => jsonify($formatting.contents)}
}

multi jsonify($other) { 
  say('other:', $other.perl);
}

sub grok-unit([Pod::Block::Named $pod where $pod.name eq 'pod']) {

  my $content = [];

  my $desc = $content;
  my $kind;
  my $name;
  my $methods = [];

  my $id = 0;

  my $current-method;

  for $pod.contents -> $part {

    if $part ~~ Pod::Block::Named && $part.name eq 'TITLE' {
      to-text($part.contents) ~~ /(class) \s* (.*)/;
      $kind = ~$0;
      $name = ~$1;
    } elsif $part ~~ Pod::Block::Named && $part.name eq 'SUBTITLE' {
#      say("got subtitle: <{to-text($part.contents)}>");
    } elsif $part ~~ Pod::Heading {
      if $part.level == 1 && to-text($part.contents) eq 'Methods' {
        $content = Mu;
      } elsif $part.level == 2 && to-text($part.contents) ~~ /^method \s* (.*)/ {
        $content = [];
        $current-method = Method.new(name => ~$0 , desc => $content);
        $methods.push($current-method);
      } else {
        say("heading: ", $part.perl);
      }
    } elsif $part ~~ Pod::Block::Code|Pod::Block::Para {
        if defined($content) {
          if +$content == 0 && $part ~~ Pod::Block::Para && $part.contents ~~ ["Defined as:"] { 
          } elsif +$content == 0 && $part ~~ Pod::Block::Code && $part.contents[0] ~~ /method \s* \S+ \s* \( (.*) \)/ { 
            $current-method.sig = ~($0 // '');               
          } else {
            $content.push($part);
          }
        } else {
          say("unrecognized: ", $part.perl);
        }
    } else {
      say("unrecognized: ", $part.perl);
    }
  }

  to-json {
    desc => jsonify($desc),
    name => $name,
    kind => $kind,
    methods => $methods.map(-> $method {{name => $method.name, desc=>jsonify($method.desc), sig=>jsonify($method.sig // 'no sig')}})
  };
}

method render($pod) {
  grok-unit($pod);
}
