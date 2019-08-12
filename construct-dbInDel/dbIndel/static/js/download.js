$(function () {

    //初始化样本表格
    var table = $('#samples').dataTable({
        responsive: true,
        processing: true,
        deferRender: false,
        ajax: 'table' + location.search,
        columns: [],
        columnDefs: [
            {
                targets: 0,
                data: null,
                render: function (data, type, row) {
                    return '<input type="checkbox" name="sample" value="' + row['id'] + '">';
                }
            },
            {
                targets: 1,
                data: null,
                render: function (data, type, row) {
                    return '<a href="/sample/' + row['id'] + '">' + row['name'] + '</a>';
                }
            }, {
                targets: 2,
                data: null,
                render: function (data, type, row) {
                    return '<a href="/static/data/indel/' + row['h3k27ac'] + '.indel.txt"><span class="glyphicon glyphicon-download-alt"></span></a>';
                }
            }, {
                targets: 3,
                data: null,
                render: function (data, type, row) {
                    return '<a href="/static/data/bw/' + row['h3k27ac'] + '.bw"><span class="glyphicon glyphicon-download-alt"></span></a>';
                }
            }, {
                targets: 4,
                data: null,
                render: function (data, type, row) {
                    return '<a href="/static/data/enhancer/' + row['h3k27ac'] + '.bed"><span class="glyphicon glyphicon-download-alt"></span></a>';
                }
            }, {
                targets: 5,
                data: 'remark',
                render: function (data, type, row) {
                    return row['remark']
                }
            }]
    }).api();

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

    $('.select_all').click(function () {
        var state = this.checked;
        $('.select_all').each(function () {
            this.checked = state;
        });
        table.$("input[type='checkbox']").each(function () {
            this.checked = state;
        });
    });

    $('.btn_submit').click(function () {
        var file = this.value;
        var url = '/download/multi/' + file + '?';
        if (table.$("input[type='checkbox']:checked").length == 0) {
            alert('Please select the sample you want to download!');
        } else {
            table.$("input[type='checkbox']:checked").each(function () {
                url += '&sample=' + this.value;
            });
            window.open(url, '_blank');
        }
    });

});