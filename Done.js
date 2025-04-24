const receiptBody = document.getElementById("receipt-body");
const receiptTotal = document.getElementById("receipt-total");

const tickets = JSON.parse(localStorage.getItem("checkoutTickets")) || [];
const total = localStorage.getItem("checkoutTotal") || 0;

tickets.forEach(ticket => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${ticket.title}</td>
    <td>${ticket.seats}</td>
    <td>$${ticket.price}</td>
  `;
  receiptBody.appendChild(row);
});

receiptTotal.textContent = total;

localStorage.removeItem("checkoutTickets");
localStorage.removeItem("checkoutTotal");