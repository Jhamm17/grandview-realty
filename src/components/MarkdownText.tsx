import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownTextProps {
  content: string;
  className?: string;
}

export default function MarkdownText({ content, className = '' }: MarkdownTextProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Preserve line breaks
          p: ({ children }) => <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1em' }}>{children}</p>,
          // Style headings
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
          // Style lists
          ul: ({ children }) => <ul className="list-disc list-inside mb-2 ml-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 ml-4">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          // Style links
          a: ({ href, children }) => (
            <a href={href} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          // Style strong/bold
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          // Style emphasis/italic
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

