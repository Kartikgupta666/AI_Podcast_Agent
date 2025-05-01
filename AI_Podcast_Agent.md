
# AI_Podcast_Agent

## Overview

The AI_Podcast_Agent is a project designed to generate podcast scripts using AI and convert them into audio files.  It consists of a backend (Node.js/Express) and a frontend (React/Vite).

## Backend

### Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web application framework for Node.js.
*   **cors:** Middleware to enable Cross-Origin Resource Sharing.
*   **dotenv:**  Loads environment variables from a `.env` file.
*   **@deepgram/sdk:** (Likely used in Service/Audio_gen.js, not explicitly shown but declared in package.json) For Speech-to-Text or Audio processing
*   **@google/genai:**  Google's Generative AI SDK for generating podcast scripts.

### Setup

1.  **Install Dependencies:**

    ```bash
    cd backend
    npm install
    ```

2.  **Configure Environment Variables:**

    Create a `.env` file in the backend directory.  You'll likely need to set environment variables such as API keys for Deepgram and Google GenAI. Example:

    ```
    DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY
    GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_GENAI_API_KEY
    ```

3.  **Run the Backend:**

    ```bash
    npm run dev  # For development with nodemon
    # or
    npm start # For production
    ```

    The backend server will start on port 8000.

### API Endpoints

*   `GET /:title`: Generates a podcast script based on the provided `title`, converts it to audio, and returns the audio file (`.wav`).  Example:  `GET /MyPodcastTopic`
*   `GET /audio/:title`:  Returns a pre-existing audio file (if it exists) for the given `title`.  Example: `GET /audio/MyPodcastTopic`

## Frontend

### Technologies Used

*   **React:** JavaScript library for building user interfaces.
*   **Vite:**  Build tool for faster and leaner development.
*   **Axios:**  HTTP client for making API requests.
*   **Styled Components:** For styling React components
*   **React Icons:**  For using icons in the application.
*   **Tailwind CSS:** Utility-first CSS framework.

### Setup

1.  **Install Dependencies:**

    ```bash
    cd frontend
    npm install
    ```

2.  **Run the Frontend:**

    ```bash
    npm run dev
    ```

    This will start the development server, and the application will typically be accessible at `http://localhost:5173/`.

## Project Structure

```
AI_Podcast_Agent/
├── backend/
│   ├── index.js          # Main server file
│   ├── package.json      # Backend dependencies
│   ├── .env              # Environment variables
│   ├── Service/
│   │   ├── Audio_gen.js  # Audio generation logic
│   │   └── GenAI.js      # AI script generation logic
├── frontend/
│   ├── src/              # React components and assets
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
├── README.md           # This file
```

## Usage

1.  **Start the Backend:** Follow the setup instructions for the backend.
2.  **Start the Frontend:** Follow the setup instructions for the frontend.
3.  **Interact with the Application:** Use the frontend to enter a podcast title.  The frontend will send a request to the backend to generate the script and audio. The backend will return the generated audio file.

## Contributing

Contributions are welcome!  Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Submit a pull request.
```