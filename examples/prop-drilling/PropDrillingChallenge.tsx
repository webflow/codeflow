import React, { useState } from 'react';

// ==========================================
// Candidate Task: Refactor this using Context
// ==========================================

const UserInfo = ({ user }: { user: { name: string; email: string } }) => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
      {user.name.charAt(0)}
    </div>
    <span className="font-medium">{user.name}</span>
  </div>
);

const Header = ({ user }: { user: { name: string; email: string } }) => (
  <header className="p-4 bg-slate-100 dark:bg-slate-800 border-b flex justify-between items-center">
    <h1 className="text-xl font-bold">Dashboard</h1>
    <UserInfo user={user} />
  </header>
);

const ThemeToggle = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <button
    onClick={toggleTheme}
    className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
  >
    Toggle Theme (Current: {theme})
  </button>
);

const Sidebar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => (
  <aside className="w-64 p-4 border-r bg-slate-50 dark:bg-slate-900 h-full flex flex-col gap-4">
    <h2 className="font-semibold text-lg">Settings</h2>
    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
  </aside>
);

const Content = ({ user }: { user: { name: string; email: string } }) => (
  <div className="p-8 flex-1">
    <h2 className="text-2xl font-bold mb-4">Welcome back, {user.name}!</h2>
    <p className="text-slate-600 dark:text-slate-400">
      This is a deeply nested component structure. Currently, the user object and theme state are being passed down multiple levels via props.
    </p>
    <p className="text-slate-600 dark:text-slate-400 mt-2">
      Your task is to refactor this code to use the React Context API and avoid prop drilling!
    </p>
  </div>
);

const MainLayout = ({
  user,
  theme,
  toggleTheme
}: {
  user: { name: string; email: string };
  theme: string;
  toggleTheme: () => void
}) => (
  <div className="flex flex-1 overflow-hidden">
    <Sidebar theme={theme} toggleTheme={toggleTheme} />
    <Content user={user} />
  </div>
);

export default function PropDrillingChallenge() {
  const [user] = useState({ name: 'Alex Developer', email: 'alex@example.com' });
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`h-full flex flex-col ${theme === 'dark' ? 'dark bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header user={user} />
      <MainLayout user={user} theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}
