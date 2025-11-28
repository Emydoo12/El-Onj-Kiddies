// Shopping Cart Functions
let cart = [];

// Load cart from localStorage if available
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Add item to cart
function addToCart(productId, productName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    saveCart();
    alert(`${productName} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        renderCart();
    }
}

// Render cart items
function renderCart() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (!cartTableBody) return;
    
    // Clear existing items
    cartTableBody.innerHTML = '';
    
    // Calculate total
    let total = 0;
    
    // Add each item to the table
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₦${item.price.toLocaleString()}</td>
            <td>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </td>
            <td>₦${itemTotal.toLocaleString()}</td>
            <td><span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span></td>
        `;
        
        cartTableBody.appendChild(row);
    });
    
    // Update total
    if (cartTotalElement) {
        cartTotalElement.textContent = `₦${total.toLocaleString()}`;
    }
}

// Process checkout
function processCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Get form data
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;
    const addressLine1 = document.getElementById('address-line1').value;
    const addressLine2 = document.getElementById('address-line2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const postalCode = document.getElementById('postal-code').value;
    const country = document.getElementById('country').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    // Validate required fields
    if (!name || !email || !phone || !addressLine1 || !city || !state || !country || !paymentMethod) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create address object
    const address = {
        line1: addressLine1,
        line2: addressLine2,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country
    };
    
    // Generate a simple order number
    const orderNumber = 'ORD-' + Date.now();
    
    // Save order info to localStorage
    const orderInfo = {
        orderNumber: orderNumber,
        customerName: name,
        customerPhone: phone,
        address: address,
        timestamp: new Date().toISOString()
    };
    
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderInfo);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a confirmation
    const confirmation = `Order placed successfully!

Order Number: ${orderNumber}
Thank you for your purchase, ${name}. We'll contact you soon.

Delivery Address:
${address.line1}${address.line2 ? ', ' + address.line2 : ''}
${city}, ${state}${postalCode ? ', ' + postalCode : ''}
${country}`;
    
    alert(confirmation);
    
    // Clear cart
    cart = [];
    saveCart();
    
    // Redirect to post-purchase contact page with order number
    window.location.href = `post-purchase-contact.html?order=${encodeURIComponent(orderNumber)}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load cart
    loadCart();
    
    // Add to cart buttons (for pages that still use this method)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            addToCart(id, name, price);
        });
    });
    
    // Render cart if on cart page
    if (document.querySelector('.cart-page')) {
        renderCart();
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    // Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }
});