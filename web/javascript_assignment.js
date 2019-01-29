//Part 1

function helloButton() {
    console.log('hello');
}

var fromButton1 = $('#button1');
fromButton1.on("click", helloButton);

// Part 2
function addField (){
    var box1 = parseInt(document.getElementById("field1").value);
    var box2 = parseInt(document.getElementById("field2").value);
    var sum  = box1 + box2;
    parseInt(document.getElementById("field3").value = sum);

}

var fromButton2 = $('#button2');
fromButton2.on("click", addField);

//Part 3

function hide() {
    $('#paragraphToHide').toggle(500);
}

var fromButton3 = $('#button3');
fromButton3.on("click", hide);

//Part 4


function validateFunction() {

    var v1 = $('#phoneField').val();

    var reg = /^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/;

    // Test the regular expression to see if there is a match
    if (reg.test(v1)) {
        $('#phoneField').text("Ok");
        console.log('Ok');
    } else {
        $('#phoneField').text("Bad");
        console.log('Bad');
    }}

var formButton4 = $('#button4');
formButton4.on("click", validateFunction);

// Part 5

function jsonFunction() {


    var firstName = (document.getElementById("firstName").value);
    var lastName = (document.getElementById("lastName").value);
    var email = (document.getElementById("email").value);


    var myObject = {firstName: firstName, lastName: lastName, email: email};

    var jsonString = JSON.stringify(myObject);

    console.log(jsonString);
}

var formButton5 = $('#button5');
formButton5.on("click", jsonFunction);