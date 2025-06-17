# 🎬 Movie App

A modern and responsive movie search web app built with **React**, **TailwindCSS**, and **Appwrite**, using the **TMDB API** to deliver real-time movie data. Users can search movies, check what's trending, and view recently released films — all in a seamless UI.

## 🚀 Features

- 🔍 Search for your favorite movies
- 📈 Dynamic updates based on **trending searches**
- 🆕 View the **most recently added** or **released** content
- 🖼️ Movie details include:
  - Poster
  - Title
  - Release date
  - Rating
  - Original language
- 💡 Smooth UX:
  - Lazy loading
  - Debouncing search input
  - Loading spinners for async operations

## 🛠️ Tech Stack

| Layer     | Tool/Library       |
|-----------|--------------------|
| Frontend  | React, TailwindCSS |
| API       | TMDB (The Movie Database) |
| Backend   | Appwrite           |
| Utilities | react-use (for debouncing) |

## ⚙️ Core Concepts Used

- React Hooks: `useState`, `useEffect`
- Debounced API calls using `useDebounce`
- Appwrite as a lightweight backend to store and update **search counts**
- Reusable components: `Search`, `MovieCard`, `Spinner`

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/movie-app.git
cd movie-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file and add the following
REACT_APP_TMDB_API_KEY=your_tmdb_api_key

# (Optional) For Appwrite backend integration
REACT_APP_APPWRITE_ENDPOINT=your_appwrite_endpoint
REACT_APP_APPWRITE_PROJECT_ID=your_project_id

# 4. Run the app
npm run dev
