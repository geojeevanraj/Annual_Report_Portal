document.getElementById("redirectButton-1").onclick = function () {
    window.location.href = "add-user.html";
};

document.getElementById("redirectButton-2").onclick = function () {
    window.location.href = "approve-data.html";
};

document.getElementById("redirectRemoveButton").onclick = function () {
    window.location.href = "remove-user.html";
};

function logout() {
    localStorage.setItem("logoutMessage", "✅ Logged out successfully!");
    window.location.href = "login.html"; // Redirect to the login page
}