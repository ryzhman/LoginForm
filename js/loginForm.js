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
        var parentForm = document.getElementById('divForLoginForm');
        // create parent div for modal window
        var popupDiv = document.createElement('div');
        popupDiv.setAttribute('class', 'popupDiv');
        popupDiv.style.display = "block";
        //create child div with data for modal window
        var popupWindow = document.createElement('div');
        popupWindow.setAttribute('class', 'popupWindow');
        
        var close = document.createElement('span');
        close.setAttribute('class', 'close');
        close.innerText = "X";
        close.addEventListener('click', closeModal);
        
        var info = document.createElement('p');
        info.setAttribute('class', 'modalWindowText');
        info.innerText = "Welcome " + user.name + "\n" +
            "You are granted " + user.access +
            " access. \n Last time you logged in " + user.lastVisit;

        var closeInfo = document.createElement('p');
        closeInfo.innerText = "*You can close this window by pressing X or ESC button";
        closeInfo.setAttribute('class','closeInfo');

        document.addEventListener('keydown', closeModal); //hide modal window by pressing enter
        user.lastVisit = (new Date()).toString();

        popupWindow.appendChild(close);
        popupWindow.appendChild(info);
        popupWindow.appendChild(closeInfo);

        popupDiv.appendChild(popupWindow);
        parentForm.appendChild(popupDiv);
    }

    function closeModal(event){
        event.stopPropagation();
        var modal = document.getElementsByClassName('popupDiv')[0];
        if(event != null && event.target.className == "close" || event.key == "Escape"){
            modal.style.display = "none";
        }
    }


}());
