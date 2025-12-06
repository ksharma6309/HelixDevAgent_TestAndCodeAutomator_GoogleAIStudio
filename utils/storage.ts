import { HistoryItem, View } from '../types';

const STORAGE_KEY = 'devagent_db_v1';

export const getHistory = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const saveHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      timestamp: Date.now(),
    };
    // Keep last 100 items
    const updated = [newItem, ...history].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.error("Failed to save item", e);
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const importHistory = (items: HistoryItem[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return true;
    } catch (e) {
        console.error("Failed to import DB", e);
        return false;
    }
};

export const getStats = () => {
  const history = getHistory();
  return {
    total: history.length,
    tests: history.filter(h => h.type === View.TEST_GENERATOR).length,
    bugs: history.filter(h => h.type === View.DEBUGGER).length,
    reviews: history.filter(h => h.type === View.CODE_REVIEW).length,
    refactors: history.filter(h => h.type === View.REFACTOR_BOT).length,
    logs: history.filter(h => h.type === View.LOG_ANALYZER).length,
  };
};