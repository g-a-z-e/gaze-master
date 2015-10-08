function ajaxSend(url, value, EArray, fnSuccess, fnFailed) {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    fnSuccess && fnSuccess(xmlhttp.responseText);
                }
                else {
                    fnFailed && fnFailed(xmlhttp.responseText);
                    for (var i = 0; i < EArray.length - 1; i++) {
                        EArray[i].style.borderBottomColor = '#dc635f';
                    }
                    clear(EArray);
                }
            }
        }
    }
    xmlhttp.open("post", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(value);
}

var loginE = document.getElementById('select-login');
var signE = document.getElementById('select-sign');
var loginForm = document.getElementById('form-login');
var signForm = document.getElementById('form-sign');
signE.addEventListener('click', function (e) {
    signE.style.color = '#00bfa5';
    loginE.style.color = '#ccc';
    signForm.style.display = 'block';
    loginForm.style.display = 'none';
});
loginE.addEventListener('click', function (e) {
    loginE.style.color = '#00bfa5';
    signE.style.color = '#ccc';
    loginForm.style.display = 'block';
    signForm.style.display = 'none';
});

function clear(inputE) {
    var t = setTimeout(function () {
        for (var i = 0; i < inputE.length - 1; i++) {
            inputE[i].style.borderBottomColor = '#ccc';
        }
        clearTimeout(t);
    }, 1000);
}

var loginHandler = function (e) {
    e.preventDefault();
    var inputE = loginForm.getElementsByTagName('input');
    var username = inputE[0].value;
    var password = inputE[1].value;
    if (username.length < 6 || !(/^[0-9a-z]+$/).exec(username)) {
        inputE[0].style.borderBottomColor = '#dc635f';
        clear(inputE);
        return;
    }
    if (password.length < 6 || !(/^[0-9a-z]+$/).exec(password)) {
        inputE[1].style.borderBottomColor = '#dc635f';
        clear(inputE);
        return;
    }

    ajaxSend('/login',
        'username=' + username + '&password=' + password + '&csrfToken=' + loginForm.getElementsByTagName('span')[0].innerText,
        inputE,
        function (responseText) {
            if (responseText == '{\"message\":true}') {
                window.location = '/main';
            }
        },
        function (responseText) {
            loginForm.getElementsByTagName('form')[0].addEventListener('submit', loginHandler);
        }
    );
};

loginForm.getElementsByTagName('form')[0].addEventListener('submit', loginHandler);

var signHandler = function (e) {
    e.preventDefault();
    var inputE = signForm.getElementsByTagName('input');
    var username = inputE[0].value;
    var password = inputE[1].value;
    var passwordAgain = inputE[2].value;
    if (username.length < 6 || !(/^[0-9a-z]+$/).exec(username)) {
        inputE[0].style.borderBottomColor = '#dc635f';
        clear(inputE);
        return;
    }
    if (password.length < 6 || passwordAgain.length < 6 || password != passwordAgain
        || !(/^[0-9a-z]+$/).exec(password) || !(/^[0-9a-z]+$/).exec(passwordAgain)) {
        inputE[1].style.borderBottomColor = '#dc635f';
        inputE[2].style.borderBottomColor = '#dc635f';
        clear(inputE);
        return;
    }

    signForm.getElementsByTagName('form')[0].removeEventListener('submit', signHandler);
    ajaxSend('/signUp',
        'username=' + username + '&password=' + password + '&csrfToken=' + signForm.getElementsByTagName('span')[0].innerText,
        inputE,
        function (responseText) {
            if (responseText == '{\"message\":true}') {
                window.location = '/main';
            }
        },
        function (responseText) {
            signForm.getElementsByTagName('form')[0].addEventListener('submit', signHandler);
        }
    );
};

signForm.getElementsByTagName('form')[0].addEventListener('submit', signHandler);