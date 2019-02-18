function updateTable()
{
    var url = "api/name_list_get";

    $.getJSON(url, null, function (json_result)
    {
        for (var i = 0; i < json_result.length; i++) {
            $('#datatable tr:first').after('<tr>' +
                '<td>' + json_result[i].id + '</td>' +
                '<td>' + json_result[i].first + '</td>' +
                '<td>' + json_result[i].last + '</td>' +
                '<td>' + json_result[i].email + '</td>' +
                '<td>' + json_result[i].phone + '</td>' +
                '<td>' + json_result[i].birthday + '</td>' +
                '</tr>');
        }
    })
}
updateTable();


var fromaddItem = $('#addItem');
fromaddItem.on("click", jqueryGetButtonAction);