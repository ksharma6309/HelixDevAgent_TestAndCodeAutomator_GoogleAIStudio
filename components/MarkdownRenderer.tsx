import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple parser to split code blocks from text
  // This is a lightweight alternative to full markdown libraries to keep deps low and control high
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 text-slate-300 leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // Extract language and code
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const language = match ? match[1] : '';
          const code = match ? match[2] : part.slice(3, -3);

          return (
            <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-700 my-4 bg-[#0d1117]">
              {language && (
                <div className="absolute top-0 right-0 px-2 py-1 text-xs font-mono text-slate-500 bg-slate-800 rounded-bl">
                  {language}
                </div>
              )}
              <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-100 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <code>{code}</code>
              </pre>
            </div>
          );
        } else {
          // Handle regular text with basic formatting
          return (
            <div key={index} className="whitespace-pre-wrap">
              {part.split('\n').map((line, i) => {
                // Basic Header parsing
                if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-indigo-400 mt-4 mb-2">{line.replace('### ', '')}</h3>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-indigo-300 mt-6 mb-3 pb-1 border-b border-slate-700">{line.replace('## ', '')}</h2>;
                if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mt-6 mb-4">{line.replace('# ', '')}</h1>;
                
                // Bullet points
                if (line.trim().startsWith('- ')) return <li key={i} className="ml-4 marker:text-indigo-500">{line.replace('- ', '')}</li>;
                
                // Bold text (simple regex for **text**)
                const boldParts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={i} className={line.trim() === '' ? 'h-2' : 'min-h-[1.5rem]'}>
                    {boldParts.map((bp, bpi) => 
                      bp.startsWith('**') && bp.endsWith('**') 
                        ? <strong key={bpi} className="text-white font-semibold">{bp.slice(2, -2)}</strong> 
                        : bp
                    )}
                  </p>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};