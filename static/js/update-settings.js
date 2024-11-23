// Sample data - This would come from a backend in a real application
const data = {
    facultyCount: 120,
    studentCount: 1500,
};

// // Display initial counts on load
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("facultyCount").innerText = data.facultyCount;
//     document.getElementById("studentCount").innerText = data.studentCount;
// });

// function updateSettings() {
//     const deadline = document.getElementById('deadline').value;
//     const reportVisibility = document.getElementById('reportVisibility').value;

//     fetch('/save-settings', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             submission_deadline: deadline,
//             report_visibility: reportVisibility
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.error) {
//             alert(`Error: ${data.error}`);
//         } else {
//             alert(data.message);
//             // Optionally reload the page to reflect updated settings
//             window.location.reload();
//         }
//     })
//     .catch(error => console.error('Error:', error));

//     return false; // Prevent form submission
// }
