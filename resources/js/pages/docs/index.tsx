import { Head, Link } from '@inertiajs/react';
import { FileText, Clock, HardDrive } from 'lucide-react';

interface DocFile {
    name: string;
    path: string;
    size: number;
    modified: string;
}

interface Props {
    files: DocFile[];
}

export default function DocsIndex({ files }: Props) {
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <>
            <Head title="FIS Documentation" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">FIS Documentation</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Flight Information System - Technical Documentation
                                </p>
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Available Documents</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                {files.length} document{files.length !== 1 ? 's' : ''} available
                            </p>
                        </div>

                        <div className="divide-y">
                            {files.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No documentation files found
                                </div>
                            ) : (
                                files.map((file) => (
                                    <Link
                                        key={file.path}
                                        href={`/docs/${file.name}`}
                                        className="block p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start">
                                            <FileText className="h-6 w-6 text-blue-600 mt-1" />
                                            <div className="ml-4 flex-1">
                                                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                                                    {file.name.replace(/_/g, ' ').replace(/-/g, ' ')}
                                                </h3>
                                                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <HardDrive className="h-4 w-4 mr-1" />
                                                        {formatFileSize(file.size)}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1" />
                                                        Last modified: {new Date(file.modified).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <span className="inline-flex items-center text-blue-600">
                                                    View →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
