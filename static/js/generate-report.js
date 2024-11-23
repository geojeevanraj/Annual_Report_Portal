function downloadReport() {
    const year = document.getElementById("yearSelect").value;

    if (!year) {
        alert("Please select a year to download the report.");
        return;
    }

    // Simulating report generation and download
    alert(`Generating report for the year ${year}. Download will start shortly.`);
    
    // Assuming the report URL is generated based on the selected year
    const reportURL = `https://example.com/reports/annual-report-${year}.pdf`;

    // Create an invisible link to download the file
    const link = document.createElement("a");
    link.href = reportURL;
    link.download = `Annual_Report_${year}.pdf`;
    link.click();
}
