It is recommanded to make custom settings, because Various aspects of the code may have different function in the settings. Special attention should be paid to work submission, as this code was developed in a PBS environment. 

These scripts has several dependencies including samtools, bedtools, bowtie, bowtie2, pblat, fastaFromBed, R

*.pbs files need to be executed

The order of execution is:
-1CANCERS
-2Scaffold
-3deletions
-4Enhancers
-5Cross_Cancer_Sharing_smartEnh/5Cross_Cancer_Sharing_DELs_smartEnh
-6dbSNP/6DELs_dbSNP
-7Custom_Genomes/7Deletion-Custom

 These core codes are referenced from "Abraham BJ et al., Small genomic insertions form enhancers that misregulate oncogenes.Nat Commun. 2017". 