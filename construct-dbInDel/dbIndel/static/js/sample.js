jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "abs-asc": function( a, b ) {
    return Math.abs(a) - Math.abs(b);
  },
  "abs-desc": function( a, b ) {
    return Math.abs(b) - Math.abs(a);
  }
});

$(function () {
        $('#indels tfoot th').each( function () {
        $(this).html( '<input type="text" class = "col-xs-12"  />' );
    });
        //var table=$('#indels').DataTable({});
    //初始化表格
    var table=$('#indels').DataTable({
        responsive: true,
        processing: true,
        deferRender: true,
        order: [[6, 'asc']],
        ajax: 'table',
        columns: [
            {data: 'indel', orderable: false},
            {data: 'related_gene__symbol', orderable: false},
            {data: 'annotation', orderable: false},
            {data: 'in_dbSNP'},
            {data: 'ins_reads'},
            {data: 'ins_reads'},
            {data: 'tss_distance'},
            {data: 'nearest_refseq', orderable: false},
            {data: 'tfs', orderable: false}
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
            targets: 6,
            type: 'abs'
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
        }]
    });

        table.columns().eq( 0 ).each( function ( colIdx ) {
        $( 'input', table.column( colIdx ).footer() ).on( 'keyup change', function () {
          table.column( colIdx ).search( this.value ).draw();
        } );
    } );

});