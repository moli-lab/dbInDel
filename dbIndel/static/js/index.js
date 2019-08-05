$(document).ready(function(){

 /*$('#index_carousel').carousel({interval:2000});
$("#qs").click(function(){
//var postData = ['draw': 0, 'columns[0][data]': indel, 'columns[0][name]': , 'columns[0][searchable]': true, 'columns[0][orderable]': false, 'columns[0][search][value]': , 'columns[0][search][regex]': false, 'columns[1][data]': related_gene__symbol, 'columns[1][name]': , 'columns[1][searchable]': true, 'columns[1][orderable]': false, 'columns[1][search][value]': , 'columns[1][search][regex]': false, 'columns[2][data]': annotation, 'columns[2][name]': , 'columns[2][searchable]': true, 'columns[2][orderable]': false, 'columns[2][search][value]': , 'columns[2][search][regex]': false, 'columns[3][data]': in_dbSNP, 'columns[3][name]': , 'columns[3][searchable]': true, 'columns[3][orderable]': false, 'columns[3][search][value]': , 'columns[3][search][regex]': false, 'columns[4][data]': ins_reads, 'columns[4][name]': , 'columns[4][searchable]': true, 'columns[4][orderable]': true, 'columns[4][search][value]': , 'columns[4][search][regex]': false, 'columns[5][data]': ref_reads, 'columns[5][name]': , 'columns[5][searchable]': true, 'columns[5][orderable]': true, 'columns[5][search][value]': , 'columns[5][search][regex]': false, 'columns[6][data]': tss_distance, 'columns[6][name]': , 'columns[6][searchable]': true, 'columns[6][orderable]': false, 'columns[6][search][value]': , 'columns[6][search][regex]': false, 'columns[7][data]': nearest_refseq, 'columns[7][name]': , 'columns[7][searchable]': true, 'columns[7][orderable]': false, 'columns[7][search][value]': , 'columns[7][search][regex]': false, 'columns[8][data]': tfs, 'columns[8][name]': , 'columns[8][searchable]': true, 'columns[8][orderable]': false, 'columns[8][search][value]': , 'columns[8][search][regex]': false, 'columns[9][data]': sample__name, 'columns[9][name]': , 'columns[9][searchable]': true, 'columns[9][orderable]': false, 'columns[9][search][value]': , 'columns[9][search][regex]': false, 'columns[10][data]': sample__cancer_type, 'columns[10][name]': , 'columns[10][searchable]': true, 'columns[10][orderable]': true, 'columns[10][search][value]': , 'columns[10][search][regex]': false, 'order[0][column]': 5, 'order[0][dir]': desc, 'start': 0, 'length': 10, 'search[value]': , 'search[regex]': false];
var gene="&gene="+document.getElementById("fir").value;
var getData="/search?gene_genome=hg19&search=gene&region_genome=hg19&chrom=&region_start=&region_end="+gene;
$("#firpost").attr(getData);
});*/
 $('#index_carousel').carousel({interval:2000});
$("#qs").click(function(){
    var gene="&gene="+document.getElementById("fir").value;
    var action="/search?gene_genome=hg19&search=gene&region_genome=hg19&chrom=&region_start=&region_end=";
        console.log(action+gene);
    $("#firpost").attr('action',action+gene);
    });

});