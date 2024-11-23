document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const userName = document.getElementById('userName').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    // Create a new feedback entry
    if (userName && feedback) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('feedback');
        feedbackDiv.innerHTML = `
            <p><strong>${userName}:</strong></p>
            <p>${feedback}</p>
            <hr>
        `;

        // Add the new feedback to the list
        document.getElementById('feedbackList').appendChild(feedbackDiv);

        // Clear form fields
        document.getElementById('feedbackForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});
