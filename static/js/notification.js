// Sample notifications data
const notifications = [
    { id: 1, message: "Your report has been approved.", isRead: false },
    { id: 2, message: "New submission deadline announced.", isRead: true },
    { id: 3, message: "Your data entry was successfully saved.", isRead: false },
];

// Load notifications on page load
document.addEventListener("DOMContentLoaded", () => {
    displayNotifications();
});

function displayNotifications() {
    const notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = ""; // Clear existing notifications

    notifications.forEach(notification => {
        const notificationItem = document.createElement("li");
        notificationItem.className = `notification-item ${notification.isRead ? '' : 'unread'}`;
        notificationItem.innerHTML = `
            <p>${notification.message}</p>
            <div>
                ${notification.isRead 
                    ? `<button class="mark-read-button" onclick="markAsUnread(${notification.id})">Mark as Unread</button>`
                    : `<button class="mark-read-button" onclick="markAsRead(${notification.id})">Mark as Read</button>`}
                <button class="delete-button" onclick="deleteNotification(${notification.id})">Delete</button>
            </div>
        `;
        notificationList.appendChild(notificationItem);
    });
}

function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.isRead = true;
        displayNotifications();
    }
}

function markAsUnread(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.isRead = false;
        displayNotifications();
    }
}

function deleteNotification(id) {
    const index = notifications.findIndex(n => n.id === id);
    if (index > -1) {
        notifications.splice(index, 1);
        displayNotifications();
    }
}

function clearAllNotifications() {
    if (confirm("Are you sure you want to clear all notifications?")) {
        notifications.length = 0;
        displayNotifications();
    }
}
