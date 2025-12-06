import React from 'react';

export enum View {
  DASHBOARD = 'DASHBOARD',
  TEST_GENERATOR = 'TEST_GENERATOR',
  DEBUGGER = 'DEBUGGER',
  CODE_REVIEW = 'CODE_REVIEW',
  LOG_ANALYZER = 'LOG_ANALYZER',
  REFACTOR_BOT = 'REFACTOR_BOT',
  DATABASE = 'DATABASE',
}

export interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  message: string;
}

export interface AnalysisResult {
  markdown: string;
  timestamp: Date;
}

export interface HistoryItem {
  id: string;
  type: View;
  input: string;
  output: string;
  timestamp: number;
  metadata?: Record<string, any>;
}