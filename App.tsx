import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { View } from './types';
import { Dashboard } from './views/Dashboard';
import { TestGenerator } from './views/TestGenerator';
import { Debugger } from './views/Debugger';
import { CodeReview } from './views/CodeReview';
import { LogAnalyzer } from './views/LogAnalyzer';
import { RefactorBot } from './views/RefactorBot';
import { DatabaseManager } from './views/DatabaseManager';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case View.TEST_GENERATOR:
        return <TestGenerator />;
      case View.DEBUGGER:
        return <Debugger />;
      case View.CODE_REVIEW:
        return <CodeReview />;
      case View.LOG_ANALYZER:
        return <LogAnalyzer />;
      case View.REFACTOR_BOT:
        return <RefactorBot />;
      case View.DATABASE:
        return <DatabaseManager />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full w-full relative">
         {/* Subtle background glow effects */}
         <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 -z-10 blur-3xl rounded-b-full pointer-events-none" />
        
        {renderView()}
      </main>
    </div>
  );
};

export default App;