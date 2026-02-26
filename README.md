<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Microsoft Graph API & Search Microservice

This project is a refactor of the Microsoft Search API into a **Monorepo** structure using **NestJS Microservices**. It uses an **API Gateway** to handle HTTP requests and routes them to specialized microservices via **TCP**.

## Architecture

The project is organized as a Monorepo:

- **apps/api-gateway**: The main entry point (HTTP). Handles authentication and routing.
- **apps/applications**: Microservice for managing Applications.
- **apps/emails**: Microservice for managing Emails.
- **apps/search**: Microservice for Search operations.
- **apps/user**: Microservice for User profile management.
- **libs/shared**: Shared library containing DTOs, Types, and Utilities.

## Services & Ports

| Service          | Type | Port     | Description                     |
| :--------------- | :--- | :------- | :------------------------------ |
| **API Gateway**  | HTTP | **3000** | Main entry point, Swagger, Auth |
| **Applications** | TCP  | **3001** | Application logic               |
| **Emails**       | TCP  | **3002** | Email logic                     |
| **Search**       | TCP  | **3003** | Search logic                    |
| **User**         | TCP  | **3004** | User logic                      |

## Features

### 1. Logging

- **System**: Uses `nestjs-pino` for high-performance, JSON-structured logging.
- **Development**: Pretty-printed logs are enabled in non-production environments.

### 2. Monitoring & Health

- **Metrics**: Prometheus metrics are available at `/api/metrics`.
- **Health Checks**: Health status is available at `/api/health`.

### 3. Docker Support

The project is fully Dockerized with a single multi-stage `Dockerfile`.

**Run with Docker Compose:**

```bash
docker-compose up -d --build
```

**Build Specific Service:**

```bash
docker build --build-arg APP_NAME=api-gateway -t api-gateway .
```

### 4. Vault Integration

- **Service**: HashiCorp Vault is integrated for secret management.
- **Config**: Secrets are loaded at startup and merged with environment variables.
- **Local Dev**: A Vault container is provided in `docker-compose.yml` (Port 8200).

## Prerequisities

1.  **Node.js**: Ensure Node.js is installed.
2.  **Azure App Registration**: You need a valid `.env` file with Azure AD credentials.
    ```env
    AZURE_CLIENT_ID=...
    AZURE_TENANT_ID=...
    AZURE_CLIENT_SECRET=...
    AZURE_REDIRECT_URI=http://localhost:3000/api/auth/callback
    AZURE_SCOPES=...
    SESSION_SECRET_KEY=...
    ```

## Installation

```bash
$ npm install
```

## Running the App

### Run All Services (Recommended)

This command starts the API Gateway and all Microservices concurrently.

```bash
$ npm run start:all
```

### Run Individually

You can start services individually in separate terminals:

```bash
# Gateway (Required)
$ npm run start:gateway

# Microservices
$ npm run start:applications
$ npm run start:emails
$ npm run start:search
$ npm run start:user
```

## API Endpoints (Gateway)

Once running, the API is accessible at `http://localhost:3000/api`.

- **Swagger UI**: `http://localhost:3000/api`
- **Login**: `http://localhost:3000/api/auth/login`
- **Logout**: `http://localhost:3000/api/auth/logout`
- **User Profile**: `http://localhost:3000/api/user`
- **Applications**: `http://localhost:3000/api/applications`
- **Emails**: `http://localhost:3000/api/emails`
- **Search**: `POST http://localhost:3000/api/search`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
