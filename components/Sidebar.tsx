import React from 'react';
import { View, NavItem } from '../types';
import { 
  LayoutDashboard, 
  TestTube2, 
  Bug, 
  ShieldCheck, 
  FileSearch, 
  Wrench,
  Bot,
  Database
} from 'lucide-react';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems: NavItem[] = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} />, description: 'Overview' },
    { id: View.TEST_GENERATOR, label: 'Test Gen', icon: <TestTube2 size={20} />, description: 'Generate Tests' },
    { id: View.DEBUGGER, label: 'Debugger', icon: <Bug size={20} />, description: 'Fix Issues' },
    { id: View.CODE_REVIEW, label: 'Code Review', icon: <ShieldCheck size={20} />, description: 'Audit Code' },
    { id: View.LOG_ANALYZER, label: 'Log Analyzer', icon: <FileSearch size={20} />, description: 'Parse Logs' },
    { id: View.REFACTOR_BOT, label: 'Refactor Bot', icon: <Wrench size={20} />, description: 'Optimize Code' },
    { id: View.DATABASE, label: 'Database', icon: <Database size={20} />, description: 'Manage Data' },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="p-2 bg-indigo-600 rounded-lg">
            <Bot className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          DevAgent
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  currentView === item.id 
                    ? 'bg-indigo-600/10 text-indigo-400 border-l-4 border-indigo-500' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border-l-4 border-transparent'
                }`}
              >
                <span className={currentView === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500">
          <p>Created By Khushboo Sharma</p>
        </div>
      </div>
    </aside>
  );
};