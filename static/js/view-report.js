// Mock API endpoint - replace with actual API endpoint
const apiEndpoint = 'https://example.com/api/reports';

// Fetch reports from the database
async function fetchReports() {
    try {
        const response = await fetch(apiEndpoint);
        const reports = await response.json();

        if (reports.length > 0) {
            displayReports(reports);
        } else {
            document.getElementById('noReportsMessage').style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching reports:", error);
        alert("Failed to load reports. Please try again later.");
    }
}

// Display reports in the table
function displayReports(reports) {
    const tableBody = document.getElementById("reportTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear any existing rows

    reports.forEach(report => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${report.title}</td>
            <td>${new Date(report.date).toLocaleDateString()}</td>
            <td><button class="view-button" onclick="viewReport(${report.id})">View</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// View individual report
function viewReport(reportId) {
    alert(`Viewing report ID: ${reportId}`);
    // Redirect to a report view page or open a modal with report details
    // e.g., window.location.href = `/view-report.html?id=${reportId}`;
}

// Load reports on page load
document.addEventListener("DOMContentLoaded", fetchReports);
