window.onload = function () {
    // Handle logout message
    const logoutMessage = localStorage.getItem("logoutMessage");
    if (logoutMessage) {
        displayMessage(logoutMessage, "green");
        localStorage.removeItem("logoutMessage");
    }

    // Handle flash messages from the backend
    const flashMessage = document.getElementById("flash-message");
    if (flashMessage) {
        // Display the flash message for 5 seconds
        setTimeout(() => {
            flashMessage.style.display = "none";
        }, 1000);
    }
};

/**
 * Function to display a message on the page.
 * @param {string} message - The message to display.
 * @param {string} color - The color of the message text.
 */
function displayMessage(message, color) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.color = color;
    messageDiv.style.fontSize = "16px";
    messageDiv.style.marginTop = "10px";
    messageDiv.style.textAlign = "center";
    messageDiv.style.border = `1px solid ${color}`;
    messageDiv.style.padding = "10px";
    messageDiv.style.borderRadius = "5px";
    messageDiv.style.maxWidth = "400px";
    messageDiv.style.margin = "10px auto";

    // Append to the body or a specific container
    document.body.appendChild(messageDiv);

    // Automatically remove the message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}
