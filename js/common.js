// =========================================================
// Explore the World - Shared Core Engine (Navbar, Toast, Wishlist, Search)
// =========================================================

// Modern Toast Notification Utility
window.showToast = function (message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `app-toast ${type}`;

    let icon = "✨";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "❌";
    if (type === "info") icon = "ℹ️";

    toast.innerHTML = `<span>${icon}</span><div style="flex: 1;">${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
};

// Count total saved items across all features
window.getTotalSavedCount = function () {
    try {
        const dests = JSON.parse(localStorage.getItem("savedDestinations")) || [];
        const foods = JSON.parse(localStorage.getItem("savedFood")) || [];
        const cults = JSON.parse(localStorage.getItem("favorites")) || [];
        const advs = JSON.parse(localStorage.getItem("savedAdventures")) || [];
        const singleAdv = localStorage.getItem("favoriteAdventure");
        let advCount = advs.length;
        if (singleAdv && !advs.includes(singleAdv)) advCount += 1;

        return dests.length + foods.length + cults.length + advCount;
    } catch (e) {
        return 0;
    }
};

// Update all wishlist badge counters on the page
window.updateNavCounters = function () {
    const count = window.getTotalSavedCount();
    const badges = document.querySelectorAll(".wishlist-badge-count");
    badges.forEach(b => {
        b.textContent = count;
        b.style.display = count > 0 ? "inline-block" : "none";
    });
};

// Log Out helper
window.appLogout = function () {
    sessionStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUser");
    if (window.showToast) {
        window.showToast("Logged out successfully.", "info");
    } else {
        alert("Logged out successfully.");
    }
    setTimeout(() => {
        window.location.href = window.location.pathname.includes('/destinationPages/') || 
                               window.location.pathname.includes('/foodPages/') || 
                               window.location.pathname.includes('/adventurePages/') ? '../index.html' : 'index.html';
    }, 500);
};

// Initialize interactive elements once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile menu toggle
    const toggle = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // 2. Setup Wishlist badges
    window.updateNavCounters();

    // 3. User display setup
    const user = sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser");
    const userBtnLabel = document.getElementById("nav-user-label");
    const userDropdownContent = document.getElementById("nav-user-menu");

    if (userBtnLabel) {
        if (user) {
            userBtnLabel.textContent = user.charAt(0).toUpperCase() + user.slice(1);
        } else {
            userBtnLabel.textContent = "Sign In";
        }
    }

    if (userDropdownContent) {
        if (user) {
            userDropdownContent.innerHTML = `
                <div style="padding: 10px 18px; font-weight: 700; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                    Hello, ${user.charAt(0).toUpperCase() + user.slice(1)}!
                </div>
                <a href="#" onclick="openWishlistModal(); return false;">💖 My Saved Wishlist (<span class="wishlist-badge-count">0</span>)</a>
                <a href="#" onclick="openBookingsModal(); return false;">🎫 My Booking Vouchers</a>
                <hr>
                <button onclick="appLogout()">🚪 Log Out</button>
            `;
        } else {
            const isSub = window.location.pathname.includes('/destinationPages/') || 
                          window.location.pathname.includes('/foodPages/') || 
                          window.location.pathname.includes('/adventurePages/');
            const rootPrefix = isSub ? '../' : '';
            userDropdownContent.innerHTML = `
                <a href="${rootPrefix}index.html">🔑 Log In</a>
                <a href="${rootPrefix}signup.html">📝 Create Account</a>
                <hr>
                <a href="#" onclick="openWishlistModal(); return false;">💖 View Saved Items</a>
            `;
        }
    }

    // Re-sync counters after user menu rendered
    window.updateNavCounters();

    // 4. Back to top button setup
    let topBtn = document.querySelector(".back-to-top-btn");
    if (!topBtn) {
        topBtn = document.createElement("button");
        topBtn.className = "back-to-top-btn";
        topBtn.innerHTML = "↑";
        topBtn.title = "Back to top";
        document.body.appendChild(topBtn);
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
