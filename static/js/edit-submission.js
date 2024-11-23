// Sample data to populate the form - replace this with actual data fetching logic
const sampleData = {
    dataType: "research",
    submissionDate: "2024-10-15",
    content: "This is a sample data entry that was submitted by a faculty member."
};

// Load data into form fields on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dataType").value = sampleData.dataType;
    document.getElementById("submissionDate").value = sampleData.submissionDate;
    document.getElementById("content").value = sampleData.content;
});

// Function to save changes
function saveChanges() {
    const dataType = document.getElementById("dataType").value;
    const submissionDate = document.getElementById("submissionDate").value;
    const content = document.getElementById("content").value;

    if (!submissionDate || !content) {
        alert("Please fill in all required fields.");
        return false;
    }

    // Logic to save changes - this would typically involve sending the data to the backend
    alert(`Changes saved successfully:
    - Data Type: ${dataType}
    - Submission Date: ${submissionDate}
    - Content: ${content}`);
    
    return false; // Prevent form submission for demo purposes
}

// Function to cancel edit and reset form
function cancelEdit() {
    if (confirm("Are you sure you want to cancel the changes?")) {
        // Reset form fields to original data
        document.getElementById("dataType").value = sampleData.dataType;
        document.getElementById("submissionDate").value = sampleData.submissionDate;
        document.getElementById("content").value = sampleData.content;
    }
}
