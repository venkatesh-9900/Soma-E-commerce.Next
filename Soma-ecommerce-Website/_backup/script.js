document.addEventListener("DOMContentLoaded", function () {
  // Sticky header
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Theme switch toggle
  const iconContainer = document.querySelector('.iconContainer');
  if (iconContainer) {
    iconContainer.addEventListener('click', () => {
      const checkbox = document.querySelector('.checkbox');
      checkbox.checked = !checkbox.checked;
    });
  }

  // Mobile menu toggle
  const menuIcon = document.querySelector(".bx-menu");
  const navMenu = document.querySelector(".navmenu");

  if (menuIcon && navMenu) {
    menuIcon.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // Theme toggle
  const themeToggle = document.querySelector(".theme-switch__checkbox");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      body.classList.toggle("dark-theme", this.checked);
    });
  }

  // Heart animation
  document.querySelectorAll('.heart-icon').forEach((heart) => {
    heart.addEventListener('click', function () {
      heart.classList.toggle('pop');
    });
  });

  // User settings dropdown
  const userIcon = document.getElementById("user-icon");
  const userSettings = document.getElementById("user-settings");

  if (userIcon && userSettings) {
    userIcon.addEventListener("click", () => {
      userSettings.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!userIcon.contains(e.target) && !userSettings.contains(e.target)) {
        userSettings.classList.add("hidden");
      }
    });
  }

  // Cart dropdown toggle
  const cartIcon = document.getElementById("cart-icon");
  const cartItems = document.getElementById("cart-items");
  let cartCount = 0;

  if (cartIcon && cartItems) {
    cartIcon.addEventListener("click", () => {
      cartItems.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!cartIcon.contains(e.target) && !cartItems.contains(e.target)) {
        cartItems.classList.add("hidden");
      }
    });
  }

  // Product card quantity + cart logic
  document.querySelectorAll(".product-card").forEach((card) => {
    const qtyValue = card.querySelector(".qty-value");
    const plusBtn = card.querySelector(".plus");
    const minusBtn = card.querySelector(".minus");
    const shopBtn = card.querySelector(".shop-button");

    if (plusBtn && minusBtn && shopBtn && qtyValue) {
      plusBtn.addEventListener("click", () => {
        qtyValue.textContent = parseInt(qtyValue.textContent) + 1;
      });

      minusBtn.addEventListener("click", () => {
        const current = parseInt(qtyValue.textContent);
        if (current > 1) qtyValue.textContent = current - 1;
      });

      shopBtn.addEventListener("click", () => {
        const quantity = parseInt(qtyValue.textContent);
        const productName = card.querySelector("h4").innerText;
        updateCart(quantity, productName);
        alert(`Added ${quantity} x ${productName} to cart!`);
      });
    }
  });

  // Unified cart update function
  function updateCart(quantity, productName) {
    cartCount += quantity;
    cartIcon.setAttribute("data-count", cartCount);
    cartIcon.classList.add("cart-has-items");

    const item = document.createElement("p");
    item.textContent = `${quantity} x ${productName}`;
    cartItems.appendChild(item);
  }
});
