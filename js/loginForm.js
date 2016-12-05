/**
 * Created by Олександр on 05.12.2016.
 */


var users = [
    {
        name: "user",
        pass: "user",
        access: "limited"
    },
    {
        name: "admin",
        pass: "admin",
        access: "unlimited"
    }
]

(function () {
    createCredentialForms();

    function createCredentialForms() {
        createLoginForm();
        // createPasswordForm();
    }

    function createLoginForm() {
        var parent = document.getElementById("divForLoginForm");
        var title = document.createElement('h2');
        title.innerText = "Enter your credentials here"

        var loginForm = document.createElement('form');
        loginForm.setAttribute('class', 'login');

        var input = document.createElement('input');
        input.setAttribute('class', 'input');
        input.setAttribute('type', 'text');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('placeholder', 'Enter login here...');

        loginForm.appendChild(input);
        parent.appendChild(title);
        parent.appendChild(loginForm);
    }

}());
