const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Build script for the API backend
 * This script validates the setup and prepares for production deployment
 */

console.log('🔨 Building API backend for production...');

// Check if required files exist
const serverPath = path.join(__dirname, '../server.js');
const packagePath = path.join(__dirname, '../package.json');
const envPath = path.join(__dirname, '../../.env');

if (!fs.existsSync(serverPath)) {
    console.error('❌ Error: server.js not found!');
    process.exit(1);
}

if (!fs.existsSync(packagePath)) {
    console.error('❌ Error: package.json not found!');
    process.exit(1);
}

console.log('✅ server.js found');
console.log('✅ package.json found');

// Check .env file
if (fs.existsSync(envPath)) {
    console.log('✅ .env file found at root');
} else {
    console.warn('⚠️  Warning: .env file not found. Make sure to set environment variables in production.');
}

// Validate package.json
try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log(`✅ Package: ${packageJson.name} v${packageJson.version}`);
    console.log(`✅ Author: ${packageJson.author}`);
} catch (error) {
    console.error('❌ Error: Invalid package.json');
    process.exit(1);
}

// Check dependencies
console.log('📦 Checking dependencies...');
const nodeModulesPath = path.join(__dirname, '../node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.error('❌ Error: node_modules not found. Run "npm install" first.');
    process.exit(1);
}

console.log('✅ Dependencies installed');

// Create dist directory for production
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('📁 Created dist directory');
}

// Copy server files to dist
try {
    fs.copyFileSync(serverPath, path.join(distDir, 'server.js'));
    fs.copyFileSync(packagePath, path.join(distDir, 'package.json'));
    console.log('📋 Copied files to dist/');
} catch (error) {
    console.error('❌ Error copying files:', error.message);
    process.exit(1);
}

// Create .env.example for reference
const envExamplePath = path.join(__dirname, '../.env.example');
if (!fs.existsSync(envExamplePath)) {
    const envContent = `PORT=3000
NODE_ENV=production
# Add other environment variables here
`;
    fs.writeFileSync(envExamplePath, envContent);
    console.log('📄 Created .env.example');
}

// Build success
console.log('\n🎉 Build completed successfully!');
console.log('📌 Ready for deployment');
console.log(`📂 Output: ${distDir}`);
console.log('\n💡 To start the server:');
console.log('   npm start');
console.log('\n💡 For development with auto-reload:');
console.log('   npm run dev');

