# 🦋 PennyWings Budget Tracker

> A beautiful, pink-themed personal finance management application built with React, Supabase, and Tailwind CSS.

**Live Demo:** [penny-wings.netlify.app](https://penny-wings.netlify.app)

---

## 📋 Before You Start

**IMPORTANT:** This project follows a structured development workflow. Before writing any code or implementing features, you must first generate the codebase context.

### Why Context First?

Following the workflow defined in `.amazonq/rules/RULES.md`, we ensure:
- ✅ Clear understanding of the current codebase state
- ✅ Proper identification of relevant files and patterns
- ✅ Well-defined tasks with clear dependencies
- ✅ Structured execution plans before implementation
- ✅ Progress tracking throughout development

---

## 🚀 Quick Start

### 1. Generate Codebase Context

**Run this command FIRST before any development:**

```bash
npm run context
```

This will display:
- 📊 Project overview and purpose
- 🛠️ Technologies and tools being used
- 📁 Current project structure
- ✅ Setup status (what's ready, what's missing)
- 📝 Available npm scripts
- 🏗️ System architecture overview
- 📈 Task progress summary
- 🎯 Next steps for development

### 2. Review Documentation

After running the context script, review these files:

```bash
.amazonq/rules/
├── CONTEXT.md          # Full project context and technical details
├── RULES.md            # Development workflow rules
├── TASK-PROGRESS.md    # Current task status and history
└── DEPLOYMENT.md       # Deployment guidelines
```

### 3. Start Development

Once you understand the context:

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

---

## 📖 Development Workflow

### Phase 1: Codebase Context ✅
- Inspect the codebase and understand current state
- Identify relevant files, patterns, and conventions
- Review existing components and utilities

### Phase 2: Task Understanding 📝
- Define the task to be completed
- Identify current state of relevant features
- List assumptions, dependencies, and risks
- Note any missing information or blockers

### Phase 3: Execution Plan 🗺️
- Break work into clear phases
- Identify files to create or modify
- Explain why each step is necessary
- Consider dependencies between modules
- Include validation and testing strategy

### Phase 4: Progress Tracking 📊
- Maintain running status:
  - ⏸️ Not started
  - 🔄 In progress
  - ✅ Completed
  - 🚫 Blocked
- Update `TASK-PROGRESS.md` as you work

---

## 🏗️ Project Architecture

### Core Modules

1. **Authentication Layer** - Supabase Auth (login/signup/protected routes)
2. **Accounts Module** - Unified AccountWizard (Digital/Traditional Banks, E-Wallets)
3. **Transactions Module** - Income/expense tracking linked to accounts
4. **Goals Module** - Savings goals and progress tracking
5. **Dashboard** - Overview and analytics with real-time net worth

### Data Flow

```
User Action → React Component → Supabase Client → PostgreSQL + RLS → Real-time Sync
```

### Design System

- **Theme:** Light pink aesthetic (#FFC0CB, #FFB6C1, #FFF0F5)
- **Framework:** Tailwind CSS with custom pink color palette
- **Icons:** Lucide React for consistent, theme-aware iconography
- **Notifications:** SweetAlert2 for premium, themed dialogs
- **Components:** Card-based UI with mobile-first responsive design
- **Accessibility:** WCAG compliant contrast ratios on pink backgrounds

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2.4** - UI library with hooks and modern features
- **Vite 8.0.0** - Fast build tool and dev server with HMR
- **Supabase** - Backend-as-a-Service (PostgreSQL, Auth, Real-time, Storage)
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - High-quality, consistent icon library
- **SweetAlert2** - Premium, customizable notification system
- **React Router** - Client-side routing
- **Recharts** - Data visualization library
- **date-fns** - Modern date utility library

### Development Tools
- **ESLint** - Code linting with React-specific rules
- **@vitejs/plugin-react** - React Fast Refresh support
- **Supabase MCP Server** - Infrastructure and backend management
- **Netlify MCP** - Automated deployment and site management

---

## 📁 Project Structure

```
BudgetTrackerSuperbase/
├── .amazonq/
│   └── rules/              # AI assistant rules and context
│       ├── CONTEXT.md      # Full project context
│       ├── RULES.md        # Development workflow
│       ├── TASK-PROGRESS.md # Task tracking
│       └── DEPLOYMENT.md   # Deployment guide
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/             # Images and static files
│   ├── components/         # React components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Supabase client and utilities
│   ├── pages/              # Page components
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles and Tailwind
│   └── main.jsx            # React entry point
├── .env.local              # Environment variables (not in git)
├── .gitignore
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── init-context.js         # Context initialization script
├── netlify.toml            # Netlify deployment config
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

---

## ⚙️ Environment Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BudgetTrackerSuperbase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Generate context (IMPORTANT)**
   ```bash
   npm run context
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

---

## 🎨 Design Guidelines

### Color Palette

```css
/* Light Mode */
--pink-50: #fff0f5;   /* Lavender Blush - backgrounds */
--pink-100: #ffe4e9;  /* Very light pink - cards */
--pink-200: #ffb6c1;  /* Light Pink - borders */
--pink-300: #ffc0cb;  /* Pink - primary */
--pink-400: #ff9ead;  /* Medium pink - hover states */
--pink-500: #ff7a93;  /* Deep pink - accents */
--pink-600: #e85d7a;  /* Rose - CTAs */
```

### Component Patterns
- **Cards:** White/light pink background, subtle shadow, rounded corners
- **Buttons:** Pink gradient, white text, hover effects
- **Forms:** Light pink borders, focus states with deeper pink
- **Bank Cards:** Card-like UI with custom colors, balance display
- **E-Wallets:** Wallet-like UI with custom colors, balance display

---

## 📊 Current Progress

### Completed ✅
- Foundation (Supabase + Tailwind + Structure)
- Authentication System (Login, Signup, Password Reset)
- Database Schema with RLS policies
- Accounts Module (Unified AccountWizard)
- Transactions Module (Income/Expense/Withdrawal)
- Dashboard (Overview, Analytics, Recent Activity)
- Data Visualization (Charts and Reports)

### In Progress 🔄
- Goals Tracking Module
- Export Functionality (CSV/PDF)
- Real-time Sync Enhancements

### Planned ⏸️
- Advanced Filtering
- Performance Optimizations
- Dark Mode Implementation

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Netlify

The project is configured for automatic deployment via Netlify MCP:

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables:** Set in Netlify dashboard

See `.amazonq/rules/DEPLOYMENT.md` for detailed deployment instructions.

---

## 📚 Documentation

- **[CONTEXT.md](.amazonq/rules/CONTEXT.md)** - Comprehensive project context
- **[RULES.md](.amazonq/rules/RULES.md)** - Development workflow rules
- **[TASK-PROGRESS.md](.amazonq/rules/TASK-PROGRESS.md)** - Task tracking and history
- **[DEPLOYMENT.md](.amazonq/rules/DEPLOYMENT.md)** - Deployment guidelines

---

## 🤝 Contributing

1. **Always run `npm run context` first** to understand the current state
2. Follow the workflow defined in `RULES.md`
3. Update `TASK-PROGRESS.md` with your changes
4. Maintain the pink color palette and design system
5. Write clean, documented code following existing patterns

---

## 📝 License

This project is private and proprietary.

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Netlify](https://www.netlify.com/)

---

## 📞 Support

For questions or issues, please refer to the documentation in `.amazonq/rules/` or contact the development team.

---

**Remember:** Always run `npm run context` before starting any development work! 🦋
