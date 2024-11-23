document.getElementById('goalsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const departmentName = document.getElementById('departmentName').value.trim();
    const goalTitle = document.getElementById('goalTitle').value.trim();
    const goalDescription = document.getElementById('goalDescription').value.trim();
    const targetDate = document.getElementById('targetDate').value;

    // Create a new goal entry
    if (departmentName && goalTitle && goalDescription && targetDate) {
        const goalDiv = document.createElement('div');
        goalDiv.classList.add('goal');
        goalDiv.innerHTML = `
            <h3>${goalTitle}</h3>
            <p><strong>Department:</strong> ${departmentName}</p>
            <p><strong>Description:</strong> ${goalDescription}</p>
            <p><strong>Target Date:</strong> ${new Date(targetDate).toLocaleDateString()}</p>
            <hr>
        `;

        // Add the new goal to the list
        document.getElementById('goalList').appendChild(goalDiv);

        // Clear form fields
        document.getElementById('goalsForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});
