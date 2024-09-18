# tiktok_clone

This project is a clone of the popular social media app TikTok. It aims to replicate the core functionalities of TikTok, including video sharing, liking, commenting, and user authentication.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Authentication (Sign Up, Login, Logout)
- Upload and Share Videos
- Like and Comment on Videos
- Follow and Unfollow Users
- Video Feed based on Followed Users

## Technologies Used
- **Frontend:** React, Redux, CSS
- **Backend:** NestJS, GraphQL
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Storage:** Local Storage for video storage
- **Containerization:** Docker, Docker Compose

## API Endpoints
- **User Authentication:**
  - `mutation { signUp(input: SignUpInput) { user { id, username, email } } }` - Sign up a new user
  - `mutation { login(input: LoginInput) { accessToken } }` - Log in an existing user
  - `mutation { logout }` - Log out the current user

- **User Management:**
  - `query { user(id: ID!) { id, username, email, profile } }` - Get user profile by ID
  - `mutation { updateUser(id: ID!, input: UpdateUserInput) { user { id, username, email, profile } } }` - Update user profile by ID
  - `mutation { followUser(id: ID!) { user { id, username } } }` - Follow a user by ID
  - `mutation { unfollowUser(id: ID!) { user { id, username } } }` - Unfollow a user by ID

- **Video Management:**
  - `mutation { uploadVideo(input: UploadVideoInput) { video { id, url, description } } }` - Upload a new video
  - `query { video(id: ID!) { id, url, description, likes, comments } }` - Get video details by ID
  - `mutation { deleteVideo(id: ID!) { success } }` - Delete a video by ID
  - `mutation { likeVideo(id: ID!) { video { id, likes } } }` - Like a video by ID
  - `mutation { unlikeVideo(id: ID!) { video { id, likes } } }` - Unlike a video by ID
  - `mutation { commentOnVideo(id: ID!, input: CommentInput) { comment { id, content } } }` - Comment on a video by ID

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
- Docker
- Docker Compose

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/your_username/tiktok_clone.git
   ```
2. Navigate to the project directory
   ```sh
   cd tiktok_clone
   ```
3. Create a folder named `database` in the root repository
   ```sh
   mkdir database
   ```
4. Set up environment variables
   Create a `.env` file in the backend directory and add the following:
   ```env
   DATABASE_URL=postgresql://user:password@database:5432/tiktok_db
   ACCESS_TOKEN_SECRET="secret"
   REFRESH_TOKEN_SECRET="secret"
   APP_URL="http://localhost:3000"
   ```

## Running the App
1. Build and start the Docker containers
   ```sh
   docker-compose up --build
   ```
2. Open your browser and navigate to `http://localhost:3002` for the frontend and `http://localhost:3000/graphql` for the GraphQL playground.

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.
