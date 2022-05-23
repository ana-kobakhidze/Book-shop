window.addEventListener('DOMContentLoaded', (event) => {
    const orderDetails = document.getElementById('orderDetails');
    const storedOrderDetails = localStorage.getItem('orderData');
    const orderDetailsMessage = document.createTextNode(storedOrderDetails);
    orderDetails.appendChild(orderDetailsMessage);
});