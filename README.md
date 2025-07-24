# Ink Nest - Blog Application Monorepo
Ink Nest is a full-stack blog application built using a monorepo architecture with Turborepo. It features a NestJS backend with GraphQL and a NextJS frontend, providing a robust platform for creating, managing, and interacting with blog posts.


## Table of Contents

- Features
- Tech Stack
- Setup
- Environment Variables
- Running the Application
- Project Structure
- License

### Features

- **Authentication & Authorization:**

  - User signup/login via email/password or Google OAuth.
  - JWT-based authentication for secure session management.
  - Authorized users can only update/delete their own posts.


- **Backend (NestJS):**

  - GraphQL API for CRUD operations on blog posts.
  - Comment system: create comments, fetch comments for a post, like/unlike comments, and retrieve total likes or user-liked comments.
  - Tag support: attach comma-separated tags to posts.
  - Pagination for efficient post retrieval.
  - SQLite database with Prisma ORM for data management.
  - Password hashing with Argon2 for security.


- **Frontend (NextJS):**

  - UI for login, signup, and post management.
  - Server Actions to fetch GraphQL queries.
  - Display all posts on the homepage with pagination.
  - User-specific post management (view, edit, delete own posts).
  - File uploads (images) using Supabase.
  - Session management with the jose library.
  - Middleware for protecting authenticated routes.
  - Input validation using Zod.
  - Fetch individual posts by ID.
  - NextJS intercepting and parallel routes for delete functionality.
  - Sanitize post content with dompurify to prevent script injection.


### Tech Stack

- **Monorepo:** Turborepo
- **Backend:** 
  - NestJS
  - GraphQL
  - SQLite with Prisma ORM
  - Packages: graphql, @faker-js/faker, argon2, passport, passport-google-oauth20
- Frontend: 
  - NextJS
  - Packages: @tanstack/react-query, dompurify, jose, zod
- **Package Manager:** pnpm
- **File Storage:** Supabase (image uploads)

## Setup
### Prerequisites

- Node.js (v20 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ink-nest.git
cd ink-nest
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (see Environment Variables section).

4. Populate the database with dummy data (optional):
```bash
pnpm run db:seed
```

## Environment Variables
### Backend (.env in apps/backend)

DATABASE_URL=sqlite://./database.sqlite
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url
WEB_URL=your-app-frontend-url

### Frontend (.env in apps/frontend)
BACKEND_URL=your-app-backend-url
SESSION_SECRET_KEY=your_session_secret
SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key

## Running the Application

1. Start the development servers with Turborepo:
```bash
pnpm run dev
```

2. Access the application:

  - Backend: http://localhost:3000 (GraphQL Playground at /graphql)
  - Frontend: http://localhost:3001

3. Build for production:
```bash
pnpm run build
```

4. Start the production server:
```bash
pnpm run start
```

## Project Structure

ink-nest/
├── apps/
│   ├── api/          # NestJS backend
│   │   ├── src/          # Source code (GraphQL, resolvers, controllers, services)
│   │   ├── prisma/       # Prisma schema and migrations
│   │   └── .env          # Backend environment variables
│   ├── web/         # NextJS frontend
│   │   ├── app/          # NextJS app directory (pages, components)
│   │   ├── public/       # Static assets
│   │   └── .env          # Frontend environment variables
├── packages/             # Shared packages (if any)
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # pnpm monorepo configuration
└── README.md


## License
This project is licensed under the MIT License.