// Initialize cart as an empty array
let cart = [];

// Function to add or update an item in the cart
function updateCart(itemName, quantity) {
    const existingItem = cart.find((item) => item.name === itemName);

    if (existingItem) {
        existingItem.quantity = quantity; // Update quantity
    } else {
        cart.push({ name: itemName, quantity: quantity }); // Add new item
    }

    // Remove items with zero quantity
    cart = cart.filter((item) => item.quantity > 0);

    updateCartTable();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    cart = cart.filter((item) => item.name !== itemName);
    updateCartTable();
}

// Function to update the cart table display
function updateCartTable() {
    const cartTable = document.querySelector("table");
    const cartTableBody = cartTable.querySelector("tbody");

    // Clear the current table body
    if (cartTableBody) {
        cartTable.removeChild(cartTableBody);
    }

    const newBody = document.createElement("tbody");

    // Populate the table with cart items
    cart.forEach((item) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;

        const actionCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromCart(item.name);
        actionCell.appendChild(removeButton);

        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(actionCell);

        newBody.appendChild(row);
    });

    cartTable.appendChild(newBody);
}

// Attach event listeners to all quantity inputs
document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("input", (event) => {
        const quantity = parseInt(event.target.value);
        const itemName = event.target.closest(".item").querySelector("h3").textContent;

        if (!isNaN(quantity) && quantity >= 0) {
            updateCart(itemName, quantity);
        }
    });
});

// Event listener for 'Buy' button
document.querySelector(".buy-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        // Store cart data in sessionStorage
        sessionStorage.setItem("cartData", JSON.stringify(cart));
        
        // Navigate to the new page
        window.location.href = "order.html";
    }
});

// Event listener for 'Add to Favorite' button
document.querySelector(".favorite-btn").addEventListener("click", () => {
    localStorage.setItem("favoriteCart", JSON.stringify(cart));
    alert("Cart saved to favorites!");
});

// Event listener for 'Apply Favorite' button
document.querySelector(".apply-favorite-btn").addEventListener("click", () => {
    const favoriteCart = JSON.parse(localStorage.getItem("favoriteCart"));

    if (favoriteCart && favoriteCart.length > 0) {
        cart = [...favoriteCart];
        updateCartTable();
        alert("Favorite cart applied!");
    } else {
        alert("No favorite cart found!");
    }
});
