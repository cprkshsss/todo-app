# Todo App

A modern, responsive Todo application built with React, TypeScript, and Vite. Features include adding, editing, and managing todo items with a clean and intuitive user interface.

## Features

- ✅ Create new todo items
- ✅ Mark todos as complete/incomplete
- ✅ Delete todo items
- ✅ Real-time progress tracking
- ✅ Responsive design with CSS modules
- ✅ Built with TypeScript for type safety
- ✅ Fast development with Vite

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules
- **Linting:** ESLint

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo
```

### 2. Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including React, Vite, TypeScript, and ESLint.

### 3. Verify Installation

Check that everything is installed correctly:

```bash
npm --version
node --version
```

## Running the Project

### Development Mode

Start the development server with hot module reload (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This generates a `dist` folder with all optimized files ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Lint Code

Check for code quality issues:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint -- --fix
```

## Project Structure

```
todo/
├── src/
│   ├── App.tsx              # Main application component
│   ├── App.css              # App styles
│   ├── TodoForm.tsx         # Form component for adding todos
│   ├── TodoForm.module.css  # TodoForm styles
│   ├── TodoItem.tsx         # Individual todo item component
│   ├── TodoItem.module.css  # TodoItem styles
│   ├── ProgressBar.tsx      # Progress tracker component
│   ├── ProgressBar.module.css # ProgressBar styles
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## Deployment

The project is configured for subdirectory deployment at `/todo/`:

### Steps to Deploy to cPanel:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload contents of `dist` folder to `public_html/todo` on your cPanel server

3. The app will be live at `yourdomain.com/todo`

For more deployment options, see the Vite [deployment guide](https://vite.dev/guide/static-deploy.html).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Module not found errors
```bash
npm install
```

### Clear node_modules and reinstall
```bash
rm -r node_modules
npm install
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Commit with clear messages
4. Push to your branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the documentation or create an issue in the repository.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
