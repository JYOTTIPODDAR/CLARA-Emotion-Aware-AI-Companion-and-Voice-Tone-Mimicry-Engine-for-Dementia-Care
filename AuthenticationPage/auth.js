// ========================================
// PASSWORD SHOW / HIDE
// ========================================

function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }
}


// ========================================
// LOGIN FORM
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();


        if (!email || !password) {

            alert("Please enter your email and password.");

            return;
        }


        /*
            BACKEND CONNECTION WILL BE ADDED HERE.

            Later:

            fetch("/login", {
                method: "POST",
                body: ...
            })
        */


        alert("Login UI is working! Backend will be connected next.");

    });

}


// ========================================
// SIGNUP FORM
// ========================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;


        if (!name || !email || !password || !confirmPassword) {

            alert("Please fill all fields.");

            return;
        }


        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");

            return;
        }


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        if (!terms) {

            alert("Please accept the Terms & Privacy Policy.");

            return;
        }


        /*
            BACKEND CONNECTION WILL BE ADDED HERE.

            Later the form will send data
            to Flask and SQLite.
        */


        alert("Signup UI is working! Backend will be connected next.");

    });

}