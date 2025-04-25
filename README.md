CRUX Metrics App

This is a React + Vite app that lets users enter one or more URLs and fetch real user experience metrics from the Chrome UX Report API. The results are shown in a table with filters and sorting.

To run the project:

1. Download and unzip the project.
2. Open terminal and go into the project folder:
   cd crux-app-bredg
3. Install dependencies:
   npm install
4. Start the app:
   npm run dev

You can enter URLs one by one and press Enter after each. Then click Submit to fetch the data.

The table supports sorting and filtering. Errors are shown using a snackbar if API fails.

A .env file is included with the API key. You can replace the key if needed.




Live Demo :- https://crux-metrics.vercel.app/