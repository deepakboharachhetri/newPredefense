# Production-Ready Unified Web App

This is a production-ready web application that combines a landing page and dashboard interface.

## Features

- 🎨 Modern landing page with hero section, features, pricing, and testimonials
- 📊 Feature-rich dashboard with real-time widgets and analytics
- 🎯 Built with React 18, TypeScript, and Vite
- 💅 Styled with Tailwind CSS and shadcn/ui components
- 🚀 Optimized for production with code splitting and lazy loading
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
webapp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main app component with routing
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── dist/               # Production build output
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** React Router v7
- **State Management:** TanStack Query
- **Animations:** Framer Motion
- **Icons:** Lucide React

## License

MIT
