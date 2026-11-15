# 🌍 Explore the World - Global Travel & Adventure Portal

An interactive, responsive, production-ready travel web application designed to help adventurers discover world-class destinations, thrill-seeking outdoor activities, rich cultural festivals, authentic global cuisines, and practical travel tools.

---

## 🌐 Live Website & Public Access

You can access and share this website publicly worldwide without needing to be on a local Wi-Fi network:

- **Primary Cloudflare Pages Deployment:**  
  👉 **[https://exploretheworld2.pages.dev/](https://exploretheworld2.pages.dev/)**
- **GitHub Repository:**  
  👉 **[https://github.com/jr0226/Explore-the-World](https://github.com/jr0226/Explore-the-World)**
- **GitHub Pages Deployment:**  
  👉 **[https://jr0226.github.io/Explore-the-World/](https://jr0226.github.io/Explore-the-World/)**

> [!TIP]
> Both Cloudflare Pages and GitHub Actions CI/CD automatically rebuild and deploy the latest changes whenever new commits are pushed to the `main` branch.

---

## ✨ Features & Capabilities

### 1. 📍 World-Class Destination Guides
- **Paris, France:** Eiffel Tower, The Louvre Museum, Palais Garnier, Musée d’Orsay, Champs-Élysées.
- **New York, USA:** Metropolitan Museum of Art, Carnegie Hall, Wall Street, American Museum of Natural History, Statue of Liberty.
- **Rome, Italy:** Colosseum, St. Peter's Basilica, Capitoline Museums, Galleria Borghese, Piazza Navona.
- Embedded interactive Google Maps for every landmark.
- 1-click **Save Destination** and **Book Tour** options.

### 2. 🧗 Adventure & Outdoor Activities
- 6 thrilling adventure categories:
  - **Hiking & Trekking** (Inca Trail, Everest Base Camp)
  - **Safari & Wildlife** (Serengeti, Maasai Mara, Namibia)
  - **Snorkeling & Scuba Diving** (Great Barrier Reef, Thailand)
  - **Rock Climbing** (Dolomites Italy, Kalymnos Greece)
  - **White-water Rafting** (Ganges India, Ayung River Bali)
  - **Skydiving** (Swiss Alps, Dubai, Hawaii)
- Curated video links and instant pass reservation modals.

### 3. 🎭 Cultural Highlights & Global Festivals
- Interactive festival showcases with custom modals and video highlights:
  - **Diwali** (Festival of Lights, India)
  - **Chinese New Year** (Spring Festival)
  - **Rio Carnival** (Brazil's samba extravaganza)
  - **Oktoberfest** (Munich Bavarian folk celebration)
- Save festivals to **My Favorite Festivals** with instant modal review and removal.

### 4. 🥐 Global Food & Cuisine Guides
- Signature dishes across Paris, New York, and Rome:
  - Paris: Crêpes and Galettes, French Onion Soup, Classic Baguette.
  - New York: Pastrami on Rye, Bagel with Cream Cheese and Lox, Cronut.
  - Rome: Pasta alla Carbonara, Carciofi Artichokes, Maritozzi.
- **Interactive 5-Star Rating System**: Hover to select stars, click to submit ratings, with dynamic average calculation stored in `localStorage`.
- **Saved Food Gallery**: Pin favorite culinary dishes with 1-click remove.

### 5. 🧰 Interactive Travel Utilities & Tools
- **Live Currency Converter**: Instant conversion between USD, EUR, GBP, JPY, MYR, AUD, and SGD with quick swap button.
- **Interactive Packing Checklist**: Check off items, monitor progress percentage with an animated bar, add custom packing gear, and persist list to `localStorage`.
- **Climate & Packing Advisor**: Select top cities to view typical temperatures, weather conditions, ideal visiting seasons, and packing tips.

### 6. 💖 Unified Trip Wishlist & Itinerary Planner
- Access all saved destinations, adventures, festivals, and culinary treats in one cohesive modal drawer via the navbar 💖 icon.
- **Export Itinerary (.txt)**: Download a clean travel itinerary file to your computer.

### 7. 🎫 Instant Tour Booking & Confirmation Pass
- Reserve travel passes and guided experiences with custom dates, party sizes, and special notes.
- Generates a unique confirmation voucher code (e.g. `ETW-849201`) saved in your profile.

### 8. 🔍 Global Quick Search (Ctrl + K)
- Press `Ctrl + K` or click **🔍 Search** in the navbar to open an instant modal search index covering destinations, adventures, dishes, and blog stories.

### 9. 👤 User Authentication & Guest Access
- User registration and login powered by client-side storage.
- **1-Click Quick Demo Login**: Jump in immediately as a demo traveler.
- **Browse as Guest Mode**: Explore all pages freely without being locked out.
- Profile menu in the navbar displaying the logged-in username and active bookings.

### 10. 💬 Contact & Feedback System
- Fully validated inquiry form categorized by topic (Trip Planning, Feedback, Inquiries).
- Submissions saved locally with instant toast confirmation and FAQ accordion.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Modern JavaScript (ES6+)
- **Styling & Components:** Custom Design System (`css/common.css`), Bootstrap 5.3
- **Storage:** Web Storage API (`localStorage` & `sessionStorage`)
- **Hosting & CI/CD:** Cloudflare Pages, GitHub Actions (`.github/workflows/pages.yml`), GitHub Pages

---

## 📂 Project Directory Structure

```text
Explore the World/
├── index.html                   # Main landing & authentication portal
├── homePage.html                # Travel home portal with video hero
├── destination.html             # Destination overview & saved list
├── adventure.html               # Adventure overview & favorites
├── cultural.html                # Cultural highlights & festival modal
├── food&cuisine.html            # Cuisine overview & food gallery
├── experience.html              # Travel blog articles & stories
├── tips.html                    # Travel tips & interactive utilities
├── contact.html                 # About us, contact form & FAQ
├── signup.html                  # User registration page
│
├── destinationPages/            # City guide pages
│   ├── paris.html
│   ├── newYork.html
│   └── rome.html
│
├── adventurePages/              # Thrill adventure subpages
│   ├── climbing.html
│   ├── hiking.html
│   ├── rafting.html
│   ├── safari.html
│   ├── scuba.html
│   └── skydiving.html
│
├── foodPages/                   # Culinary subpages
│   ├── parisFood.html
│   ├── newYorkFood.html
│   └── romeFood.html
│
├── css/                         # Stylesheets
│   ├── common.css               # Universal navbar, toasts, modals & tokens
│   ├── homePage.css
│   ├── destination.css
│   ├── adventure.css
│   ├── cultural.css
│   ├── food.css
│   ├── experience.css
│   ├── tips.css
│   ├── contact.css
│   └── style.css                # Authentication forms
│
├── js/                          # Core JavaScript engines
│   ├── common.js                # Navbar, user state, toast engine, back-to-top
│   ├── features.js              # Global search, wishlist planner, tour bookings
│   ├── destination.js           # Destination favorites & routing
│   ├── adventure.js             # Adventure favorites management
│   ├── cultural.js              # Festival favorites modal
│   ├── food.js                  # Star ratings & food gallery
│   └── tips.js                  # Currency converter, packing checklist & climate
│
├── image/                       # Optimized photography & assets
├── media/                       # Video backgrounds (scene.mp4)
├── .github/workflows/pages.yml  # Automatic GitHub Pages CI/CD workflow
└── .gitignore                   # Ignore sensitive and environment files
```

---

## 🚀 Setup & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jr0226/Explore-the-World.git
   cd Explore-the-World
   ```

2. **Run locally:**
   - You can open `index.html` or `homePage.html` directly in any web browser.
   - Or serve with any static web server:
     ```bash
     # Using Node's npx serve
     npx serve .

     # Or using Python
     python -m http.server 8000
     ```

3. **Deploying to Cloudflare Pages:**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**
   - Select `jr0226/Explore-the-World`
   - Build settings: Framework: None, Build command: *(leave blank)*, Output directory: `.`
   - Click **Save and Deploy**. Your custom `https://<project-name>.pages.dev/` is live!

---

## 📄 License & Attribution

Designed and developed for the Front-End Web Development assignment. All photography and videos are sourced for educational and demonstrative travel presentation purposes.
