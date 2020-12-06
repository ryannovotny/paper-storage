// Search Function
function getSearchResults() {
    // Get Query
    var query = $("#searchInput").val();

    // If Query Is Empty, Do Nothing
    if (query === '') {
        return false;
    } else {
        // Otherwise Perform AJAX Call
        $.ajax({
            url: 'search?srch=' + encodeURIComponent(query),
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                // Load Data Into Table
                $('#itemContentMain').bootstrapTable({ data: result });
                // Refresh Table to Display Data
                $('#itemContentMain').bootstrapTable('load', result);
            }
        }).fail(function (xhr, ajaxOptions, thrownError) {
            // Alert if AJAX Call Fails
            alert("The search failed to return results: " + thrownError);
        });
    }
    return false;
}

function detailFormatter(row, value) {
    var html = [];
    // Set Detail Snippet Format
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
    // For All Authors in Results
    for (i = 0; i < value.length - 1; i++) {
        // Format and Add All Authors But Last To Array
        string = string + value[i] + ", ";
    }
    // Add Last Author To Array
    string = string + value[i];
    return string;
}

// DOI Hyperlink Formatter
function linkFormatter(value) {
    // Set Hyperlink Item
    link = "<a href='https://dx.doi.org/" + value + "'>" + value + '</a>';
    return link;
}

// Date Formatter
function dateFormatter(value) {
    // If Value is Present
    if (value.length != 0) {
        // Create New Date from Value
        var date = new Date(value);
        // Format Date Output (MM/DD/YYYY)
        return (("0" + (date.getMonth() + 1)).slice(-2)) + "/"
            + (("0" + date.getDate()).slice(-2)) + "/"
            + (date.getFullYear());
    } else {
        // Otherwise Return Non-Date
        return "-";
    }
}

// On Document Ready
$(document).ready(function () {
    // Activate Table in Main Content Area
    var $table = $('#itemContentMain');

    // Set Table Properties
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

    // When Sidebar Dropdown Menu is Clicked
    $(".sidebar-dropdown > a").click(function () {
        // If Current Dropdown is Active
        if ($(this).parent().hasClass("active")) {
            // Close Dropdown Menu
            $(this).next(".sidebar-submenu").slideUp(200);
            // If Submenu Item is Selected, Leave Dropdown Active
            if ($(".sidebar-submenu > ul > li > a").hasClass("active")) { }
            else {
                // Otherwise Set Dropdown Inactive
                $(this).parent().removeClass("active");
            }
        } else {
            // Otherwise Open Dropdown
            $(this).next(".sidebar-submenu").slideDown(200);
            // Set Dropdown Active
            $(this).parent().addClass("active");
        }
    });

    // When Sidebar Dropdown Menu Item is Clicked
    $(".sidebar-submenu > ul > li > a").click(function () {
        // If Item is Active
        if ($(this).hasClass("active")) {
            // Set Inactive
            $(this).removeClass("active");
        }
        else {
            // Otherwise Set Item Active
            $(this).addClass("active");
        }
    });
});