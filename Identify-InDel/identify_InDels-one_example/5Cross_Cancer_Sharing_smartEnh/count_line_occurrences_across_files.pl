#!/usr/bin/perl -w

use strict;
use Data::Dumper;

my $linesToCheck = $ARGV[0];
my $fileList = $ARGV[1];
my @files = split(",", $fileList);


open(MASTERIN, "<$linesToCheck");
my %masterHash;
my @masterArray;
my %countHash;


#### READ IN THE UNION OF ALL INSERTIONS AS A HASH AND ARRAY
while (<MASTERIN>) {
  chomp;
  undef $masterHash{$_};
  push @masterArray, $_;
  $countHash{$_} = [];
}

### FOR EACH FILE...
my $fileIterator = 0;
foreach my $file (@files) {
  my %fileHash;
  ### ... read each insertion as a hash
  open(TESTIN, "<$file");
  while(<TESTIN>) {
    chomp($_);
    $fileHash{$_} = 0;
  }
  close(TESTIN);
  
  $file =~ s/\.unique\.bed//;

  ### ...and ask if each insertion in the union is in the file hashs
  for (my $i=0; $i<@masterArray; $i++) {
    if(exists($fileHash{$masterArray[$i]})) {
      $countHash{$masterArray[$i]}[$fileIterator] = 1;
    }    
    else {
      $countHash{$masterArray[$i]}[$fileIterator] = 0;
    }
  }
  $fileIterator = $fileIterator +1;
}

### NOW PRINT STUFF OUT

### print header
my $headerLine = "Insertion";
foreach my $file (@files) {
  $headerLine = $headerLine . "\t" . $file;
}
print $headerLine . "\n";

foreach my $insertion (keys %countHash) {
  print $insertion . "\t" ; 
  $fileIterator = 0;
  foreach my $file (@files) {
    print $countHash{$insertion}[$fileIterator] . "\t" ;
    $fileIterator = $fileIterator +1;
  }
  print "\n"; 
}

exit(0);