// Function to download table data as PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title for the PDF
    doc.setFontSize(16);
    doc.text("Data Report", 14, 20);

    // Define the table content
    const data = [];
    const tableRows = document.querySelectorAll("#dataTable tbody tr");

    tableRows.forEach(row => {
        const rowData = [];
        row.querySelectorAll("td").forEach(cell => {
            rowData.push(cell.innerText);
        });
        data.push(rowData);
    });

    // Add table to PDF
    doc.autoTable({
        head: [['Title', 'Date', 'Author']],
        body: data,
        startY: 30,
    });

    // Save the PDF
    doc.save("Data_Report.pdf");
}
