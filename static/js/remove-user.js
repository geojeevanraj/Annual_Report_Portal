function confirmRemoval() {
    const email = document.getElementById("email").value;
    const rollNo = document.getElementById("rollNo").value;

    // Check that at least one field is filled in
    if (email === "" && rollNo === "") {
        alert("Please enter either Email or Roll No to remove a user.");
        return false;
    }

    // Confirmation prompt
    const confirmation = confirm("Are you sure you want to remove this user?");
    if (confirmation) {
        alert("User removed successfully!");
        document.getElementById("removeUserForm").reset(); // Clear the form
    }
    
    return false; // Prevent form submission for demo purposes
}

function confirmRemoval() {
    return confirm("Are you sure you want to remove this user?");
}

