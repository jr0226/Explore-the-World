// Food and cuisine rating & favorites management

// Get ratings object from localStorage: { [dishName]: [numbers] }
function getStoredRatings() {
    try {
        return JSON.parse(localStorage.getItem('ratings')) || {};
    } catch (e) {
        return {};
    }
}

function saveStoredRatings(ratings) {
    try {
        localStorage.setItem('ratings', JSON.stringify(ratings));
    } catch (e) {
        console.error("Failed to save ratings", e);
    }
}

// Compute average rating for a dish, falling back to default attribute or 0.0
function calculateAverage(dishName, defaultRating = 0) {
    const ratings = getStoredRatings();
    const dishRatings = ratings[dishName];
    if (dishRatings && dishRatings.length > 0) {
        const sum = dishRatings.reduce((a, b) => a + b, 0);
        return (sum / dishRatings.length).toFixed(1);
    }
    return parseFloat(defaultRating || 0).toFixed(1);
}

// Update UI display for a specific card
function updateCardRatingUI(card) {
    const dishName = card.getAttribute('data-dish');
    if (!dishName) return;

    const defaultRating = parseFloat(card.getAttribute('data-default-rating')) || 0;
    const avg = calculateAverage(dishName, defaultRating);

    // Update average text
    const avgSpan = card.querySelector('.average-rating span') || document.getElementById(`avg-rating-${dishName}`);
    if (avgSpan) {
        avgSpan.textContent = avg;
    }

    // Highlight stars
    const rounded = Math.round(parseFloat(avg));
    const stars = card.querySelectorAll('.star');
    stars.forEach((s, idx) => {
        if (idx < rounded) {
            s.classList.add('selected');
        } else {
            s.classList.remove('selected');
        }
    });
}

// Initialize rating cards and event listeners once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    const foodCards = document.querySelectorAll(".food-card");

    foodCards.forEach(card => {
        const dishName = card.getAttribute("data-dish");
        if (!dishName) return;

        updateCardRatingUI(card);

        const stars = card.querySelectorAll(".star");
        stars.forEach((star, index) => {
            // Hover effect
            star.addEventListener("mouseover", () => {
                stars.forEach((s, i) => {
                    s.classList.toggle("hover", i <= index);
                });
            });

            star.addEventListener("mouseout", () => {
                stars.forEach(s => s.classList.remove("hover"));
            });

            // Click to rate
            star.addEventListener("click", () => {
                const ratingValue = parseInt(star.getAttribute("data-rating")) || (index + 1);
                const ratings = getStoredRatings();
                if (!ratings[dishName]) ratings[dishName] = [];
                ratings[dishName].push(ratingValue);
                saveStoredRatings(ratings);

                updateCardRatingUI(card);

                if (window.showToast) {
                    window.showToast(`Rated ${dishName} ${ratingValue}★!`);
                }
            });
        });

        // Save favorite button inside this card
        const saveBtn = card.querySelector(".save-btn");
        if (saveBtn) {
            const foodName = saveBtn.getAttribute("data-food") || saveBtn.getAttribute("data-dish") || dishName;
            
            // Check if already saved
            const savedList = getSavedFood();
            if (savedList.includes(foodName)) {
                saveBtn.textContent = "⭐ Saved";
                saveBtn.classList.add("saved");
            }

            saveBtn.addEventListener("click", (e) => {
                e.preventDefault();
                let saved = getSavedFood();
                if (!saved.includes(foodName)) {
                    saved.push(foodName);
                    localStorage.setItem("savedFood", JSON.stringify(saved));
                    saveBtn.textContent = "⭐ Saved";
                    saveBtn.classList.add("saved");
                    if (window.showToast) {
                        window.showToast(`Saved "${foodName}" to favorites!`);
                    } else {
                        alert(`Saved "${foodName}" to favorites!`);
                    }
                } else {
                    if (window.showToast) {
                        window.showToast(`"${foodName}" is already in your favorites.`);
                    } else {
                        alert(`"${foodName}" is already in your favorites.`);
                    }
                }
                if (window.updateNavCounters) {
                    window.updateNavCounters();
                }
            });
        }
    });

    // Also handle top-level save buttons (e.g. in food&cuisine.html)
    document.querySelectorAll(".save-btn").forEach(button => {
        if (!button.hasAttribute("data-bound")) {
            button.setAttribute("data-bound", "true");
            button.addEventListener("click", () => {
                const foodName = button.getAttribute("data-food") || button.getAttribute("data-dish");
                if (!foodName) return;

                let saved = getSavedFood();
                if (!saved.includes(foodName)) {
                    saved.push(foodName);
                    localStorage.setItem("savedFood", JSON.stringify(saved));
                    button.textContent = "⭐ Saved";
                    if (window.showToast) {
                        window.showToast(`Saved "${foodName}" to favorites!`);
                    } else {
                        alert(`${foodName} saved to favorites!`);
                    }
                } else {
                    if (window.showToast) {
                        window.showToast(`"${foodName}" is already in your favorites.`);
                    }
                }
                if (window.updateNavCounters) {
                    window.updateNavCounters();
                }
            });
        }
    });
});

// Display saved food gallery items
function displaySavedFood() {
    const saved = getSavedFood();
    const container = document.getElementById('saved-food');
    if (!container) return;
    container.innerHTML = '';

    if (saved.length === 0) {
        container.innerHTML = "<p class='text-muted my-3'>You haven't saved any food items yet. Explore the destinations and click Save!</p>";
        return;
    }

    saved.forEach(food => {
        const url = generateFoodURL(food);
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card h-100 shadow-sm p-3 text-center">
                <h5 class="fw-bold"><a href="${url}" class="text-decoration-none text-dark">${food}</a></h5>
                <div class="d-flex justify-content-center gap-2 mt-2">
                    <a href="${url}" class="btn btn-outline-primary btn-sm">View Dish</a>
                    <button class="btn btn-danger btn-sm" onclick="removeFood('${food}')">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Remove food item from saved list
function removeFood(food) {
    let saved = getSavedFood();
    saved = saved.filter(item => item !== food);
    localStorage.setItem("savedFood", JSON.stringify(saved));
    displaySavedFood();
    if (window.showToast) {
        window.showToast(`Removed "${food}" from saved items.`);
    }
    if (window.updateNavCounters) {
        window.updateNavCounters();
    }
}

// Get saved food items from localStorage
function getSavedFood() {
    try {
        const saved = JSON.parse(localStorage.getItem("savedFood")) || [];
        return saved.filter(food => Boolean(food));
    } catch (e) {
        return [];
    }
}

// Unified URL generator for foods and cuisines
function generateFoodURL(food) {
    // Check if relative path needs to adapt to subpage
    const isSubpage = window.location.pathname.includes('/foodPages/') || window.location.pathname.includes('/destinationPages/') || window.location.pathname.includes('/adventurePages/');
    const prefix = isSubpage ? '../foodPages/' : 'foodPages/';

    const map = {
        "Paris, France": prefix + "parisFood.html",
        "New York, USA": prefix + "newYorkFood.html",
        "Rome, Italy": prefix + "romeFood.html",
        "The classic French baguette": prefix + "parisFood.html",
        "French onion soup": prefix + "parisFood.html",
        "Crêpes and Galettes": prefix + "parisFood.html",
        "BagelWithCreamCheeseAndLox": prefix + "newYorkFood.html",
        "PastramiOnRye": prefix + "newYorkFood.html",
        "Pastrami on Rye": prefix + "newYorkFood.html",
        "Cronut": prefix + "newYorkFood.html",
        "Pasta alla Carbonara": prefix + "romeFood.html",
        "Carciofi_alla_Romana_e_Carciofi_alla_Giudia": prefix + "romeFood.html",
        "Maritozzi": prefix + "romeFood.html"
    };

    return map[food] || (isSubpage ? '../food&cuisine.html' : 'food&cuisine.html');
}

// Navigation helper
function goBack() {
    window.location.href = '../food&cuisine.html';
}
