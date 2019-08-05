/**
 * Created by yangmqglobe on 2017/5/29.
 */
$(function () {

    $('#data_table1').dataTable({
        responsive: true,
        processing: true,
        iDisplayLength: 25,
        dom: 't',
        bSort: false
    });
    $('#data_table2').dataTable({
        responsive: true,
        processing: true,
        iDisplayLength: 25,
        dom: 't',
        bSort: false
    });
});