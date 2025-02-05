# Canvas Editor Application by VitOR

This is a simple, customizable canvas editor built with React, TypeScript, TailwindCSS, and Fabric.js. The application allows users to create posters by adding text, images, and backgrounds, as well as export the canvas to PNG format. The application is containerized using Docker for easy deployment.

---

## Features

- Add text, images, and background to the canvas.
- Export canvas as a PNG image with custom dimensions (1080px x 1350px).
- Responsive design for better usability.
- Custom modal for warnings and confirmations.

---

## How to Run

### Using Docker Compose

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Run the application with Docker Compose:
   ```bash
    docker-compose up
   ```
3. Open your browser and go to http://localhost:5173

### Using Yarn (Development)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   cd app
   ```
2. Install dependencies:
   ```bash
    yarn install
   ```
3. Start the development server:
   ```bash
    yarn dev
   ```
4. Open your browser and go to http://localhost:5173

---

## Built With

- React
- TypeScript
- Vite
- TailwindCSS
- Fabric.js
- Docker
