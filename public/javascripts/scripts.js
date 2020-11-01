// Set the admin view page
$(document).ready(function() {
    // Set the item table
    var $table = $('#itemContentMain');
    
    // Activate the table and set controls
    $table.bootstrapTable({
        classes: "table table-hover",
        columns: [ {
            field: "title",
            title: "Title" },
        {
            field: "authors",
            title: "Authors" },
        {
            field: "journal",
            title: "Journal" },
        {
            field: "topic",
            title: "Topic" },
        {
            field: "doi",
            title: "DOI Link" },
        {
            field: "added",
            title: "Date Added" }
        ]
    });

    // Get and display all items in the collection
    $.ajax({
        url: '/list',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            $('#itemContentMain').bootstrapTable({ data: result });
            $('#itemContentMain').bootstrapTable('load', result);
        },
    }).fail(function (xhr, ajaxOptions, thrownError){
        alert("The dump failed to return items: " + thrownError);
    });
});