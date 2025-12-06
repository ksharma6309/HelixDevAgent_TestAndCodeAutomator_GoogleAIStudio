import React, { useEffect, useState } from 'react';
import { View } from '../types';
import { getStats } from '../utils/storage';
import { 
    Activity, 
    CheckCircle2, 
    AlertTriangle, 
    Clock, 
    Zap,
    ArrowUpRight,
    Database
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    // Refresh stats on mount
    setStats(getStats());
  }, []);

  // Transform stats for the chart (Simple visualization for now)
  const chartData = [
    { name: 'Tests', count: stats.tests },
    { name: 'Debugs', count: stats.bugs },
    { name: 'Reviews', count: stats.reviews },
    { name: 'Refactor', count: stats.refactors },
    { name: 'Logs', count: stats.logs },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
        <header className="mb-8 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">DevAgent Dashboard</h1>
                <p className="text-slate-400">Real-time overview of your AI-driven development lifecycle.</p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                <Database size={12} className="text-emerald-500" />
                <span>Local Storage Active</span>
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-sm backdrop-blur-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Tests Generated</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{stats.tests}</h3>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <CheckCircle2 size={24} />
                    </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-500">
                   Total sessions recorded
                </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-sm backdrop-blur-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Bugs Resolved</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{stats.bugs}</h3>
                    </div>
                    <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                        <AlertTriangle size={24} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-slate-500">
                   Debug sessions completed
                </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-sm backdrop-blur-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Code Reviews</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{stats.reviews}</h3>
                    </div>
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                        <Activity size={24} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-slate-500">
                   Audits performed
                </div>
            </div>

             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-sm backdrop-blur-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 text-sm font-medium">Refactor Ops</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{stats.refactors}</h3>
                    </div>
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Zap size={24} />
                    </div>
                </div>
                 <div className="mt-4 flex items-center text-xs text-slate-500">
                   Optimizations applied
                </div>
            </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-6">Activity Distribution</h3>
                <div className="h-64 w-full">
                    {stats.total > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" allowDecimals={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                    cursor={{fill: '#334155', opacity: 0.4}}
                                />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} name="Operations" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                         <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                            <Database size={48} className="mb-4" />
                            <p>No activity recorded yet. Start using the tools!</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    <button 
                        onClick={() => onNavigate(View.TEST_GENERATOR)}
                        className="w-full text-left p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 hover:border-indigo-500 transition-all group"
                    >
                        <h4 className="font-medium text-slate-200 group-hover:text-indigo-300">New Test Suite</h4>
                        <p className="text-sm text-slate-500">Generate unit tests from snippet</p>
                    </button>
                    <button 
                        onClick={() => onNavigate(View.DEBUGGER)}
                        className="w-full text-left p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 hover:border-rose-500 transition-all group"
                    >
                        <h4 className="font-medium text-slate-200 group-hover:text-rose-300">Debug Incident</h4>
                        <p className="text-sm text-slate-500">Analyze error logs & code</p>
                    </button>
                    <button 
                         onClick={() => onNavigate(View.CODE_REVIEW)}
                        className="w-full text-left p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 hover:border-emerald-500 transition-all group"
                    >
                        <h4 className="font-medium text-slate-200 group-hover:text-emerald-300">Quick Audit</h4>
                        <p className="text-sm text-slate-500">Security & Style check</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};
