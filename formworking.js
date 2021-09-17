
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://localhost:44318/api/form",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) 
        {
            $("#DIV").html('');
            var DIV = '';
            $.each(data, function (i, item) {
                var rows = "<tr>" +
                    "<td id='email'>" + item.email + "</td>" +
                    "<td id='fname'>" + item.name + "</td>" +
                    "<td id='cities'>" + item.city + "</td>" +
                    "<td id='number'>" + item.no + "</td>" +
                    "<td id='pwd'>" + item.pass + "</td>" +
                    "<td id='Edit'><button class='btn' type='button' onclick='myFunction(" +
                    item.id +
                    ")'> Edit </button></td>" +
                    "<td id='Delete'><button class='btn' type='button' onclick='myFunction2(" +
                    item.id +
                    ")'> Delete </button></td>"
                "</tr>";
                $('#Table').append(rows);
            }); 
            console.log(data);
        },

        failure: function (data) {
            alert(data.responseText);
        }, 
        error: function (data) {
            alert(data.responseText);
        } 
    });

});


function formValidate() {
    var email = document.getElementById("email").value;
    if (email.length < 1) {
        alert("Empty Email")
    }
    else
        (validateEmail(email)) ? "" : alert("Invalid Email")


    var name = document.getElementById("name").value;
    if (name.length < 1) {
        alert("Empty Name")
    }
    else
        (validateName(name)) ? "" : alert("Invalid Email");


    var password = document.getElementById("pwd").value;
    if (password.length < 1) {
        alert("Empty Password")
    }
    else if (password.length < 6) {
        alert("Password should be atleast 6 characters long.")
    }
    else
        (validatePassword(password)) ? "" : alert("Password can only contain digits and alphabets ")


    var confPassword = document.getElementById("cpwd").value;
    if (confPassword.length < 1) {
        alert("Confirm Password")
    }
    else {
        (matchPassword(password, confPassword)) ? "" : alert("Password and onfirm password are not same")
    }

    var city = document.getElementById("cities").value;

    if (city.length < 1) {
        alert("Error City Name")
    }
    else {
        (validateCity(city)) ? "" : alert("Invalid City Name");
        var no = document.getElementById("number").value;
    }

    if (no.length < 1) {
        alert("Number empty")
    }
    else {
        (validateNo(no)) ? "" : alert("Invalid Number")
    }
    var method = new Object();
    method.email = $('#email').val();
    method.name = $('#name').val();
    method.city = $('#city').val();
    method.no = $('#no').val();
    method.pass = $('#pass').val();
    const myJSON = JSON.stringify(method);
    console.log(myJSON);
    $.ajax({
        url: 'https://localhost:44318/api/form',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: myJSON,
        success: function (data, textStatus, xhr) {
            console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    })
    location.reload()
}

function myFunction(form) {
    var method = new Object();
    method.id = form
    method.email = $('#email').val();
    method.name = $('#name').val();
    method.city = $('#city').val();
    method.no = $('#no').val();
    method.pass = $('#pass').val();
    const myJSON = JSON.stringify(method)
    console.log(myJSON);

    $.ajax({
        type: "PUT",
        url: "https://localhost:44318/api/form/" + form,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: myJSON,
        cache: false,
        success: function (a) {
            if (a.success == true)
                window.location = "index.html";
            else { }
        },
        error: function (xhr, textStatus, errorThrown)
     {
        }
    })
    location.reload()
}



function myFunction2(form) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:44318/api/form/" + form,
        cache: false,
        success: function (a) {
            if (a.success == true)
                window.location = "index.html";
            else { }
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    })
    location.reload();

}




