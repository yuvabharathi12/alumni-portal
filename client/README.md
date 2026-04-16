# Alumni Portal - Frontend Client

This is the React frontend for the Alumni Portal application.

## 🛠️ Tech Stack

- **React 19:** Built using modern functional components. All components use the `.jsx` file extension for robust structural typing and better IDE support.
- **Styling:** CSS Modules (`.module.css`) are used exclusively for scoped, component-level styling to prevent CSS conflicts and maintain a pristine design system.
- **Routing:** React Router v7.
- **HTTP Client:** Axios for API requests, featuring automatic environment-based base URL routing and token interception.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation

From the `client/` directory, run:
```bash
npm install
```

### Running Locally

```bash
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**Note on Backend API Connection:**
You do **NOT** need to create a `.env` file or manually configure API URLs for local development. The frontend's API client (`src/services/api.js`) is natively configured to detect your environment:
- When running locally (`npm start`), it will automatically connect to your local backend at `http://localhost:5000/api`.
- When built for production, it will automatically connect to the live Railway production endpoint.
