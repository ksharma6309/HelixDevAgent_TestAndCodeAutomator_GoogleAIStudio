import React, { useState } from 'react';
import { analyzeLogs } from '../services/geminiService';
import { saveHistoryItem } from '../utils/storage';
import { View } from '../types';
import { Button } from '../components/Button';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { FileSearch, Activity } from 'lucide-react';

export const LogAnalyzer: React.FC = () => {
  const [logs, setLogs] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!logs.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const analysis = await analyzeLogs(logs);
      setResult(analysis);

      // Save to History
      saveHistoryItem({
          type: View.LOG_ANALYZER,
          input: logs,
          output: analysis
      });
    } catch (error) {
      console.error(error);
      setResult('Error analyzing logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4 max-h-[calc(100vh-4rem)]">
      <header className="flex-shrink-0">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                <FileSearch className="w-5 h-5" />
            </span>
            Automated Log Analyzer
        </h2>
        <p className="text-slate-400 mt-1">Parse, categorize, and resolve incidents from raw logs.</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className="flex flex-col space-y-4 h-full">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex-1 flex flex-col">
                <label className="text-sm font-medium text-slate-300 mb-2">Raw Log Data</label>
                <textarea
                    value={logs}
                    onChange={(e) => setLogs(e.target.value)}
                    placeholder="Paste server logs, stack traces, or incident reports..."
                    className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
            </div>
            <Button onClick={handleAnalyze} isLoading={loading} disabled={!logs.trim()} className="w-full py-3 bg-amber-600 hover:bg-amber-700 focus:ring-amber-500">
                <Activity className="w-4 h-4 mr-2" />
                Analyze Incident
            </Button>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col h-full overflow-hidden">
            <h3 className="font-semibold text-slate-200 mb-4 flex-shrink-0">Incident Report</h3>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {result ? (
                    <MarkdownRenderer content={result} />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                        <FileSearch size={48} className="mb-4" />
                        <p>Paste logs to start analysis</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
