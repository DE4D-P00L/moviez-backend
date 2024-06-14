# Moviez Backend

[Frontend Code](https://github.com/DE4D-P00L/moviez)

## Description:

This Node.js backend serves as the API foundation for the Moviez OTT Clone website, a front-end project deployed on GitHub. It utilizes Express for a streamlined framework, Mongoose for robust MongoDB data modeling, Axios for efficient HTTP requests to external APIs (The Movie Database - TMDb), bcryptjs for secure password hashing, CORS for cross-origin resource sharing, dotenv for managing environment variables, and nodemon for development-friendly automatic server restarts.

## Technologies:

- Node.js (server-side runtime environment)
- Express (web framework)
- Mongoose (ODM for MongoDB)
- Axios (HTTP client for external API requests)
- bcryptjs (password hashing)
- cors (middleware for Cross-Origin Resource Sharing)
- dotenv (environment variable management)
- nodemon (development server with automatic restarts)

## API Endpoints:

- **/api/user/login/** : Endpoint for user login. **(Post request)**
- **/api/user/signup/** : Endpoint for user Signup. **(Post request)**
- **/api/** : Retrieves a list of trending movies and TV Shows.
- **/api/movie/** : Fetches a collection of trending movies from the external data source (e.g., TMDb).
- **/api/tv/:searchQuery/** : Performs a search for Shows based on the provided query string.
- **/api/tv/** : Fetches a collection of recently released shows from the external data source (e.g., TMDb).
- **/api/trending/tv/** : Fetches a collection of trending shows from the external data source.
- **/api/tv/details/:tvid/** : Retrieves detailed information about a specific show using the ID provided in the URL parameter.
- **/api/trending/movies/** : Fetches a collection of trending movies from the external data source.
- **/api/movies/:searchQuery/** : Performs a search for movies based on the provided query string
- **/api/movie/:mid/** : Retrieves detailed information about a specific Movie using the ID provided in the URL parameter.

## Getting Started:

1. Clone the repository:

```bash
    git clone https://github.com/DE4D-P00L/moviez-backend.git
```

2. Install dependencies

```bash
    cd moviez-backend
    npm install
```

3. Add `.env` file to root of backend and configure environment variables

```
    TMDB_API_KEY=YOUR_API_KEY
    TMDB_API_TOKEN=YOUR_API_TOKEN
    MONGO_URI=YOUR_MONGODB_URI
```

4. Start server

```bash
    npm run dev
```

This will start the Node.js server, listening on the specified port (default: 5000).

## Using the API:

- Refer to the API endpoints listed above for making requests from your Moviez front-end application.
- Implement authentication logic in your front-end to secure access to protected endpoints.
- Handle errors gracefully on both the server and client sides.

## Further Development:

- Enhance error handling and validation for all API endpoints.
- Implement robust security measures (e.g., input sanitization, JWT authentication).
- Consider pagination for large result sets.
- Add caching mechanisms for performance optimization.
- Tailor logging to your specific needs.
