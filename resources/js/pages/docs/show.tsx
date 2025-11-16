import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, FileText } from 'lucide-react';
import 'highlight.js/styles/github.css';

interface Props {
    fileName: string;
    content: string;
    title: string;
}

export default function DocsShow({ fileName, content, title }: Props) {
    return (
        <>
            <Head title={`${title} - FIS Documentation`} />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <FileText className="h-8 w-8 text-blue-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                                    <p className="mt-1 text-sm text-gray-600">FIS Technical Documentation</p>
                                </div>
                            </div>
                            <Link
                                href="/docs"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                All Docs
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow">
                        <article className="prose prose-blue max-w-none p-8">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Custom styling for code blocks
                                    code: ({ node, className, children, ...props }: any) => {
                                        const inline = !className;
                                        return inline ? (
                                            <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm" {...props}>
                                                {children}
                                            </code>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    // Custom styling for tables
                                    table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200" {...props} />
                                        </div>
                                    ),
                                    th: ({ node, ...props }) => (
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props} />
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>

            <style>{`
                .prose {
                    color: #374151;
                }
                .prose h1 {
                    color: #111827;
                    font-size: 2.25rem;
                    font-weight: 700;
                    margin-top: 0;
                    margin-bottom: 1rem;
                }
                .prose h2 {
                    color: #1f2937;
                    font-size: 1.875rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 0.5rem;
                }
                .prose h3 {
                    color: #374151;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                .prose h4 {
                    color: #4b5563;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                }
                .prose p {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    line-height: 1.75;
                }
                .prose ul, .prose ol {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                }
                .prose li {
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .prose pre {
                    background-color: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .prose pre code {
                    background-color: transparent;
                    color: inherit;
                    padding: 0;
                }
                .prose blockquote {
                    border-left: 4px solid #3b82f6;
                    padding-left: 1rem;
                    color: #6b7280;
                    font-style: italic;
                    margin: 1rem 0;
                }
                .prose a {
                    color: #3b82f6;
                    text-decoration: underline;
                }
                .prose a:hover {
                    color: #2563eb;
                }
                .prose strong {
                    color: #111827;
                    font-weight: 600;
                }
                .prose table {
                    width: 100%;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
                .prose hr {
                    border-color: #e5e7eb;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                }
            `}</style>
        </>
    );
}
