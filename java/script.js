document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const fileInput = document.querySelector("button"); // File upload button
  const submitButton = document.querySelector(".submit-btn");
  const searchBar = document.getElementById("search-bar");
  const menuBars = document.getElementById("menu-bars");
  const navbar = document.querySelector(".navbar");
  const prescriptionSizeLimit = 3 * 1024 * 1024; // 3MB in bytes

  // File upload placeholder logic
  fileInput.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button behavior
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".pdf,.doc,.docx,.jpg,.jpeg";
    inputElement.click();

    inputElement.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file.size > prescriptionSizeLimit) {
        alert("File size exceeds 3MB limit. Please upload a smaller file.");
      } else {
        alert(`File "${file.name}" uploaded successfully.`);
      }
    });
  });

  // Toggle navbar visibility
  menuBars.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  // Form validation before submission
  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission for validation
    const fullName = document.querySelector("input[placeholder='name1 name2']");
    const email = document.querySelector("input[placeholder='example@example.com']");
    const address = document.querySelector("input[placeholder='room - street - locality']");
    const city = document.querySelector("input[placeholder='city']");
    const state = document.querySelector("input[placeholder='country']");
    const zip = document.querySelector("input[placeholder='------']");
    const cardNumber = document.querySelector("input[placeholder='2222-2222-3333-4444']");
    const cvv = document.querySelector("input[placeholder='**']");

    // Basic validations
    if (
      !fullName.value ||
      !email.value ||
      !address.value ||
      !city.value ||
      !state.value ||
      !zip.value ||
      !cardNumber.value ||
      !cvv.value
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (!validateEmail(email.value)) {
      alert("Invalid email format.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber.value.replace(/-/g, ""))) {
      alert("Invalid credit card number.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv.value)) {
      alert("Invalid CVV.");
      return;
    }

    alert("Form submitted successfully!");
    document.querySelector("form").submit();
  });

  // Email validation function
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Search bar functionality (optional)
  searchBar.addEventListener("click", () => {
    const searchBox = document.querySelector(".search-box");
    searchBox.classList.toggle("active");
  });
});

  // Retrieve cart data from sessionStorage
  const cartData = JSON.parse(sessionStorage.getItem("cartData"));

  // Function to populate the cart table
  function populateCheckoutCart() {
      const cartTable = document.querySelector("#checkout-cart tbody");

      if (cartData && cartData.length > 0) {
          cartData.forEach((item) => {
              const row = document.createElement("tr");

              const nameCell = document.createElement("td");
              nameCell.textContent = item.name;

              const quantityCell = document.createElement("td");
              quantityCell.textContent = item.quantity;

              row.appendChild(nameCell);
              row.appendChild(quantityCell);

              cartTable.appendChild(row);
          });
      } else {
          const emptyRow = document.createElement("tr");
          const emptyCell = document.createElement("td");
          emptyCell.setAttribute("colspan", "2");
          emptyCell.textContent = "Your cart is empty.";
          emptyRow.appendChild(emptyCell);
          cartTable.appendChild(emptyRow);
      }
  }

  // Populate the cart table on page load
  populateCheckoutCart();

  // Confirm purchase functionality
  document.querySelector("#confirm-purchase").addEventListener("click", () => {
      alert("Thank you for your purchase!");
      sessionStorage.removeItem("cartData");
      window.location.href = "index.html"; // Redirect to home page after purchase
  });