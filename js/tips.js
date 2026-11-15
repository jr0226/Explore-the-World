// =========================================================
// Travel Tips & Interactive Travel Tools Engine
// =========================================================

// Scroll Reveal Observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    initCurrencyConverter();
    initPackingChecklist();
    initWeatherWidget();
});

// =========================================================
// 1. Interactive Currency Converter
// =========================================================
const exchangeRates = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 154.5,
    MYR: 4.45,
    AUD: 1.52,
    CAD: 1.38,
    SGD: 1.34
};

function initCurrencyConverter() {
    const amountInput = document.getElementById("currAmount");
    const fromSelect = document.getElementById("currFrom");
    const toSelect = document.getElementById("currTo");
    const resultSpan = document.getElementById("currResult");

    if (!amountInput || !fromSelect || !toSelect || !resultSpan) return;

    function convert() {
        const val = parseFloat(amountInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;

        // Convert base to USD then to target
        const inUSD = val / exchangeRates[from];
        const converted = inUSD * exchangeRates[to];

        resultSpan.textContent = `${val.toFixed(2)} ${from} = ${converted.toFixed(2)} ${to}`;
    }

    amountInput.addEventListener("input", convert);
    fromSelect.addEventListener("change", convert);
    toSelect.addEventListener("change", convert);

    window.swapCurrencies = function () {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        convert();
    };

    convert();
}

// =========================================================
// 2. Interactive Packing Checklist (Persistent)
// =========================================================
const defaultPackingItems = [
    { id: "item-1", text: "Passport & Valid Travel Visas", done: true },
    { id: "item-2", text: "Universal Power Plug Adapter", done: false },
    { id: "item-3", text: "Travel First Aid & Prescriptions", done: false },
    { id: "item-4", text: "Comfortable Walking & Hiking Shoes", done: false },
    { id: "item-5", text: "Power Bank & Phone Charger Cables", done: true },
    { id: "item-6", text: "Weather-Appropriate Jacket / Windbreaker", done: false },
    { id: "item-7", text: "Physical & Digital Copies of Bookings", done: false }
];

function initPackingChecklist() {
    renderPackingChecklist();
}

function getPackingList() {
    try {
        const saved = JSON.parse(localStorage.getItem("packingChecklist"));
        return (saved && saved.length > 0) ? saved : defaultPackingItems;
    } catch (e) {
        return defaultPackingItems;
    }
}

function savePackingList(list) {
    localStorage.setItem("packingChecklist", JSON.stringify(list));
}

function renderPackingChecklist() {
    const container = document.getElementById("packingListContainer");
    const progressBar = document.getElementById("packingProgress");
    const progressText = document.getElementById("packingProgressText");
    if (!container) return;

    const items = getPackingList();
    const doneCount = items.filter(x => x.done).length;
    const percent = Math.round((doneCount / items.length) * 100) || 0;

    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.textContent = `${doneCount} of ${items.length} items packed (${percent}%)`;

    container.innerHTML = items.map((item, idx) => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:${item.done ? '#ecfdf5' : '#ffffff'}; border:1px solid #e2e8f0; border-radius:8px; margin-bottom:8px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; flex:1; margin:0;">
                <input type="checkbox" ${item.done ? 'checked' : ''} onchange="togglePackingItem('${item.id}')" style="width:18px; height:18px; cursor:pointer;">
                <span style="font-size:0.95rem; ${item.done ? 'text-decoration:line-through; color:#059669; font-weight:500;' : 'color:#1e293b;'}">${item.text}</span>
            </label>
            <button onclick="deletePackingItem('${item.id}')" style="background:none; border:none; color:#ef4444; font-size:1rem; cursor:pointer; padding:2px 6px;">✕</button>
        </div>
    `).join("");
}

window.togglePackingItem = function (id) {
    let items = getPackingList();
    items = items.map(x => x.id === id ? { ...x, done: !x.done } : x);
    savePackingList(items);
    renderPackingChecklist();
};

window.deletePackingItem = function (id) {
    let items = getPackingList();
    items = items.filter(x => x.id !== id);
    savePackingList(items);
    renderPackingChecklist();
};

window.addPackingItem = function () {
    const input = document.getElementById("newPackingItem");
    if (!input || !input.value.trim()) return;

    const items = getPackingList();
    items.push({
        id: "item-" + Date.now(),
        text: input.value.trim(),
        done: false
    });
    savePackingList(items);
    input.value = "";
    renderPackingChecklist();
    if (window.showToast) window.showToast("Item added to packing list!");
};

window.resetPackingChecklist = function () {
    if (confirm("Reset packing checklist to defaults?")) {
        savePackingList(defaultPackingItems);
        renderPackingChecklist();
        if (window.showToast) window.showToast("Packing list reset.", "info");
    }
};

// =========================================================
// 3. Destination Climate & Packing Advisor
// =========================================================
const weatherData = {
    paris: {
        temp: "18°C (64°F)",
        condition: "Mild & Partly Sunny ⛅",
        bestMonths: "April to October",
        tip: "Pack light layers, a chic scarf, comfortable walking shoes, and a compact umbrella for sudden Parisian drizzles."
    },
    newyork: {
        temp: "22°C (72°F)",
        condition: "Clear & Breezy 🌤️",
        bestMonths: "May to June, September to November",
        tip: "Comfortable sneakers are essential for extensive NYC block walking. Bring a light jacket for breezy evenings."
    },
    rome: {
        temp: "25°C (77°F)",
        condition: "Warm & Sunny ☀️",
        bestMonths: "April to May, September to October",
        tip: "Remember that St. Peter's Basilica & Vatican require covered shoulders and knees. Carry a refillable water bottle for Rome's historic public fountains (nasoni)."
    },
    swiss: {
        temp: "12°C (54°F)",
        condition: "Cool & Crisp 🏔️",
        bestMonths: "June to September (Hiking) / Dec to March (Skiing)",
        tip: "Thermal base layers, waterproof hiking boots, UV-blocking sunglasses, and high-altitude sunscreen are essential."
    },
    bali: {
        temp: "29°C (84°F)",
        condition: "Tropical Warmth 🌴",
        bestMonths: "April to October (Dry season)",
        tip: "Breathable linen clothing, reef-safe sunscreen, temple sarong, and mosquito repellent."
    }
};

function initWeatherWidget() {
    const select = document.getElementById("destinationWeatherSelect");
    if (!select) return;

    function updateWeather() {
        const data = weatherData[select.value] || weatherData.paris;
        const tempEl = document.getElementById("weatherTemp");
        const condEl = document.getElementById("weatherCondition");
        const monthsEl = document.getElementById("weatherMonths");
        const tipEl = document.getElementById("weatherTip");

        if (tempEl) tempEl.textContent = data.temp;
        if (condEl) condEl.textContent = data.condition;
        if (monthsEl) monthsEl.textContent = data.bestMonths;
        if (tipEl) tipEl.textContent = data.tip;
    }

    select.addEventListener("change", updateWeather);
    updateWeather();
}
