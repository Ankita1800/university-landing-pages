const fs = require('fs');
const path = require('path');

/**
 * Build script for the API backend
 * This script can be used to prepare the application for production
 */

console.log('Starting build process...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('Created dist directory');
}

// Copy server files
const serverFile = path.join(__dirname, '../server.js');
const distServerFile = path.join(distDir, 'server.js');

try {
    fs.copyFileSync(serverFile, distServerFile);
    console.log('Copied server.js to dist/');
} catch (error) {
    console.error('Error copying server.js:', error.message);
}

// Check for package.json
const packageJsonPath = path.join(__dirname, '../package.json');
if (fs.existsSync(packageJsonPath)) {
    const distPackageJson = path.join(distDir, 'package.json');
    fs.copyFileSync(packageJsonPath, distPackageJson);
    console.log('Copied package.json to dist/');
} else {
    console.warn('No package.json found. Creating a basic one...');
    
    const basicPackageJson = {
        name: 'kollege-apply-backend',
        version: '1.0.0',
        description: 'Backend API for university landing pages',
        main: 'server.js',
        scripts: {
            start: 'node server.js',
            dev: 'nodemon server.js'
        },
        dependencies: {
            express: '^4.18.2',
            cors: '^2.8.5'
        },
        devDependencies: {
            nodemon: '^3.0.1'
        }
    };
    
    fs.writeFileSync(
        path.join(distDir, 'package.json'),
        JSON.stringify(basicPackageJson, null, 2)
    );
    console.log('Created package.json in dist/');
}

// Create .env.example if it doesn't exist
const envExample = path.join(__dirname, '../.env.example');
if (!fs.existsSync(envExample)) {
    const envContent = `PORT=3000
NODE_ENV=production
`;
    fs.writeFileSync(envExample, envContent);
    console.log('Created .env.example');
}

console.log('\nBuild completed successfully!');
console.log(`Output directory: ${distDir}`);
console.log('\nNext steps:');
console.log('1. cd to the dist directory');
console.log('2. Run: npm install');
console.log('3. Run: npm start');
