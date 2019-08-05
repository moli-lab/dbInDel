//初始化样本表格

$(function () {
    if(location.search!=''){$('#indels tfoot th').each( function () {
        var title = $('#indels tfoot th').eq( $(this).index() ).text();
        $(this).html( '<input type="text" class = "col-xs-12"  />' );
    });}
    if ($('#indels').length > 0) {
        //初始化表格
        var table = $('#indels').DataTable({//dataTable
            searching: true,
            responsive: true,
            processing: true,
            deferRender: true,
            serverSide: true,
            order: [[5, 'desc']],
            ajax: {url: '/search/table' + location.search, type: 'post'},
            columns: [
                {data: 'indel', orderable: false},
                {data: 'related_gene__symbol', orderable: false},
                {data: 'annotation', orderable: false},
                {data: 'in_dbSNP', orderable: false},
                {data: 'ins_reads'},
                {data: 'ref_reads'},
                {data: 'tss_distance', orderable: false},
                {data: 'nearest_refseq', orderable: false},
                {data: 'tfs', orderable: false},
                {data: 'sample__name', orderable: false},
                {data: 'sample__cancer_type'}
            ],
            columnDefs: [{
                targets: 0,
                orderable: false,
                data: null,
                render: function (data, type, row) {
                    return '<a target="_blank" href="/indel/' + row['id'] + '">' + row['chrom'] + ':' + row['start'] + '-' + row['end'] + ' ' + row['indel'] + ' ' + row['sequence'] + '</a>';
                }
            }, {
                targets: 5,
                data: null,
                ordering: 'desc',
                render: function (data, type, row) {
                    return '' + (row['ins_reads'] / row['ref_reads']).toFixed(2);
                }
            }, {
                targets: 8,
                data: null,
                orderable: false,
                render: function (data, type, row) {
                    var tfs = row['tfs'];
                    if (tfs.length > 10){
                        tfs = tfs.slice(0, 8) + '...';
                    }
                    return '<span title="'+ row['tfs'] +'">' + tfs +'</span>'
                }
            }, {
                targets: 9,
                data: null,
                orderable: false,
                render: function (data, type, row) {
                    return '<a href ="/sample/'+row['sample__id']+'" data-toggle="popover" data-placement="bottom" data-content="'+row['sample__cancer_type']+'" data-trigger="hover" >'+row['sample__name']+'</a>'
                 }
            }
            ]
        });
    }

       if(location.search!=''){ table.columns().eq( 0 ).each( function ( colIdx ) {
        $( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
          table.column( colIdx ).search( this.value ).draw();
        } );
    });}

});
