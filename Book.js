
  const PRICE_PER_SEAT = 10;
  let totalPrice = 0;

  const summaryBody = document.querySelector("#ticket-summary tbody");
  const totalDisplay = document.getElementById("total-price");

  document.querySelectorAll(".book-btn").forEach(button => {
    button.addEventListener("click", () => {
      const movieTitle = button.getAttribute("data-title");
      const seatInput = button.previousElementSibling;
      const seats = parseInt(seatInput.value);

      if (seats > 0) {
        const price = seats * PRICE_PER_SEAT;
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${movieTitle}</td>
          <td>${seats}</td>
          <td>$${price}</td>
        `;
        summaryBody.appendChild(row);
        totalPrice += price;
        totalDisplay.textContent = totalPrice;

        seatInput.value = "";
      } else {
        alert("Please enter a valid number of seats.");
      }
    });
  });

  document.getElementById("clear-cart").addEventListener("click", () => {
    summaryBody.innerHTML = "";
    totalPrice = 0;
    totalDisplay.textContent = totalPrice;
  });

  // Save to Favourite
  document.getElementById("save-favourite").addEventListener("click", () => {
    const favs = [];
    summaryBody.querySelectorAll("tr").forEach(row => {
      const cells = row.querySelectorAll("td");
      favs.push({
        title: cells[0].textContent,
        seats: parseInt(cells[1].textContent),
        price: parseInt(cells[2].textContent.replace('$', ''))
      });
    });
    localStorage.setItem("favBookings", JSON.stringify(favs));
    alert("Favourite saved!");
  });

  // Apply Favourite
  document.getElementById("apply-favourite").addEventListener("click", () => {
    const favs = JSON.parse(localStorage.getItem("favBookings"));
    if (!favs || favs.length === 0) {
      alert("No saved favourite found.");
      return;
    }

    summaryBody.innerHTML = "";
    totalPrice = 0;

    favs.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.seats}</td>
        <td>$${item.price}</td>
      `;
      summaryBody.appendChild(row);
      totalPrice += item.price;
    });

    totalDisplay.textContent = totalPrice;
  });

  document.getElementById("proceed-checkout").addEventListener("click", () => {
    if (summaryBody.children.length === 0) {
      alert("No tickets booked.");
    } else {
      
      const tickets = [];
      summaryBody.querySelectorAll("tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        tickets.push({
          title: cells[0].textContent,
          seats: parseInt(cells[1].textContent),
          price: parseInt(cells[2].textContent.replace('$', ''))
        });
      });
      localStorage.setItem("checkoutTickets", JSON.stringify(tickets));
      localStorage.setItem("checkoutTotal", totalPrice);
  
     
      window.location.href = "./Done.html";
    }
  });
  
