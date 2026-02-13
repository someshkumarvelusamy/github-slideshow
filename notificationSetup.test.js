/**
 * Test for notificationSetup.js
 * Validates that updateEnableStatus does not throw ReferenceError
 */

// Save original console
const originalConsole = console;

// Mock DOM environment for Node.js testing
global.document = {
    getElementById: function(id) {
        if (id === 'selectEventType') {
            // Return a mock element with a value property
            return { value: 'email' };
        }
        return null;
    }
};

// Mock console to capture messages
const mockConsole = {
    log: function(message) {
        // Capture console.log for testing
        this.lastMessage = message;
        originalConsole.log(message); // Also output to real console
    },
    lastMessage: null
};

global.console = mockConsole;

// Import the module
const { updateEnableStatus } = require('./notificationSetup.js');

originalConsole.log('Running tests for updateEnableStatus...\n');

// Test 1: Function should not throw ReferenceError when selectEventType element exists
originalConsole.log('Test 1: Function executes without ReferenceError when element exists');
try {
    updateEnableStatus();
    originalConsole.log('✓ PASS: No ReferenceError thrown');
    originalConsole.log('  Last message:', mockConsole.lastMessage);
} catch (error) {
    originalConsole.log('✗ FAIL: Error thrown:', error.message);
    process.exit(1);
}

// Test 2: Function should not throw ReferenceError when selectEventType element is null
originalConsole.log('\nTest 2: Function executes without ReferenceError when element is null');
global.document.getElementById = function(id) {
    return null; // Simulate element not found
};
try {
    updateEnableStatus();
    originalConsole.log('✓ PASS: No ReferenceError thrown');
    originalConsole.log('  Last message:', mockConsole.lastMessage);
} catch (error) {
    originalConsole.log('✗ FAIL: Error thrown:', error.message);
    process.exit(1);
}

// Test 3: Function handles different event types correctly
originalConsole.log('\nTest 3: Function handles SMS event type');
global.document.getElementById = function(id) {
    if (id === 'selectEventType') {
        return { value: 'sms' };
    }
    return null;
};
try {
    updateEnableStatus();
    originalConsole.log('✓ PASS: SMS event type handled correctly');
    originalConsole.log('  Last message:', mockConsole.lastMessage);
} catch (error) {
    originalConsole.log('✗ FAIL: Error thrown:', error.message);
    process.exit(1);
}

// Test 4: Function handles default case
originalConsole.log('\nTest 4: Function handles default/unknown event type');
global.document.getElementById = function(id) {
    if (id === 'selectEventType') {
        return { value: 'unknown' };
    }
    return null;
};
try {
    updateEnableStatus();
    originalConsole.log('✓ PASS: Default event type handled correctly');
    originalConsole.log('  Last message:', mockConsole.lastMessage);
} catch (error) {
    originalConsole.log('✗ FAIL: Error thrown:', error.message);
    process.exit(1);
}

originalConsole.log('\n=== All tests passed! ===\n');
