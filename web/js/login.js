
function login() {
    var url = "api/login_servlet";
    var sessionKey = "loginID";
    var sessionValue = $("#loginID").val();
    var dataToServer = {sessionKey : sessionKey, sessionValue : sessionValue};

    $.post(url, dataToServer, function (dataFromServer) {

        console.log("Finished calling servlet.");
        console.log(dataFromServer);

        $("#loginID").val("");
        getLogin();
    });
}

function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);

        if(dataFromServer.trim() != "null"){
            $('#getLoginResult').html("You are logged in as '" + dataFromServer + "'");
            $('#logOutSection').show();
        } else {
            $('#logOutSection').hide();
            $('#getLoginResult').html(" ");
        }
    });
}

function logOut() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin()
    });
}


button = $('#login');
button.on("click", login);

button = $('#getLogin');
button.on("click", getLogin);

button = $('#logOut');
button.on("click", logOut);

getLogin();