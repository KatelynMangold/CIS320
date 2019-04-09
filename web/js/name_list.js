function updateTable()
{
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result)

    {

        for (var i = 0; i < json_result.length; i++) {
            var phone = json_result[i].phone;
            phone = phone.replace(/-/g, "");
            var myPhone = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10);

            $('#datatable tr:first').after('<tr>' +
                '<td>' + json_result[i].id + '</td>' +
                '<td>' + json_result[i].first + '</td>' +
                '<td>' + json_result[i].last + '</td>' +
                '<td>' + json_result[i].email + '</td>' +
                '<td>' + myPhone + '</td>' +
                '<td>' + json_result[i].birthday + '</td>' +
                '<td><button type="button" name="delete" ' + 'class="deleteButton btn" ' + 'value="' + json_result[i].id +
                '">Delete</button>' + '</td>' +
                '<td><button type="button" name="edit" class="editButton btn" value="' + json_result[i].id + '"'
                +'>Edit</button></td>' +
                '</tr>');
        }

        var buttons = $(".deleteButton");
        buttons.on("click", deleteItem);

        var ebuttons = $(".editButton");
        ebuttons.on("click", editItem);
    });

}

updateTable();

function deleteItem(e) {
    //console.log("Delete");
    //console.debug(e.target.value);
    var jsonId = {"id": e.target.value};

    var url = "api/name_list_delete";
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(jsonId),
        success: function (dataFromServer) {
            refreshFields();
        },
        contentType: "application/json",
        dataType: 'text'
    });
}

function showDialogAdd() {
    console.log("Opening add item dialog");

    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val();

    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-valid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-valid");
    $('#birthday').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");
    $('#lastName').removeClass("is-invalid");
    $('#email').removeClass("is-invalid");
    $('#phone').removeClass("is-invalid");
    $('#birthday').removeClass("is-invalid");

    $('#myModal').modal('show');
}

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd)

function saveChanges() {
    console.log("Changes have been saved.")
    validateFunction();
}

var saveButton = $('#saveChanges');
saveButton.on("click", saveChanges);

// Function to validate
function validateFunction() {
    var valid = true;
    var firstName = $('#firstName');
    var lastName = $('#lastName');
    var email = $('#email');
    var phone = $('#phone');
    var birthday = $('#birthday');

    var nameReg = /^[a-zA-Z]+(([',.-][a-z])?[a-zA-Z]*)*$/;
    var emailReg =  /^\S+@\S+\.\S+$/i;
    var phoneReg = /^[0-9]{3}([-]?)[0-9]{3}([-]?)[0-9]{4}$/;
    var birthdayReg = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i;

    if (nameReg.test(firstName.val())) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");

    } else {
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
        console.log("invalid first name");
        valid = false;
    }

    if (nameReg.test(lastName.val())) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");

    } else {
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
        console.log("invalid last name");
        valid = false;
    }

    if (emailReg.test(email.val())) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");

    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        console.log("invalid email");
        valid = false;
    }
    if (phoneReg.test(phone.val())) {
        $('#result').text("Ok");
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");

    } else {
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
        console.log("invalid phone");
        valid = false;
    }
    if (birthdayReg.test(birthday.val())) {
        $('#result').text("Ok");
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");


    } else {
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
        console.log("invalid birthday");
        valid = false;
    }

    if(valid){
        var jsonData = {
            "first":firstName.val(),
            "last":lastName.val(),
            "email":email.val(),
            "phone":phone.val(),
            "birthday":birthday.val()
        };

        jqueryPostJSONAction(jsonData);
    }
}

function editItem(e){

    $('#id').removeClass("is-valid");
    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-valid");
    $('#email').removeClass("is-valid");
    $('#phone').removeClass("is-valid");
    $('#birthday').removeClass("is-valid");
    $('#id').removeClass("is-invalid");
    $('#firstName').removeClass("is-invalid");
    $('#lastName').removeClass("is-invalid");
    $('#email').removeClass("is-invalid");
    $('#phone').removeClass("is-invalid");
    $('#birthday').removeClass("is-invalid");

    var id = e.target.value;
    var firstName = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var lastName = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    var phone = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    var email = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    $('#id').val(id);
    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#phone').val(phone);
    $('#email').val(email);
    $('#birthday').val(birthday);

    $('#myModal').modal('show');

}

function jqueryPostJSONAction(jsonData) {

    var url = "api/name_list_edit";

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(jsonData),
        success: function(dataFromServer) {
            console.log(dataFromServer);
            refreshFields();
        },
        contentType: "application/json",
        dataType: 'text'
    });

}
function refreshFields() {

    for(var i = $("#datatable tr").length-1; i > 0 ; i--) {
        $("#datatable tr")[i].remove();
    }
        $('#myModal').modal('hide');
        updateTable();

}

