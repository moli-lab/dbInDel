$(function () {

    var SPECIES = {'hg19': 'human', 'mm10': 'murine'};

    //初始化样本表格
    $('#samples').dataTable({
        responsive: true,
        processing: true,
        deferRender: true,
        ajax: 'table' + location.search,
        columns: [],
        columnDefs: [{
            targets: 0,
            data: null,
            render: function (data, type, row) {
                return '<a href="/sample/' + row['id'] + '">' + row['name'] + '</a>';
            }
        }, {
            targets: 1,
            data: null,
            render: function (data, type, row) {
                return SPECIES[row['genome']] + '(' + row['genome'] + ')';
            }
        }, {
            targets: 2,
            data: 'remark',
            render: function (data, type, row) {
                return row['remark']
            }
        }, {
            targets: 3,
            data: null,
            render: function (data, type, row) {
                return '<a href="https://www.ncbi.nlm.nih.gov/pubmed/' + row['pmid'] + '">' + row['pmid'] + '</a>';
            }
        }, {
            targets: 4,
            data: null,
            render: function (data, type, row) {
                return '<a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + row['h3k27ac'] + '">' + row['h3k27ac'] + '</a>';
            }
        }, {
            targets: 5,
            data: null,
            render: function (data, type, row) {
                return '<a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=' + row['input'] + '">' + row['input'] + '</a>';
            }
        }]
    });

    /**
     * 监听下拉框的展开和收起状态，改变提示符
     */
    $('#organ_collapse').on('hidden.bs.collapse', function () {
        $('#organ_collapse_btn').html("<span class=\"glyphicon glyphicon-triangle-bottom\"></span>");
    });
    $('#organ_collapse').on('shown.bs.collapse', function () {
        $('#organ_collapse_btn').html("<span class=\"glyphicon glyphicon-triangle-top\"></span>");
    });
    $('#cell_type_collapse').on('hidden.bs.collapse', function () {
        $('#cell_type_collapse_btn').html("<span class=\"glyphicon glyphicon-triangle-bottom\"></span>");
    });
    $('#cell_type_collapse').on('shown.bs.collapse', function () {
        $('#cell_type_collapse_btn').html("<span class=\"glyphicon glyphicon-triangle-top\"></span>");
    });
    $('#cancer_type_collapse_btn').on('hidden.bs.collapse', function () {
        $('#cancer_type_collapse_btn').html("<span class=\"glyphicon glyphicon-triangle-bottom\"></span>");
    });
    $('#cancer_type_collapse').on('shown.bs.collapse', function () {
        $('#cancer_type_collapse_btn').html("<span class=\"glyphicon glyphicon-triangle-top\"></span>");
    });

});