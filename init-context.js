#!/usr/bin/env node

/**
 * PennyWings Budget Tracker - Context Initialization Script
 * 
 * This script generates a comprehensive context report before starting development.
 * It follows the workflow defined in .amazonq/rules/RULES.md
 * 
 * Usage: node init-context.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function printHeader(text) {
  console.log(`\n${colors.bright}${colors.magenta}${'='.repeat(80)}${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}${text.padStart((80 + text.length) / 2).padEnd(80)}${colors.reset}`);
  console.log(`${colors.bright}${colors.magenta}${'='.repeat(80)}${colors.reset}\n`);
}

function printSection(title) {
  console.log(`\n${colors.bright}${colors.cyan}## ${title}${colors.reset}`);
  console.log(`${colors.dim}${'─'.repeat(80)}${colors.reset}`);
}

function printItem(label, value, indent = 0) {
  const spacing = '  '.repeat(indent);
  console.log(`${spacing}${colors.green}${label}:${colors.reset} ${value}`);
}

function printList(items, indent = 0) {
  items.forEach(item => {
    const spacing = '  '.repeat(indent);
    console.log(`${spacing}${colors.yellow}•${colors.reset} ${item}`);
  });
}

function readPackageJson() {
  const packagePath = path.join(__dirname, 'package.json');
  return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

function checkFileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

function getDirectoryStructure(dir, prefix = '', maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) return [];

  const items = [];
  const fullPath = path.join(__dirname, dir);

  if (!fs.existsSync(fullPath)) return items;

  const files = fs.readdirSync(fullPath);
  const filtered = files.filter(f =>
    !f.startsWith('.') &&
    !['node_modules', 'dist', 'build'].includes(f)
  );

  filtered.forEach((file, index) => {
    const isLast = index === filtered.length - 1;
    const connector = isLast ? '└──' : '├──';
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      items.push(`${prefix}${connector} ${file}/`);
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      items.push(...getDirectoryStructure(path.join(dir, file), newPrefix, maxDepth, currentDepth + 1));
    } else {
      items.push(`${prefix}${connector} ${file}`);
    }
  });

  return items;
}

function analyzeCodebase() {
  printHeader('PENNYWINGS BUDGET TRACKER - CODEBASE CONTEXT');

  // 1. PROJECT OVERVIEW
  printSection('1. Project Overview');
  console.log(`
${colors.bright}PennyWings${colors.reset} is a personal finance management application built with React, 
Supabase (free tier), and Tailwind CSS. The app enables users to track income, 
expenses, budgets, financial goals, and account balances (bank cards and e-wallets) 
with real-time data synchronization and user authentication.

${colors.bright}Brand Identity:${colors.reset} Light pink aesthetic with butterfly theme
${colors.bright}Target Users:${colors.reset} Individuals seeking simple, beautiful budget tracking
${colors.bright}Deployment:${colors.reset} Live at https://penny-wings.netlify.app
  `);

  // 2. TECHNOLOGIES USED
  printSection('2. Technologies Used');

  const pkg = readPackageJson();

  console.log(`\n${colors.bright}Core Technologies:${colors.reset}`);
  printList([
    `React ${pkg.dependencies.react} - UI library with hooks`,
    `Vite ${pkg.devDependencies.vite} - Fast build tool and dev server`,
    'Supabase - Backend-as-a-Service (PostgreSQL, Auth, Real-time)',
    'Tailwind CSS - Utility-first CSS framework',
    'Lucide React - Icon library',
    'SweetAlert2 - Premium notifications',
  ], 1);

  console.log(`\n${colors.bright}Development Tools:${colors.reset}`);
  printList([
    `ESLint ${pkg.devDependencies.eslint} - Code linting`,
    '@vitejs/plugin-react - React Fast Refresh',
    'Supabase MCP Server - Backend management',
    'Netlify MCP - Deployment automation',
  ], 1);

  // 3. PROJECT STRUCTURE
  printSection('3. Project Structure');
  console.log('');
  const structure = getDirectoryStructure('.', '', 2);
  structure.forEach(line => console.log(line));

  // 4. CURRENT STATE
  printSection('4. Current State');

  const setupChecks = [
    { name: 'React + Vite boilerplate', file: 'vite.config.js', status: true },
    { name: 'ESLint configuration', file: 'eslint.config.js', status: true },
    { name: 'Supabase client setup', file: 'src/lib/supabase.js', status: checkFileExists('src/lib/supabase.js') },
    { name: 'Tailwind CSS config', file: 'tailwind.config.js', status: checkFileExists('tailwind.config.js') },
    { name: 'Authentication system', file: 'src/contexts/AuthContext.jsx', status: checkFileExists('src/contexts/AuthContext.jsx') },
    { name: 'React Router setup', file: 'src/App.jsx', status: checkFileExists('src/App.jsx') },
    { name: 'Dashboard component', file: 'src/pages/Dashboard.jsx', status: checkFileExists('src/pages/Dashboard.jsx') },
    { name: 'Accounts module', file: 'src/pages/Accounts.jsx', status: checkFileExists('src/pages/Accounts.jsx') },
    { name: 'Transactions module', file: 'src/pages/Transactions.jsx', status: checkFileExists('src/pages/Transactions.jsx') },
  ];

  console.log(`\n${colors.bright}Setup Status:${colors.reset}\n`);
  setupChecks.forEach(check => {
    const icon = check.status ? '✅' : '❌';
    const status = check.status ? colors.green + 'READY' : colors.yellow + 'MISSING';
    console.log(`  ${icon} ${check.name.padEnd(30)} ${status}${colors.reset}`);
  });

  // 5. AVAILABLE SCRIPTS
  printSection('5. Available Scripts');
  console.log('');
  Object.entries(pkg.scripts).forEach(([name, command]) => {
    printItem(`npm run ${name}`, command, 1);
  });

  // 6. ENVIRONMENT SETUP
  printSection('6. Environment Setup');

  const envExists = checkFileExists('.env.local');
  console.log(`\n${colors.bright}Environment Variables:${colors.reset}`);
  if (envExists) {
    console.log(`  ${colors.green}✓${colors.reset} .env.local file exists`);
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} .env.local file not found`);
    console.log(`\n  ${colors.dim}Create .env.local with:${colors.reset}`);
    console.log(`  ${colors.dim}VITE_SUPABASE_URL=your_project_url${colors.reset}`);
    console.log(`  ${colors.dim}VITE_SUPABASE_ANON_KEY=your_anon_key${colors.reset}`);
  }

  // 7. DEVELOPMENT WORKFLOW
  printSection('7. Development Workflow (from RULES.md)');
  console.log(`
${colors.bright}Phase 1: Codebase Context${colors.reset}
  → Inspect and understand the current state
  → Identify relevant files and patterns

${colors.bright}Phase 2: Task Understanding${colors.reset}
  → Define the task clearly
  → Identify dependencies and risks

${colors.bright}Phase 3: Execution Plan${colors.reset}
  → Break work into clear phases
  → Identify files to create/modify
  → Consider module dependencies

${colors.bright}Phase 4: Progress Tracking${colors.reset}
  → Maintain status: ⏸️ Not started | 🔄 In progress | ✅ Completed | 🚫 Blocked
  → Update TASK-PROGRESS.md
  `);

  // 8. SYSTEM ARCHITECTURE
  printSection('8. System Architecture');
  console.log(`
${colors.bright}Core Modules:${colors.reset}
  1. Authentication Layer → Supabase Auth (login/signup/protected routes)
  2. Accounts Module → Unified AccountWizard (Banks & E-Wallets)
  3. Transactions Module → Income/expense tracking linked to accounts
  4. Goals Module → Savings goals and progress tracking
  5. Dashboard → Overview and analytics with real-time net worth

${colors.bright}Data Flow Pattern:${colors.reset}
  User Action → React Component → Supabase Client → PostgreSQL + RLS → Real-time Sync

${colors.bright}Design System:${colors.reset}
  • Theme: Light pink aesthetic (#FFC0CB, #FFB6C1, #FFF0F5)
  • Framework: Tailwind CSS with custom pink palette
  • Icons: Lucide React
  • Notifications: SweetAlert2
  • Components: Card-based UI, mobile-first responsive
  `);

  // 9. TASK PROGRESS SUMMARY
  printSection('9. Task Progress Summary');

  const phases = [
    { name: 'Phase 1: Foundation', status: '✅ COMPLETED' },
    { name: 'Phase 2: Authentication', status: '✅ COMPLETED' },
    { name: 'Phase 3: Database Schema', status: '✅ COMPLETED' },
    { name: 'Phase 4: Accounts Module', status: '✅ COMPLETED' },
    { name: 'Phase 5: Transactions Module', status: '✅ COMPLETED' },
    { name: 'Phase 6: Budgets & Goals', status: '⏸️ ON HOLD' },
    { name: 'Phase 7: Dashboard', status: '✅ COMPLETED' },
    { name: 'Phase 8: Enhancements', status: '⏸️ ON HOLD' },
  ];

  console.log('');
  phases.forEach(phase => {
    console.log(`  ${phase.status.padEnd(20)} ${phase.name}`);
  });

  // 10. NEXT STEPS
  printSection('10. Next Steps');
  console.log(`
${colors.bright}Before Starting Development:${colors.reset}

  1. ${colors.cyan}Review Context${colors.reset}
     → Read CONTEXT.md for detailed project information
     → Review TASK-PROGRESS.md for current status
     → Check DEPLOYMENT.md for deployment guidelines

  2. ${colors.cyan}Define Your Task${colors.reset}
     → What feature/module are you building?
     → What is the current state?
     → What are the dependencies?

  3. ${colors.cyan}Create Execution Plan${colors.reset}
     → Break task into clear steps
     → Identify files to create/modify
     → Consider integration points

  4. ${colors.cyan}Start Development${colors.reset}
     → Run: npm run dev
     → Follow the plan
     → Update TASK-PROGRESS.md

${colors.bright}Quick Commands:${colors.reset}
  ${colors.green}npm run dev${colors.reset}      → Start development server
  ${colors.green}npm run build${colors.reset}    → Build for production
  ${colors.green}npm run lint${colors.reset}     → Run ESLint

${colors.bright}Documentation:${colors.reset}
  • .amazonq/rules/CONTEXT.md → Full project context
  • .amazonq/rules/RULES.md → Development workflow
  • .amazonq/rules/TASK-PROGRESS.md → Task tracking
  • .amazonq/rules/DEPLOYMENT.md → Deployment guide
  `);

  // FOOTER
  printHeader('CONTEXT INITIALIZATION COMPLETE');
  console.log(`${colors.dim}You are now ready to start development following the established workflow.${colors.reset}\n`);
}

// Run the analysis
try {
  analyzeCodebase();
} catch (error) {
  console.error(`${colors.bright}${colors.yellow}Error:${colors.reset}`, error.message);
  process.exit(1);
}
