# 🎮 Game Discovery Website

A modern web app that allows users to explore, search, and discover video games. The app is built using **React** and styled with **Tailwind CSS**, offering a clean UI, responsive layout, and fast performance.

---

## 🚀 Features

* ✅ Browse popular, trending, or newly released games
* ✅ Search games by name, platform, or genre
* ✅ Filter and sort results (e.g., ratings, release date)
* ✅ View detailed game pages with screenshots, descriptions, platforms, etc.
* ✅ Responsive and mobile-friendly design
* ✅ Built using reusable components and clean architecture

---

## 🛠️ Tech Stack

| Technology        | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| **React.js**      | Component-based UI library for building the frontend             |
| **Tailwind CSS**  | Utility-first CSS framework for styling                          |
| **React Router**  | For navigation between pages                                     |
| **Fetch**         | For API calls (RAWG API)                 |
| **Vite**          | Used for project build and development |

---

## 📁 Project Structure

```
src/
├── assets/         # Images, icons, and static files
├── components/     # Reusable UI components
├── pages/          # Full-page components (Home, Game Details, etc.)
├── lib/            # Utilities and Libraries
├── hooks/          # Custom hooks
├── App.tsx         # Root component
├── main.tsx        # App entry point
└── index.css       # Tailwind / global styles
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/dogovicky/game-site.git
cd game-site
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Add Environment Variables

Create a `.env` file in the root folder and add your API key(s):

```
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.example.com
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

### 5. Build for production

```bash
npm run build
```

---

## 🌐 Deployment

You can deploy the production build using:

* **Vercel**
* **Netlify**
* **GitHub Pages**
* **Firebase Hosting**

Example (Vercel):

```bash
npm install -g vercel
vercel
```

---

---

## ✅ To-Do / Future Improvements

* [ ] User accounts and authentication
* [ ] Favorite / wishlist feature
* [ ] Reviews and ratings
* [ ] Infinite scrolling or pagination

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Open a Pull Request

---

## 💬 Contact

**Your Name** – [Dogo Vicky](mailto:dogovicky05@gmail.com)
**GitHub:** [https://github.com/dogovicky](https://github.com/dogovicky)

---
