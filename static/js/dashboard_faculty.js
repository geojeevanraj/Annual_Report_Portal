document.getElementById("redirectButton").onclick = function () {
    window.location.href = "faculty_related_form.html";
};

// Toggle display of the Academic Achievements Form
function toggleForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html"; // Change to your login page URL
}
