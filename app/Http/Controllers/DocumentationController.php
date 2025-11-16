<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DocumentationController extends Controller
{
    /**
     * Display the documentation index page
     */
    public function index()
    {
        $docsPath = base_path('docs');
        
        // Get all markdown files
        $files = [];
        if (File::exists($docsPath)) {
            $markdownFiles = File::files($docsPath);
            foreach ($markdownFiles as $file) {
                if ($file->getExtension() === 'md') {
                    $files[] = [
                        'name' => $file->getFilenameWithoutExtension(),
                        'path' => $file->getFilename(),
                        'size' => $file->getSize(),
                        'modified' => date('Y-m-d H:i:s', $file->getMTime())
                    ];
                }
            }
        }
        
        return Inertia::render('docs/index', [
            'files' => $files
        ]);
    }
    
    /**
     * Display a specific documentation file
     */
    public function show($file)
    {
        $filePath = base_path("docs/{$file}.md");
        
        if (!File::exists($filePath)) {
            abort(404, 'Documentation file not found');
        }
        
        $content = File::get($filePath);
        
        return Inertia::render('docs/show', [
            'fileName' => $file,
            'content' => $content,
            'title' => $this->formatTitle($file)
        ]);
    }
    
    /**
     * Format file name to readable title
     */
    private function formatTitle($fileName)
    {
        return str_replace(['_', '-'], ' ', ucwords($fileName, '_-'));
    }
}
