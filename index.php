<?php
// Simple PHP router for portfolio
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);

// Handle /portfolio route
if ($path === '/portfolio' || $path === '/portfolio/') {
    include 'portfolio/index.html';
    exit;
}

// Handle /portfolio/ subpaths
if (strpos($path, '/portfolio/') === 0) {
    $file = substr($path, 10); // Remove '/portfolio/' prefix
    $filePath = 'portfolio/' . $file;
    
    if (file_exists($filePath)) {
        // Set appropriate content type
        $extension = pathinfo($filePath, PATHINFO_EXTENSION);
        switch ($extension) {
            case 'css':
                header('Content-Type: text/css');
                break;
            case 'js':
                header('Content-Type: application/javascript');
                break;
            case 'png':
                header('Content-Type: image/png');
                break;
            case 'jpg':
            case 'jpeg':
                header('Content-Type: image/jpeg');
                break;
            case 'mp4':
                header('Content-Type: video/mp4');
                break;
            case 'html':
                header('Content-Type: text/html');
                break;
        }
        readfile($filePath);
        exit;
    }
}

// Default: show main portfolio page
include 'portfolio/index.html';
?>
