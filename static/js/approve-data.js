function approveEntry(entryId) {
    const entry = document.getElementById(entryId);
    if (entry) {
        entry.querySelector('td:last-child').innerHTML = "Approved ✅";
        entry.style.backgroundColor = "#e8f5e9"; // Light green to indicate approval
    }
}

function rejectEntry(entryId) {
    const entry = document.getElementById(entryId);
    if (entry) {
        entry.querySelector('td:last-child').innerHTML = "Rejected ❌";
        entry.style.backgroundColor = "#ffebee"; // Light red to indicate rejection
    }
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById("selectAll");
    const checkboxes = document.querySelectorAll(".entryCheckbox");
    checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);
}

function processApproval() {
    const selectedEntries = Array.from(document.querySelectorAll(".entryCheckbox"))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.getAttribute("data-entry-id"));

    if (selectedEntries.length === 0) {
        alert("Please select at least one entry to process.");
        return false;
    }

    selectedEntries.forEach(entryId => {
        // Here, either approve or reject based on further logic or criteria
        const entry = document.getElementById(entryId);
        entry.style.backgroundColor = "#e8f5e9"; // Change color to indicate processed (green as example)
        entry.querySelector('td:last-child').innerHTML = "Processed ✅";
    });

    alert("Selected entries have been processed.");
    return false; // Prevent form submission for demo purposes
}
