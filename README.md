# 🦐 PrawnCare — Prawn Farming Management System

PrawnCare is a full-stack smart aquaculture management platform to help prawn farmers monitor water quality, manage inventory and workers, process orders, and view analytics.

## Table of Contents

- **Project overview**
- **Features**
- **Tech stack**
- **Architecture**
- **Prerequisites**
- **Local setup (frontend)**
- **Backend**
- **Environment variables**
- **Folder structure**
- **Contributing**
- **License & Contact**

## Project overview

This repository contains the Next.js frontend for the PrawnCare platform. It provides the web UI used by owners, managers, and workers to visualize sensor data, handle orders, and view reports. A separate repository hosts the backend API and database code.

## Features

- Real-time water-quality dashboards and historical trends
- Task and employee management with role-based access
- Inventory, purchase and sales tracking
- Order management and notifications
- Basic analytics and monthly reports
- IoT integration (ESP32 or similar devices) sending sensor data to the backend

## Tech stack

- Frontend: Next.js (app router)
- Backend: Node.js (separate repository)
- Databases: MySQL / MongoDB (backend configuration)
- Mobile: Flutter (separate repo)
- IoT: ESP32 (sensor firmware)

## Architecture

High-level flow:

```mermaid
graph TD
	A[IoT Sensors (ESP32)] -->|HTTP/MQTT| B[Backend API (Node.js)]
	B --> C[MySQL]
	B --> D[MongoDB]
	B --> E[Next.js Frontend]
	B --> F[Flutter Mobile App]
```

## Prerequisites

- Node.js >= 16
- Yarn or npm
- Access to the backend API and database (see backend repo)

## Local setup (frontend)

1. Clone this repository and move into it:

```bash
git clone <this-repo-url>
cd PrawnCare-Prawns_Farming_Management_System
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Create a `.env.local` file in the project root (see Environment variables below).

4. Run the dev server:

```bash
yarn dev
# or
npm run dev
```

5. Open the app at http://localhost:3000

## Backend

The backend code is maintained in a separate repository. It provides REST APIs for authentication, sensor ingestion, orders, and reports. Backend repo:

https://github.com/anjuparanagama/prawncare_backend.git

Follow the backend README for database migrations and seed data.

## Environment variables

Create a `.env.local` file with values similar to:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Adjust the URLs to point at your backend instance.

## Folder structure (important parts)

- `app/` — Next.js app router pages and layout
- `src/components/` — React components used across pages
- `public/` — Static images and assets

## Running tests & linting

If tests or linting are configured, run:

```bash
yarn test
yarn lint
```

## Contributing

Contributions are welcome. Please open an issue describing the change before sending a PR. Follow the repo's code style and run tests locally.

## License & contact

This project is provided under the MIT License. For questions or help, contact the maintainers or open an issue in the repository.

---

Backend repo: https://github.com/anjuparanagama/prawncare_backend.git
