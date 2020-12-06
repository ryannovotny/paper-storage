// Get search results from query
function getSearchResults() {
    var query = $("#searchInput").val();

    if (query === '') {
        return false;
    } else {
        $.ajax({
            url: 'search?srch=' + encodeURIComponent(query),
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                $('#itemContentMain').bootstrapTable({ data: result });
                $('#itemContentMain').bootstrapTable('load', result);

                var table = document.getElementById('itemContentMain');
                var rows = table.getElementsByTagName('tr');
                $(rows).click(function () {
                    /* $('.detail-view').remove(); */
                    $(rows).removeClass('table-active');
                    $(this).addClass('table-active');
                });
            }
        }).fail(function (xhr, ajaxOptions, thrownError) {
            alert("The search failed to return results: " + thrownError);
        });
    }
    return false;
}

function detailFormatter(row, value) {
    var html = [];
    html.push('<div class="card">' +
        '<div class="card-body">' +
        '<h5 class="card-title">Abstract</h5>' +
        '<p class="card-text">' + value.abstract + '</p>' +
        '</div>' +
        '</div>');
    return html.join('');
}

// Author Listing Formatter
function authorFormatter(value) {
    string = "";
    for (i = 0; i < value.length - 1; i++) {
        string = string + value[i] + ", ";
    }
    string = string + value[i];
    return string;
}

// Hyperlink Formatter
function linkFormatter(value) {
    link = "<a href='https://dx.doi.org/" + value + "'>" + value + '</a>';
    return link;
}

// Date Formatter
function dateFormatter(value) {
    if (value.length != 0) {
        var date = new Date(value);
        return (("0" + (date.getMonth() + 1)).slice(-2)) + "/"
            + (("0" + date.getDate()).slice(-2)) + "/"
            + (date.getFullYear());
    } else {
        return "-";
    }
}

// On Document Ready
$(document).ready(function () {
    // Set the item table
    var $table = $('#itemContentMain');

    // Activate the table and set controls
    $table.bootstrapTable({
        classes: "table table-hover",
        detailView: true,
        detailViewByClick: true,
        detailFormatter: "detailFormatter",
        detailViewIcon: false,
        clickToSelect: true,
        columns: [{
            field: "title",
            title: "Title",
            widthUnit: "%",
            width: "30"
        },
        {
            field: "authors",
            title: "Authors",
            formatter: "authorFormatter",
            widthUnit: "%",
            width: "20"
        },
        {
            field: "journal",
            title: "Journal",
            widthUnit: "%",
            width: "20"
        },
        {
            field: "doi",
            title: "DOI Link",
            formatter: "linkFormatter",
            widthUnit: "%",
            width: "15"
        },
        {
            field: "published",
            title: "Publish Date",
            formatter: "dateFormatter",
            widthUnit: "%",
            width: "15"
        }
        ]
    });

    $(".sidebar-dropdown > a").click(function () {
        // When an item is clicked, expand the menu (and opposite)
        if ($(this).parent().hasClass("active")) {
            $(this).next(".sidebar-submenu").slideUp(200);
            $(this).parent().removeClass("active");
        } else {
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }
    });

    // Open link on sidebar or get subcategory items if no link
    $(".sidebar-submenu > ul > li > a").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
        else {
            $(this).addClass("active");
        }
    });
});