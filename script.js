const passwordInput = document.getElementById("password");

const copyPassword = document.getElementById("copyPassword");

const togglePassword = document.getElementById("togglePassword");

const strengthText = document.getElementById("strengthText");

const progressBar = document.getElementById("progressBar");

const scoreText = document.getElementById("scoreText");

const suggestionList = document.getElementById("suggestionList");

const generatePasswordButton =
    document.getElementById("generatePassword");
    passwordInput.addEventListener("input", analyzePassword);
    const commonPasswords = [
    "password",
    "123456",
    "12345678",
    "123456789",
    "qwerty",
    "admin",
    "welcome",
    "password123",
    "abc123"
];
   function analyzePassword() {

    const password = passwordInput.value;
    if (password.length === 0) {

    strengthText.textContent = "Enter password";

    strengthText.style.color = "#64748b";

    progressBar.style.width = "0%";

    progressBar.style.background = "#94a3b8";

    scoreText.textContent = "Score: 0/6";

    suggestionList.innerHTML =
        "<li>Enter a password to receive suggestions.</li>";

    updateRequirement(
        "lengthCheck",
        false,
        "At least 8 characters"
    );

    updateRequirement(
        "longLengthCheck",
        false,
        "At least 12 characters"
    );

    updateRequirement(
        "lowercaseCheck",
        false,
        "Contains lowercase letter"
    );

    updateRequirement(
        "uppercaseCheck",
        false,
        "Contains uppercase letter"
    );

    updateRequirement(
        "numberCheck",
        false,
        "Contains a number"
    );

    updateRequirement(
        "specialCheck",
        false,
        "Contains special character"
    );

    return;
}

    const hasMinimumLength = password.length >= 8;

    const hasLongLength = password.length >= 12;

    const hasLowercase = /[a-z]/.test(password);

    const hasUppercase = /[A-Z]/.test(password);

    const hasNumber = /[0-9]/.test(password);

    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    let score = 0;

    if (hasMinimumLength) {
        score++;
    }

    if (hasLongLength) {
        score++;
    }

    if (hasLowercase) {
        score++;
    }

    if (hasUppercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }

    console.log("Score:", score);
   
 let strength = "";

if (score <= 2) {
    strength = "Weak";
}
else if (score <= 4) {
    strength = "Medium";
}
else if (score === 5) {
    strength = "Strong";
}
else {
    strength = "Very Strong";
}

strengthText.textContent = strength;

scoreText.textContent = `Score: ${score}/6`;
const percentage = (score / 6) * 100;

progressBar.style.width = `${percentage}%`;

updateRequirement(
    "lengthCheck",
    hasMinimumLength,
    "At least 8 characters"
);

updateRequirement(
    "longLengthCheck",
    hasLongLength,
    "At least 12 characters"
);

updateRequirement(
    "lowercaseCheck",
    hasLowercase,
    "Contains lowercase letter"
);

updateRequirement(
    "uppercaseCheck",
    hasUppercase,
    "Contains uppercase letter"
);

updateRequirement(
    "numberCheck",
    hasNumber,
    "Contains a number"
);

updateRequirement(
    "specialCheck",
    hasSpecial,
    "Contains special character"
);
let suggestions = [];
if (!hasMinimumLength) {
    suggestions.push("Use at least 8 characters.");
}

if (!hasLongLength) {
    suggestions.push("Consider using at least 12 characters.");
}

if (!hasLowercase) {
    suggestions.push("Add a lowercase letter.");
}

if (!hasUppercase) {
    suggestions.push("Add an uppercase letter.");
}

if (!hasNumber) {
    suggestions.push("Add at least one number.");
}

if (!hasSpecial) {
    suggestions.push("Add a special character such as !, @ or #.");
}
suggestionList.innerHTML = "";

if (suggestions.length === 0) {

    suggestionList.innerHTML =
        "<li>Your password meets all basic requirements.</li>";

}
else {

    suggestions.forEach(function(suggestion) {

        const li = document.createElement("li");

        li.textContent = suggestion;

        suggestionList.appendChild(li);

    });

}
const isCommonPassword =
    commonPasswords.includes(password.toLowerCase());
    if (isCommonPassword) {
    suggestions.push(
        "This is a commonly used password. Choose something more unique."
    );
}
if (isCommonPassword) {
    score = Math.min(score, 2);
}
}
function updateRequirement(id, passed, text) {

    const element = document.getElementById(id);

    if (passed) {

        element.textContent = `✓ ${text}`;

        element.style.color = "#15803d";

        element.style.background = "#f0fdf4";

    }
    else {

        element.textContent = `○ ${text}`;

        element.style.color = "#64748b";

        element.style.background = "#f8fafc";

    }

}
function generateStrongPassword() {

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercase = "abcdefghijklmnopqrstuvwxyz";

    const numbers = "0123456789";

    const special = "!@#$%^&*";

    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        special;

    let password = "";

    password += uppercase[
        Math.floor(Math.random() * uppercase.length)
    ];

    password += lowercase[
        Math.floor(Math.random() * lowercase.length)
    ];

    password += numbers[
        Math.floor(Math.random() * numbers.length)
    ];

    password += special[
        Math.floor(Math.random() * special.length)
    ];

    for (let i = 4; i < 16; i++) {

        password += allCharacters[
            Math.floor(Math.random() * allCharacters.length)
        ];

    }

    return password;
}
 generatePasswordButton.addEventListener(
    "click",
    function() {

        const newPassword = generateStrongPassword();

        passwordInput.value = newPassword;

        document
            .querySelector(".password-box")
            .classList.add("generated");

        analyzePassword();

    }
);
togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

    }
    else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁";

    }

});
copyPassword.addEventListener("click", async function() {

    const password = passwordInput.value;

    if (password.length === 0) {
        return;
    }

    await navigator.clipboard.writeText(password);

    copyPassword.textContent = "✓";

    setTimeout(function() {

        copyPassword.textContent = "📋";

    }, 1500);

});