 // Redirect to add-user page when clicking the Add User button
 document.getElementById("redirectButton-1").onclick = function () {
    window.location.href = "/admin/add-user";  // Redirect to /admin/add-user
};


function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rollNo = document.getElementById("rollNo").value;
    const department = document.getElementById("department").value;

    // Simple validation checks
    if (email === "" || password === "" || rollNo === "" || department === "") {
        alert("All fields are required.");
        return false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // If validation passes
    alert("User added successfully!");
    document.getElementById("addUserForm").reset(); // Clear the form
    return false; // Prevent form submission for demo
}
