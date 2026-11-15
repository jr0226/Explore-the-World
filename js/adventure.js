// Adventure favorites handling with error-free element checking
function clearFavorite() {
    localStorage.removeItem("favoriteAdventure");

    const display = document.getElementById("favoriteDisplay");
    if (display) {
        display.innerText = "Your favorite adventure: None selected yet.";
    }

    const saveButtons = document.querySelectorAll('.btn-outline-warning');
    saveButtons.forEach(button => {
        button.disabled = false;
        button.innerText = "⭐ Save as Favorite";
    });

    if (window.showToast) {
        window.showToast("Your favorite adventure has been cleared.");
    } else {
        alert("Your favorite adventure has been cleared.");
    }
}

function saveFavoriteAdventure(adventure, btnElement) {
    localStorage.setItem("favoriteAdventure", adventure);

    // Also sync to savedAdventures list for the unified wishlist
    try {
        let savedList = JSON.parse(localStorage.getItem("savedAdventures")) || [];
        if (!savedList.includes(adventure)) {
            savedList.push(adventure);
            localStorage.setItem("savedAdventures", JSON.stringify(savedList));
        }
    } catch (e) {
        console.error("Error saving adventure list", e);
    }

    const clickedBtn = btnElement || (typeof event !== 'undefined' && event ? (event.currentTarget || event.target) : null);
    if (clickedBtn && clickedBtn.innerText) {
        clickedBtn.innerText = "⭐ Saved";
        clickedBtn.disabled = true;
    }

    const display = document.getElementById("favoriteDisplay");
    if (display) {
        display.innerText = "Your favorite adventure: " + adventure;
    }

    if (window.showToast) {
        window.showToast(`Saved "${adventure}" to your favorites!`);
    } else {
        alert("Your favorite adventure is saved: " + adventure);
    }

    if (window.updateNavCounters) {
        window.updateNavCounters();
    }
}

function initAdventureFavorites() {
    const savedFavorite = localStorage.getItem("favoriteAdventure");
    const display = document.getElementById("favoriteDisplay");

    if (display) {
        if (savedFavorite) {
            display.innerText = "Your favorite adventure: " + savedFavorite;
        } else {
            display.innerText = "Your favorite adventure: None selected yet.";
        }
    }

    // Update buttons matching current favorite
    if (savedFavorite) {
        const buttons = document.querySelectorAll('.btn-outline-warning');
        buttons.forEach(btn => {
            const onclickAttr = btn.getAttribute('onclick') || '';
            if (onclickAttr.includes(savedFavorite)) {
                btn.innerText = "⭐ Saved";
                btn.disabled = true;
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", initAdventureFavorites);
