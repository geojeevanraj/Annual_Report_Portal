document.getElementById('publicationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const title = document.getElementById('researchTitle').value.trim();
    const author = document.getElementById('authorName').value.trim();
    const date = document.getElementById('publicationDate').value;
    const summary = document.getElementById('researchSummary').value.trim();

    // Create a new publication entry
    if (title && author && date && summary) {
        const publicationDiv = document.createElement('div');
        publicationDiv.classList.add('publication');
        publicationDiv.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Publication Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p><strong>Summary:</strong> ${summary}</p>
            <hr>
        `;

        // Add the new publication to the list
        document.getElementById('publicationList').appendChild(publicationDiv);

        // Clear form fields
        document.getElementById('publicationForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});
