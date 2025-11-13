#!/usr/bin/env node

/**
 * Test Script for University Landing Pages
 * Run: node test-api.js
 */

const BASE_URL = 'http://localhost:3000';

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(method, path, body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();
    
    if (response.ok) {
      log(`✓ ${method} ${path} - Success`, 'green');
      return { success: true, data };
    } else {
      log(`✗ ${method} ${path} - Failed (${response.status})`, 'red');
      return { success: false, data };
    }
  } catch (error) {
    log(`✗ ${method} ${path} - Error: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('\n🧪 Starting API Tests...\n', 'blue');
  
  // Test 1: Health Check
  log('Test 1: Health Check', 'yellow');
  await testEndpoint('GET', '/api/health');
  
  // Test 2: Get All Universities
  log('\nTest 2: Get All Universities', 'yellow');
  const universitiesResult = await testEndpoint('GET', '/api/universities');
  
  // Test 3: Get MIT Details
  log('\nTest 3: Get MIT Details', 'yellow');
  await testEndpoint('GET', '/api/universities/mit');
  
  // Test 4: Get Delhi University Details
  log('\nTest 4: Get Delhi University Details', 'yellow');
  await testEndpoint('GET', '/api/universities/delhi-university');
  
  // Test 5: Get Programs
  log('\nTest 5: Get Programs', 'yellow');
  await testEndpoint('GET', '/api/programs');
  
  // Test 6: Get Admissions Info
  log('\nTest 6: Get Admissions Info', 'yellow');
  await testEndpoint('GET', '/api/admissions');
  
  // Test 7: Get Statistics
  log('\nTest 7: Get Statistics', 'yellow');
  await testEndpoint('GET', '/api/statistics');
  
  // Test 8: Submit Lead
  log('\nTest 8: Submit Lead (POST)', 'yellow');
  const leadData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    program: 'Engineering',
    message: 'Test message',
    university: 'MIT'
  };
  await testEndpoint('POST', '/api/leads', leadData);
  
  // Test 9: Submit Application
  log('\nTest 9: Submit Application (POST)', 'yellow');
  const appData = {
    universityId: 'mit',
    studentName: 'John Doe',
    email: 'john@example.com',
    program: 'Computer Science'
  };
  await testEndpoint('POST', '/api/applications', appData);
  
  // Test 10: Invalid Endpoint (404)
  log('\nTest 10: Invalid Endpoint (404)', 'yellow');
  await testEndpoint('GET', '/api/invalid');
  
  log('\n✅ Tests Complete!\n', 'green');
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(BASE_URL);
    return response.ok;
  } catch {
    return false;
  }
}

(async () => {
  const isServerRunning = await checkServer();
  
  if (!isServerRunning) {
    log('\n❌ Error: API server is not running!', 'red');
    log('Please start the server first:', 'yellow');
    log('  cd api-backend', 'blue');
    log('  npm start\n', 'blue');
    process.exit(1);
  }
  
  await runTests();
})();
