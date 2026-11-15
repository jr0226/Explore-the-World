// Cultural highlights favorites manager
function saveFavoriteCulture(festivalName) {
    let favorites = [];
    try {
        favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    } catch (e) {
        favorites = [];
    }

    if (!favorites.includes(festivalName)) {
        favorites.push(festivalName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        if (window.showToast) {
            window.showToast(`"${festivalName}" has been saved to your favorites!`);
        } else {
            alert(`${festivalName} has been saved to your favorites!`);
        }
    } else {
        if (window.showToast) {
            window.showToast(`"${festivalName}" is already in your favorites.`);
        } else {
            alert(`${festivalName} is already in your favorites.`);
        }
    }

    if (window.updateNavCounters) {
        window.updateNavCounters();
    }
}

function checkFavorites() {
    let favorites = [];
    try {
        favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    } catch (e) {
        favorites = [];
    }

    const favoritesList = document.getElementById('favoritesList');
    if (!favoritesList) return;
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<li class="list-group-item text-muted text-center py-4">No favorite festivals added yet. Click "💖 Save Favorite" on any festival!</li>';
    } else {
        favorites.forEach(festival => {
            let listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span class="fw-semibold">✨ ${festival}</span>
                <button class="btn btn-outline-danger btn-sm" onclick="removeFavorite('${festival}')">Remove</button>
            `;
            favoritesList.appendChild(listItem);
        });
    }

    const modalElement = document.getElementById('favoritesModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.show();
    }
}

function removeFavorite(festival) {
    let favorites = [];
    try {
        favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    } catch (e) {
        favorites = [];
    }

    favorites = favorites.filter(item => item !== festival);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    const listItems = document.querySelectorAll('#favoritesList li');
    listItems.forEach(item => {
        if (item.innerText.includes(festival)) {
            item.remove();
        }
    });

    if (favorites.length === 0) {
        const favoritesList = document.getElementById('favoritesList');
        if (favoritesList) {
            favoritesList.innerHTML = '<li class="list-group-item text-muted text-center py-4">No favorite festivals added yet.</li>';
        }
    }

    if (window.showToast) {
        window.showToast(`Removed "${festival}" from favorites.`);
    }

    if (window.updateNavCounters) {
        window.updateNavCounters();
    }
}
