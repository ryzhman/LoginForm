/**
 * Created by Олександр on 05.12.2016.
 */

(function () {
    var users = [
        {
            name: "user",
            pass: "user",
            access: "limited",
            lastVisit: new Date().toString()
        },
        {
            name: "admin",
            pass: "admin",
            access: "unlimited",
            lastVisit: new Date().toString()
        }
    ];

    createCredentialForms();

    function createCredentialForms() {
        var parent = document.getElementById("divForLoginForm");
        var loginForm = document.createElement('form');
        loginForm.setAttribute('class', 'login');

        createHeader(parent);
        createLoginForm(loginForm);
        createPasswordForm(loginForm);
        createSubmitButton(parent, loginForm);
    }

    function createHeader(parent) {
        var title = document.createElement('h2');
        title.innerText = "Enter your credentials here";
        parent.appendChild(title);
    }

    function createLoginForm(loginForm) {
        var title = document.createElement('h4');
        title.innerText = "Username:";

        var input = document.createElement('input');
        input.setAttribute('id', 'login');
        input.setAttribute('class', 'input');
        input.setAttribute('type', 'text');
        input.required = true;
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('placeholder', 'Enter login here...');

        loginForm.appendChild(title);
        loginForm.appendChild(input);
    }

    function createPasswordForm(loginForm) {
        var title = document.createElement('h4');
        title.innerText = "Password:";

        var input = document.createElement('input');
        input.setAttribute('id', 'pass');
        input.setAttribute('class', 'input');
        input.setAttribute('type', 'password');
        input.required = true;
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('placeholder', 'Enter password here...');

        loginForm.appendChild(title);
        loginForm.appendChild(input);
    }

    function createSubmitButton(parent, loginForm) {
        var button = document.createElement('input');
        button.setAttribute('class', 'submitBut');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Submit');
        button.addEventListener('click', validateCredentials);

        loginForm.appendChild(document.createElement('br'));
        loginForm.appendChild(button);
        parent.appendChild(loginForm);
    }

    function validateCredentials(event) { //how to pass form as param?
        event.preventDefault();   //prevent page from reloading
        var login = document.getElementById("login").value;
        var pass = document.getElementById("pass").value;

        var user = validateLogin(login);
        if (user !== null) {
            validatePass(user, pass);
        } else {
            validateFail();
        }
    }

    function validateLogin(login) {
        var user = null;

        for (var i = 0; i < users.length; i++) {
            if (login === users[i].name) {
                user = users[i];
                break;
            }
        }
        return user;
    }

    function validatePass(user, pass) {
        if (pass === user.pass) {
            validateSuccess(user);
        } else {
            validateFail();
        }
    }

    function validateFail() {
        alert("Problems during logging in. Try again");
        document.getElementById("login").value = "";
        document.getElementById("pass").value = "";
    }

    function validateSuccess(user) {
        var parent = document.getElementById('divForLoginForm');
        var popupWindow = document.createElement('div');
        popupWindow.setAttribute('class', 'popupWindow');
        var close = document.createElement('span');
        close.setAttribute('class', 'close');
        close.innerText = "X";
        close.addEventListener('click', function (event) {
            popupWindow.style.display = "none";
        });
        var info = document.createElement('p');
        info.innerText = "Welcome " + user.name + "\n" +
            "You are granted " + user.access +
            ". \n Last time you logged in " + user.lastVisit;
        user.lastVisit = (new Date()).toString();
        popupWindow.appendChild(close);
        popupWindow.appendChild(info);
        popupWindow.style.display = "block";

        parent.appendChild(popupWindow);
    }


}());
