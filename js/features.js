// =========================================================
// Explore the World - Search, Wishlist & Booking System
// =========================================================

// Search Index Database
const travelDatabase = [
    { title: "Paris, France", category: "Destination", url: "destinationPages/paris.html", desc: "The City of Love, Eiffel Tower, Louvre Museum, and romantic avenues." },
    { title: "New York, USA", category: "Destination", url: "destinationPages/newYork.html", desc: "The Big Apple, Broadway, Times Square, and iconic skyscrapers." },
    { title: "Rome, Italy", category: "Destination", url: "destinationPages/rome.html", desc: "The Eternal City, Colosseum, Vatican St. Peter's, and rich antiquity." },
    { title: "Hiking and Trekking", category: "Adventure", url: "adventurePages/hiking.html", desc: "Inca Trail, Everest Base Camp, and breathtaking Himalayan trails." },
    { title: "Safari and Wildlife Exploration", category: "Adventure", url: "adventurePages/safari.html", desc: "Serengeti migration, Maasai Mara, and African big five wildlife." },
    { title: "Snorkeling and Scuba Diving", category: "Adventure", url: "adventurePages/scuba.html", desc: "Great Barrier Reef, tropical corals, and underwater marine sanctuaries." },
    { title: "Rock Climbing", category: "Adventure", url: "adventurePages/climbing.html", desc: "Dolomites, Kalymnos, and thrilling cliff-side ascents." },
    { title: "White-water Rafting", category: "Adventure", url: "adventurePages/rafting.html", desc: "Ganges rapids, Ayung river Bali, and wild rushing river torrents." },
    { title: "Skydiving", category: "Adventure", url: "adventurePages/skydiving.html", desc: "Interlaken Alps, Dubai Palm, and adrenaline-pumping freefall jumps." },
    { title: "Diwali - Festival of Lights", category: "Culture", url: "cultural.html", desc: "India's vibrant festival celebrating victory of light over darkness." },
    { title: "Chinese New Year", category: "Culture", url: "cultural.html", desc: "Spring festival with lion dances, red lanterns, and dragon feasts." },
    { title: "Rio Carnival", category: "Culture", url: "cultural.html", desc: "World's grandest samba parades, colorful masquerades, and street blocos." },
    { title: "Oktoberfest", category: "Culture", url: "cultural.html", desc: "Bavarian folk festival with traditional music, giant pretzels, and funfair." },
    { title: "Crêpes and Galettes", category: "Food & Cuisine", url: "foodPages/parisFood.html", desc: "Classic Parisian savory buckwheat galettes and sweet caramel crêpes." },
    { title: "French Onion Soup", category: "Food & Cuisine", url: "foodPages/parisFood.html", desc: "Caramelized onions simmered in beef broth topped with melted Gruyere." },
    { title: "Classic French Baguette", category: "Food & Cuisine", url: "foodPages/parisFood.html", desc: "Golden crusty artisanal Parisian bread freshly baked daily." },
    { title: "Bagel with Cream Cheese & Lox", category: "Food & Cuisine", url: "foodPages/newYorkFood.html", desc: "Authentic New York deli favorite with smoked salmon and capers." },
    { title: "Pastrami on Rye", category: "Food & Cuisine", url: "foodPages/newYorkFood.html", desc: "Tender, smoky cured beef on hearty rye with spicy deli mustard." },
    { title: "Cronut", category: "Food & Cuisine", url: "foodPages/newYorkFood.html", desc: "Flaky croissant-doughnut pastry rolled in sugar and filled with cream." },
    { title: "Pasta alla Carbonara", category: "Food & Cuisine", url: "foodPages/romeFood.html", desc: "Creamy authentic Roman pasta with egg yolks, pecorino, and crispy guanciale." },
    { title: "Carciofi Artichokes", category: "Food & Cuisine", url: "foodPages/romeFood.html", desc: "Roman and Jewish quarter fried crispy and braised tender artichokes." },
    { title: "Maritozzi", category: "Food & Cuisine", url: "foodPages/romeFood.html", desc: "Sweet Roman brioche bun stuffed generously with fresh whipped cream." },
    { title: "Discovering Bali", category: "Blog Experience", url: "experience.html", desc: "Tegallalang rice terraces, Uluwatu sunset, and Nusa Dua beaches." },
    { title: "Northern Lights in Norway", category: "Blog Experience", url: "experience.html", desc: "Arctic circle aurora borealis, Tromso dog sledding, and glass igloos." },
    { title: "Great Wall of China", category: "Blog Experience", url: "experience.html", desc: "Walking Badaling and Mutianyu sections across rolling mountain ridges." },
    { title: "Pyramids of Egypt", category: "Blog Experience", url: "experience.html", desc: "Giza necropolis, the mysterious Sphinx, and ancient pharaonic history." },
    { title: "Iconic KLCC, Malaysia", category: "Blog Experience", url: "experience.html", desc: "Petronas Twin Towers skybridge, luxury shopping, and lake fountain shows." }
];

// Open Global Search Modal
window.openSearchModal = function () {
    let modal = document.getElementById("searchModal");
    if (!modal) {
        createSearchModalDOM();
        modal = document.getElementById("searchModal");
    }
    modal.style.display = "flex";
    const input = document.getElementById("searchQueryInput");
    if (input) {
        input.value = "";
        input.focus();
        renderSearchResults("");
    }
};

window.closeSearchModal = function () {
    const modal = document.getElementById("searchModal");
    if (modal) modal.style.display = "none";
};

function createSearchModalDOM() {
    const isSub = window.location.pathname.includes('/destinationPages/') || 
                  window.location.pathname.includes('/foodPages/') || 
                  window.location.pathname.includes('/adventurePages/');
    const prefix = isSub ? '../' : '';

    const div = document.createElement("div");
    div.id = "searchModal";
    div.style.cssText = "display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(6px); z-index:99999; justify-content:center; align-items:flex-start; padding:60px 15px;";
    div.innerHTML = `
        <div style="background:white; width:100%; max-width:620px; border-radius:16px; box-shadow:0 20px 40px rgba(0,0,0,0.25); overflow:hidden; animation:modalPop 0.25s ease;">
            <div style="padding:16px 20px; border-bottom:1px solid #f1f5f9; display:flex; align-items:center; gap:12px;">
                <span style="font-size:1.25rem;">🔍</span>
                <input type="text" id="searchQueryInput" placeholder="Search destinations, adventures, cuisines, stories..." 
                       style="flex:1; border:none; outline:none; font-size:1.05rem; color:#1e293b;" oninput="handleSearchInput(this.value)">
                <button onclick="closeSearchModal()" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:#94a3b8;">✕</button>
            </div>
            <div id="searchResultsList" style="max-height:380px; overflow-y:auto; padding:10px 15px;"></div>
            <div style="background:#f8fafc; padding:10px 20px; font-size:0.8rem; color:#64748b; display:flex; justify-content:space-between;">
                <span>Press ESC or click outside to close</span>
                <span>${travelDatabase.length} curated experiences</span>
            </div>
        </div>
    `;
    div.addEventListener("click", (e) => {
        if (e.target === div) closeSearchModal();
    });
    document.body.appendChild(div);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSearchModal();
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            openSearchModal();
        }
    });
}

window.handleSearchInput = function (query) {
    renderSearchResults(query);
};

function renderSearchResults(query) {
    const list = document.getElementById("searchResultsList");
    if (!list) return;

    const isSub = window.location.pathname.includes('/destinationPages/') || 
                  window.location.pathname.includes('/foodPages/') || 
                  window.location.pathname.includes('/adventurePages/');
    const prefix = isSub ? '../' : '';

    const clean = query.trim().toLowerCase();
    const results = clean === "" 
        ? travelDatabase.slice(0, 6) 
        : travelDatabase.filter(item => 
            item.title.toLowerCase().includes(clean) || 
            item.category.toLowerCase().includes(clean) || 
            item.desc.toLowerCase().includes(clean)
        );

    if (results.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:30px 20px; color:#94a3b8;">No matching results for "${query}". Try searching "Paris", "Hiking", or "Pasta".</div>`;
        return;
    }

    list.innerHTML = results.map(item => `
        <a href="${prefix}${item.url}" style="display:block; padding:12px 14px; border-radius:10px; text-decoration:none; color:inherit; margin-bottom:6px; transition:background 0.2s;" 
           onmouseover="this.style.background='#fff7ed'" onmouseout="this.style.background='transparent'">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:600; color:#0f172a; font-size:0.98rem;">${item.title}</span>
                <span style="font-size:0.75rem; background:#fed7aa; color:#9a3412; padding:2px 8px; border-radius:12px; font-weight:700;">${item.category}</span>
            </div>
            <p style="margin:4px 0 0 0; font-size:0.83rem; color:#64748b; line-height:1.4;">${item.desc}</p>
        </a>
    `).join("");
}

// =========================================================
// Unified Wishlist & Trip Planner Modal
// =========================================================
window.openWishlistModal = function () {
    let modal = document.getElementById("wishlistModal");
    if (!modal) {
        createWishlistModalDOM();
        modal = document.getElementById("wishlistModal");
    }
    renderWishlistItems();
    modal.style.display = "flex";
};

window.closeWishlistModal = function () {
    const modal = document.getElementById("wishlistModal");
    if (modal) modal.style.display = "none";
};

function createWishlistModalDOM() {
    const div = document.createElement("div");
    div.id = "wishlistModal";
    div.style.cssText = "display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(6px); z-index:99999; justify-content:center; align-items:center; padding:20px;";
    div.innerHTML = `
        <div style="background:white; width:100%; max-width:680px; border-radius:18px; box-shadow:0 20px 40px rgba(0,0,0,0.25); max-height:85vh; display:flex; flex-direction:column; overflow:hidden;">
            <div style="padding:18px 24px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; background:#fff7ed;">
                <div>
                    <h3 style="margin:0; color:#9a3412; font-size:1.25rem; font-weight:700;">💖 My Saved Wishlist & Travel Itinerary</h3>
                    <p style="margin:4px 0 0; font-size:0.85rem; color:#78350f;">Saved destinations, activities, and dining wishlist</p>
                </div>
                <button onclick="closeWishlistModal()" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:#78350f;">✕</button>
            </div>
            <div id="wishlistItemsContainer" style="flex:1; overflow-y:auto; padding:20px 24px;"></div>
            <div style="padding:14px 24px; border-top:1px solid #f1f5f9; background:#f8fafc; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <button onclick="clearAllWishlist()" class="btn btn-outline-danger btn-sm" style="padding:6px 12px; border-radius:8px;">🗑️ Clear All Wishlist</button>
                <div style="display:flex; gap:10px;">
                    <button onclick="exportItinerary()" class="btn btn-success btn-sm" style="padding:6px 14px; border-radius:8px; font-weight:600;">📥 Export Itinerary (.txt)</button>
                    <button onclick="closeWishlistModal()" class="btn btn-secondary btn-sm" style="padding:6px 14px; border-radius:8px;">Close</button>
                </div>
            </div>
        </div>
    `;
    div.addEventListener("click", (e) => {
        if (e.target === div) closeWishlistModal();
    });
    document.body.appendChild(div);
}

function renderWishlistItems() {
    const container = document.getElementById("wishlistItemsContainer");
    if (!container) return;

    const dests = JSON.parse(localStorage.getItem("savedDestinations")) || [];
    const foods = JSON.parse(localStorage.getItem("savedFood")) || [];
    const cults = JSON.parse(localStorage.getItem("favorites")) || [];
    const advs = JSON.parse(localStorage.getItem("savedAdventures")) || [];
    const singleAdv = localStorage.getItem("favoriteAdventure");
    if (singleAdv && !advs.includes(singleAdv)) advs.push(singleAdv);

    const total = dests.length + foods.length + cults.length + advs.length;

    if (total === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:#64748b;">
                <span style="font-size:3rem; display:block; margin-bottom:12px;">🗺️</span>
                <h4 style="color:#1e293b; margin-bottom:8px;">Your Wishlist is Empty</h4>
                <p style="font-size:0.9rem;">Explore destinations, activities, and food pages, then click "Save" to build your custom trip itinerary!</p>
            </div>
        `;
        return;
    }

    let html = `<div style="display:flex; flex-direction:column; gap:20px;">`;

    if (dests.length > 0) {
        html += `
            <div>
                <h5 style="color:#0284c7; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:6px;">📍 Destinations (${dests.length})</h5>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${dests.map(d => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#f0f9ff; border-radius:10px;">
                            <span style="font-weight:600; color:#0369a1;">${d}</span>
                            <div style="display:flex; gap:8px;">
                                <button onclick="openBookingModal('${d}')" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:3px 10px;">Book Tour</button>
                                <button onclick="removeWishlistItem('dest', '${d}')" class="btn btn-outline-danger btn-sm" style="font-size:0.75rem; padding:3px 8px;">Remove</button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    if (advs.length > 0) {
        html += `
            <div>
                <h5 style="color:#d97706; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:6px;">🧗 Adventures & Activities (${advs.length})</h5>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${advs.map(a => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#fffbeb; border-radius:10px;">
                            <span style="font-weight:600; color:#b45309;">${a}</span>
                            <div style="display:flex; gap:8px;">
                                <button onclick="openBookingModal('${a}')" class="btn btn-warning btn-sm text-dark fw-bold" style="font-size:0.75rem; padding:3px 10px;">Book Adventure</button>
                                <button onclick="removeWishlistItem('adv', '${a}')" class="btn btn-outline-danger btn-sm" style="font-size:0.75rem; padding:3px 8px;">Remove</button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    if (cults.length > 0) {
        html += `
            <div>
                <h5 style="color:#e11d48; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:6px;">🎭 Cultural Highlights (${cults.length})</h5>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${cults.map(c => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#fff1f2; border-radius:10px;">
                            <span style="font-weight:600; color:#be123c;">${c}</span>
                            <button onclick="removeWishlistItem('cult', '${c}')" class="btn btn-outline-danger btn-sm" style="font-size:0.75rem; padding:3px 8px;">Remove</button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    if (foods.length > 0) {
        html += `
            <div>
                <h5 style="color:#059669; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:6px;">🥐 Foods & Cuisine (${foods.length})</h5>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${foods.map(f => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#ecfdf5; border-radius:10px;">
                            <span style="font-weight:600; color:#047857;">${f}</span>
                            <button onclick="removeWishlistItem('food', '${f}')" class="btn btn-outline-danger btn-sm" style="font-size:0.75rem; padding:3px 8px;">Remove</button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

window.removeWishlistItem = function (type, name) {
    if (type === 'dest') {
        let list = JSON.parse(localStorage.getItem("savedDestinations")) || [];
        list = list.filter(x => x !== name);
        localStorage.setItem("savedDestinations", JSON.stringify(list));
    } else if (type === 'adv') {
        let list = JSON.parse(localStorage.getItem("savedAdventures")) || [];
        list = list.filter(x => x !== name);
        localStorage.setItem("savedAdventures", JSON.stringify(list));
        if (localStorage.getItem("favoriteAdventure") === name) {
            localStorage.removeItem("favoriteAdventure");
        }
    } else if (type === 'cult') {
        let list = JSON.parse(localStorage.getItem("favorites")) || [];
        list = list.filter(x => x !== name);
        localStorage.setItem("favorites", JSON.stringify(list));
    } else if (type === 'food') {
        let list = JSON.parse(localStorage.getItem("savedFood")) || [];
        list = list.filter(x => x !== name);
        localStorage.setItem("savedFood", JSON.stringify(list));
    }

    renderWishlistItems();
    window.updateNavCounters();
    if (window.showToast) window.showToast(`Removed "${name}" from wishlist.`);
};

window.clearAllWishlist = function () {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
        localStorage.removeItem("savedDestinations");
        localStorage.removeItem("savedAdventures");
        localStorage.removeItem("favoriteAdventure");
        localStorage.removeItem("favorites");
        localStorage.removeItem("savedFood");
        renderWishlistItems();
        window.updateNavCounters();
        if (window.showToast) window.showToast("Your wishlist has been cleared.", "info");
    }
};

window.exportItinerary = function () {
    const dests = JSON.parse(localStorage.getItem("savedDestinations")) || [];
    const foods = JSON.parse(localStorage.getItem("savedFood")) || [];
    const cults = JSON.parse(localStorage.getItem("favorites")) || [];
    const advs = JSON.parse(localStorage.getItem("savedAdventures")) || [];
    const user = sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser") || "Traveler";

    let text = `=========================================\n`;
    text += `  EXPLORE THE WORLD - PERSONAL TRAVEL ITINERARY\n`;
    text += `  Traveler: ${user}\n`;
    text += `  Generated: ${new Date().toLocaleDateString()}\n`;
    text += `=========================================\n\n`;

    text += `[ DESTINATIONS TO VISIT ]\n`;
    if (dests.length) dests.forEach((d, i) => text += `  ${i + 1}. ${d}\n`);
    else text += `  None saved yet.\n`;

    text += `\n[ ADVENTURES & ACTIVITIES ]\n`;
    if (advs.length) advs.forEach((a, i) => text += `  ${i + 1}. ${a}\n`);
    else text += `  None saved yet.\n`;

    text += `\n[ CULTURAL FESTIVALS ]\n`;
    if (cults.length) cults.forEach((c, i) => text += `  ${i + 1}. ${c}\n`);
    else text += `  None saved yet.\n`;

    text += `\n[ FOODS TO TASTE ]\n`;
    if (foods.length) foods.forEach((f, i) => text += `  ${i + 1}. ${f}\n`);
    else text += `  None saved yet.\n`;

    text += `\n=========================================\n`;
    text += `Plan ahead, travel safe, and enjoy the world!\n`;
    text += `https://exploretheworld2.pages.dev/\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Explore_The_World_Itinerary_${user}.txt`;
    link.click();
    if (window.showToast) window.showToast("Itinerary exported successfully!");
};

// =========================================================
// Interactive Tour Booking & Voucher System
// =========================================================
window.openBookingModal = function (tourTitle = "") {
    let modal = document.getElementById("bookingModal");
    if (!modal) {
        createBookingModalDOM();
        modal = document.getElementById("bookingModal");
    }
    const titleInput = document.getElementById("bookTourTitle");
    if (titleInput) titleInput.value = tourTitle || "Custom Tour & Adventure";
    
    // Set default date to tomorrow
    const dateInput = document.getElementById("bookTourDate");
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split("T")[0];
    }

    modal.style.display = "flex";
};

window.closeBookingModal = function () {
    const modal = document.getElementById("bookingModal");
    if (modal) modal.style.display = "none";
};

function createBookingModalDOM() {
    const user = sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser") || "";
    const div = document.createElement("div");
    div.id = "bookingModal";
    div.style.cssText = "display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(6px); z-index:99999; justify-content:center; align-items:center; padding:20px;";
    div.innerHTML = `
        <div style="background:white; width:100%; max-width:540px; border-radius:18px; box-shadow:0 20px 40px rgba(0,0,0,0.25); overflow:hidden;">
            <div style="padding:18px 24px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; background:#ff9800; color:white;">
                <div>
                    <h3 style="margin:0; font-size:1.25rem; font-weight:700;">🎫 Instant Tour & Activity Booking</h3>
                    <p style="margin:3px 0 0; font-size:0.85rem; opacity:0.9;">Reserve your ticket with instant voucher confirmation</p>
                </div>
                <button onclick="closeBookingModal()" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:white;">✕</button>
            </div>
            <form id="bookingForm" onsubmit="handleBookingSubmit(event)" style="padding:22px 24px; display:flex; flex-direction:column; gap:14px; background:white; width:100%; text-align:left;">
                <div>
                    <label style="font-size:0.85rem; font-weight:600; color:#334155; display:block; margin-bottom:5px;">Selected Destination or Activity</label>
                    <input type="text" id="bookTourTitle" required readonly style="background:#f1f5f9; font-weight:600; color:#0f172a; width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px;">
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.85rem; font-weight:600; color:#334155; display:block; margin-bottom:5px;">Your Name</label>
                        <input type="text" id="bookName" value="${user}" required placeholder="Full Name" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px;">
                    </div>
                    <div>
                        <label style="font-size:0.85rem; font-weight:600; color:#334155; display:block; margin-bottom:5px;">Email Address</label>
                        <input type="email" id="bookEmail" required placeholder="traveler@example.com" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px;">
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <label style="font-size:0.85rem; font-weight:600; color:#334155; display:block; margin-bottom:5px;">Travel Date</label>
                        <input type="date" id="bookTourDate" required style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px;">
                    </div>
                    <div>
                        <label style="font-size:0.85rem; font-weight:600; color:#334155; display:block; margin-bottom:5px;">Travelers</label>
                        <select id="bookTravelers" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; background:white;">
                            <option value="1">1 Person ($75)</option>
                            <option value="2" selected>2 Persons ($150)</option>
                            <option value="3">3 Persons ($225)</option>
                            <option value="4">4 Persons ($300)</option>
                            <option value="5+">5+ Family / Group ($350)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label style="font-size:0.85rem; font-weight:600; color:#334155; display:block; margin-bottom:5px;">Special Requests / Inquiries (Optional)</label>
                    <textarea id="bookNotes" rows="2" placeholder="e.g., Vegetarian meal, morning pickup, English tour guide..." style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-family:inherit;"></textarea>
                </div>
                <button type="submit" style="background:#ff9800; color:white; border:none; padding:12px; border-radius:10px; font-weight:700; font-size:1rem; cursor:pointer; margin-top:5px;">
                    ⚡ Confirm Booking & Generate Voucher
                </button>
            </form>
        </div>
    `;
    div.addEventListener("click", (e) => {
        if (e.target === div) closeBookingModal();
    });
    document.body.appendChild(div);
}

window.handleBookingSubmit = function (e) {
    e.preventDefault();
    const title = document.getElementById("bookTourTitle").value;
    const name = document.getElementById("bookName").value;
    const email = document.getElementById("bookEmail").value;
    const date = document.getElementById("bookTourDate").value;
    const travelers = document.getElementById("bookTravelers").value;
    const notes = document.getElementById("bookNotes").value;
    const code = "ETW-" + Math.floor(100000 + Math.random() * 900000);

    const booking = {
        code,
        title,
        name,
        email,
        date,
        travelers,
        notes,
        bookedAt: new Date().toISOString()
    };

    let bookings = [];
    try {
        bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    } catch (err) {
        bookings = [];
    }
    bookings.push(booking);
    localStorage.setItem("myBookings", JSON.stringify(bookings));

    closeBookingModal();
    if (window.showToast) window.showToast(`Booking Confirmed! Code: ${code}`, "success");
    openBookingsModal();
};

window.openBookingsModal = function () {
    let modal = document.getElementById("bookingsViewModal");
    if (!modal) {
        createBookingsViewModalDOM();
        modal = document.getElementById("bookingsViewModal");
    }
    renderBookingsList();
    modal.style.display = "flex";
};

window.closeBookingsViewModal = function () {
    const modal = document.getElementById("bookingsViewModal");
    if (modal) modal.style.display = "none";
};

function createBookingsViewModalDOM() {
    const div = document.createElement("div");
    div.id = "bookingsViewModal";
    div.style.cssText = "display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(6px); z-index:99999; justify-content:center; align-items:center; padding:20px;";
    div.innerHTML = `
        <div style="background:white; width:100%; max-width:620px; border-radius:18px; box-shadow:0 20px 40px rgba(0,0,0,0.25); max-height:85vh; display:flex; flex-direction:column; overflow:hidden;">
            <div style="padding:18px 24px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; background:#0f172a; color:white;">
                <div>
                    <h3 style="margin:0; font-size:1.25rem; font-weight:700;">🎫 My Booking Vouchers</h3>
                    <p style="margin:3px 0 0; font-size:0.85rem; color:#94a3b8;">Active travel reservations & confirmation passes</p>
                </div>
                <button onclick="closeBookingsViewModal()" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:white;">✕</button>
            </div>
            <div id="bookingsListContainer" style="flex:1; overflow-y:auto; padding:20px 24px;"></div>
            <div style="padding:14px 24px; border-top:1px solid #f1f5f9; background:#f8fafc; text-align:right;">
                <button onclick="closeBookingsViewModal()" class="btn btn-secondary btn-sm" style="padding:6px 14px; border-radius:8px;">Close</button>
            </div>
        </div>
    `;
    div.addEventListener("click", (e) => {
        if (e.target === div) closeBookingsViewModal();
    });
    document.body.appendChild(div);
}

function renderBookingsList() {
    const container = document.getElementById("bookingsListContainer");
    if (!container) return;

    let bookings = [];
    try {
        bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    } catch (e) {
        bookings = [];
    }

    if (bookings.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:#64748b;">
                <span style="font-size:3rem; display:block; margin-bottom:12px;">🎟️</span>
                <h4 style="color:#1e293b; margin-bottom:8px;">No Booking Vouchers Yet</h4>
                <p style="font-size:0.9rem;">Browse our adventure or destination pages and click "Book Tour" to generate instant reservations!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = bookings.map((b, idx) => `
        <div style="border:2px dashed #ff9800; border-radius:14px; padding:16px 20px; margin-bottom:14px; background:#fffcf2; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                    <span style="background:#ff9800; color:white; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:6px;">PASS CONFIRMED</span>
                    <h4 style="margin:6px 0 0; color:#1e293b; font-size:1.15rem;">${b.title}</h4>
                </div>
                <span style="font-family:monospace; font-weight:700; color:#c2410c; font-size:1rem;">${b.code}</span>
            </div>
            <div style="font-size:0.88rem; color:#475569; display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:10px;">
                <div><strong>Lead Guest:</strong> ${b.name}</div>
                <div><strong>Date:</strong> ${b.date}</div>
                <div><strong>Party:</strong> ${b.travelers}</div>
                <div><strong>Email:</strong> ${b.email}</div>
            </div>
            ${b.notes ? `<div style="font-size:0.83rem; color:#64748b; margin-top:8px; font-style:italic;">Note: ${b.notes}</div>` : ""}
        </div>
    `).join("");
}
