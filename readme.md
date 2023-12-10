# Game API

## Table of Contents
1. [User Registration and Authentication](#user-registration-and-authentication)
   - [MySQL Database Schema](#mysql-database-schema)
   - [Registration Endpoint](#registration-endpoint)
   - [Authentication Mechanism](#authentication-mechanism)
  
2. [Game Data API](#game-data-api)
   - [MongoDB Collection](#mongodb-collection)
   - [API Endpoints](#api-endpoints)

3. [RabbitMQ Event Processing](#rabbitmq-event-processing)
   - [Setting Up RabbitMQ](#setting-up-rabbitmq)
   - [Event Publisher](#event-publisher)
   - [Event Subscriber](#event-subscriber)

## User Registration and Authentication

### MySQL Database Schema

Create a MySQL database schema with the following fields for user data:
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `username` (VARCHAR(255) NOT NULL)
- `email` (VARCHAR(255) NOT NULL)
- `password` (VARCHAR(255) NOT NULL)

### Registration Endpoint

Implement an API endpoint for user registration. Users can sign up by providing their username, email, and password. The password should be securely hashed before storing it in the database.

### Authentication Mechanism

Implement an authentication mechanism that allows users to log in and receive a JSON Web Token (JWT) for subsequent API requests.

## Game Data API

### MongoDB Collection

Create a MongoDB collection to store game data, including player statistics and game results.

### API Endpoints

Implement the following API endpoints for game data:
- **Create a new game entry:** `POST /api/games`
- **Retrieve game data for a specific user:** `GET /api/games/:userId`
- **Update game data for a specific user:** `PUT /api/games/:userId`
- **Delete a game entry:** `DELETE /api/games/:gameId`

## RabbitMQ Event Processing

### Setting Up RabbitMQ

1. Install RabbitMQ on your local machine.
2. Start the RabbitMQ server.

### Event Publisher

Implement an event publisher that sends a message to RabbitMQ whenever a user registers.

### Event Subscriber

Implement an event subscriber that listens for these events and logs them in a file.

**Note:** Ensure you have the necessary dependencies installed and configure environment variables as needed.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up and configure your databases (MySQL and MongoDB).
4. Start your application: `npm start`.

 
