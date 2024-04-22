function signup() {
    // Get all input from fields
    const fname = document.getElementById('first-name').value;
    const lname = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email)) {
        console.log('Your email is invalid');
        alert("Your email is invalid");
        return;
    }
    if (!validate_password(password)) {
        console.log('Your password is invalid');
        alert("Your password is too short. Must be 6 characters or longer!");
        return;
    }
    if (!validate_field(fname)) {
        console.log('Your First Name is invalid');
        alert("Your First Name cannot be blank");
        return;
    }
    if (!validate_field(lname)) {
        console.log('Your Last Name is invalid');
        alert("Your Last Name cannot be blank");
        return;
    }

    // Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Declare user variable
            const user = userCredential.user;

            // Add this user to database
            const user_data = {
                email: email,
                first_name: fname,
                last_name: lname,
                last_login: Date.now()
            };

            database.ref('users/' + user.uid).set(user_data);

            alert('User Created');
        })
        .catch((error) => {
            // Firebase will use this to alert user
            const error_message = error.message;
            console.error(error_message);
            alert(error_message);
        });
}

function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field.trim() !== '';
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('sign-up-button').addEventListener("click", function(event) {
        event.preventDefault();
        signup();
    });
});
