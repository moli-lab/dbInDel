$(function () {

    //初始化样本表格
    $('#samples').dataTable({
        responsive: true,
        processing: true,
        deferRender: true,
        ajax: 'table' + location.search,
        columns: [
            {data: "name"},
            {data: "genome"},
            {data: "biosample_type"},
            {data: "organ"},
            {data: 'cell_type'},
            {data: "remark"},
            {data:"lindel"}
        ],
        columnDefs: [{
            targets: 0,
            data: null,
            render: function (data, type, row) {
                return '<a href="/sample/' + row['id'] + '">' + row['name'] +'</a>';
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