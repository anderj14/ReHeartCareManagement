# HeartCare Management System

HeartCare Management System is a comprehensive application built using React with TypeScript for the frontend and .NET for the backend. It follows a three-layer architecture: API, Core, and Infrastructure.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Patient management
- Blood tests tracking
- Echocardiograms and other cardiological tests management
- Medical history recording and more
- User authentication and authorization
- Responsive design

## Architecture
The application follows a three-layer architecture:
1. **API Layer**: Handles HTTP requests and responses, providing RESTful endpoints.
2. **Core Layer**: Contains the business logic and domain entities.
3. **Infrastructure Layer**: Manages data access, external services, and other infrastructure concerns.

## Prerequisites
- **Node.js**: v14.x or later
- **.NET SDK**: v6.x or later
- **SQL Server**: (or any other database you are using)

## Installation
### Backend (.NET)
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/heartcare-management-system.git
    ```
2. Navigate to the backend directory:
    ```sh
    cd heartcare-management-system/backend
    ```
3. Restore dependencies:
    ```sh
    dotnet restore
    ```
4. Update the database connection string in `appsettings.json`.
5. Apply migrations and update the database:
    ```sh
    dotnet ef database update
    ```
6. Run the application:
    ```sh
    dotnet run
    ```

### Frontend (React)
1. Navigate to the frontend directory:
    ```sh
    cd heartcare-management-system/frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the application:
    ```sh
    npm start
    ```

## Usage
1. Navigate to `http://localhost:3000` in your web browser to access the frontend application.
2. The API will be running at `http://localhost:5001` by default.

## Folder Structure
### Backend
- **API**: Contains controllers and API endpoints.
- **Core**: Contains business logic, domain entities, and interfaces.
- **Infrastructure**: Contains data access implementations, migrations, and other infrastructure-related code.

### Frontend
- **src**: Contains the source code for the React application.
  - **app**: Application-wide configurations and store setup.
  - **features**: Feature-specific components and state management.
  - **components**: Reusable UI components.
  - **models**: TypeScript models and interfaces.
  - **services**: API service calls.
  - **styles**: Application-wide styles.
