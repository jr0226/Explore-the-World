// Save destinations using localStorage
document.addEventListener("DOMContentLoaded", function () {
    const saveButtons = document.querySelectorAll(".save-btn");

    saveButtons.forEach(button => {
        const destination = button.getAttribute("data-destination");
        let saved = getSavedDestinations();
        if (saved.includes(destination)) {
            button.textContent = "⭐ Saved";
            button.classList.add("saved");
        }

        button.addEventListener("click", function () {
            const dest = this.getAttribute("data-destination");
            let savedDestinations = getSavedDestinations();

            if (!savedDestinations.includes(dest)) {
                savedDestinations.push(dest);
                localStorage.setItem("savedDestinations", JSON.stringify(savedDestinations));
                this.textContent = "⭐ Saved";
                this.classList.add("saved");

                if (window.showToast) {
                    window.showToast(`Saved "${dest}" to your favorites!`);
                } else {
                    alert(dest + " has been saved!");
                }
            } else {
                if (window.showToast) {
                    window.showToast(`"${dest}" is already in your favorites.`);
                } else {
                    alert(dest + " is already in your favorites.");
                }
            }

            if (window.updateNavCounters) {
                window.updateNavCounters();
            }
        });
    });
});

function displaySavedDestinations() {
    const saved = getSavedDestinations();
    const container = document.getElementById('saved-destinations');
    if (!container) return;
    container.innerHTML = '';

    if (saved.length === 0) {
        container.innerHTML = "<p class='text-muted my-3'>You haven't saved any destinations yet. Click 'Save' on any destination above!</p>";
        return;
    }

    const imageMap = {
        "Paris, France": "image/paris1.jpg",
        "New York, USA": "image/newyork1.jpg",
        "Rome, Italy": "image/rome.jpg"
    };

    saved.forEach(destination => {
        const url = generateDestinationURL(destination);
        const imgSrc = imageMap[destination] || "image/travel.jpg";

        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
        card.innerHTML = `
            <div class="card h-100 shadow-sm overflow-hidden">
                <img src="${imgSrc}" class="card-img-top" style="height: 180px; object-fit: cover;" alt="${destination}">
                <div class="card-body text-center d-flex flex-column justify-content-between">
                    <h5 class="fw-bold"><a href="${url}" class="text-decoration-none text-dark">${destination}</a></h5>
                    <div class="d-flex justify-content-center gap-2 mt-2">
                        <a href="${url}" class="btn btn-outline-primary btn-sm">Explore Guide</a>
                        <button class="btn btn-danger btn-sm" onclick="removeDestination('${destination}')">Remove</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function removeDestination(destination) {
    let saved = getSavedDestinations();
    saved = saved.filter(item => item !== destination);
    localStorage.setItem("savedDestinations", JSON.stringify(saved));
    displaySavedDestinations();

    // Reset button on page if present
    document.querySelectorAll(".save-btn").forEach(btn => {
        if (btn.getAttribute("data-destination") === destination) {
            btn.textContent = "Save";
            btn.classList.remove("saved");
        }
    });

    if (window.showToast) {
        window.showToast(`Removed "${destination}" from saved items.`);
    }

    if (window.updateNavCounters) {
        window.updateNavCounters();
    }
}

function getSavedDestinations() {
    try {
        return JSON.parse(localStorage.getItem("savedDestinations")) || [];
    } catch (e) {
        return [];
    }
}

function generateDestinationURL(destination) {
    const isSubpage = window.location.pathname.includes('/destinationPages/') || window.location.pathname.includes('/foodPages/') || window.location.pathname.includes('/adventurePages/');
    const prefix = isSubpage ? '../destinationPages/' : 'destinationPages/';

    if (destination === "Paris, France") return prefix + 'paris.html';
    if (destination === "New York, USA") return prefix + 'newYork.html';
    if (destination === "Rome, Italy") return prefix + 'rome.html';
    return isSubpage ? '../destination.html' : 'destination.html';
}

function goBack() {
    window.location.href = '../destination.html';
}
