document.getElementById('achievementForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const alumniName = document.getElementById('alumniName').value.trim();
    const graduationYear = document.getElementById('graduationYear').value.trim();
    const achievementTitle = document.getElementById('achievementTitle').value.trim();
    const achievementDetails = document.getElementById('achievementDetails').value.trim();

    // Create a new achievement entry
    if (alumniName && graduationYear && achievementTitle && achievementDetails) {
        const achievementDiv = document.createElement('div');
        achievementDiv.classList.add('achievement');
        achievementDiv.innerHTML = `
            <h3>${achievementTitle}</h3>
            <p><strong>Alumni:</strong> ${alumniName} (Graduation Year: ${graduationYear})</p>
            <p><strong>Details:</strong> ${achievementDetails}</p>
            <hr>
        `;

        // Add the new achievement to the list
        document.getElementById('achievementList').appendChild(achievementDiv);

        // Clear form fields
        document.getElementById('achievementForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});
