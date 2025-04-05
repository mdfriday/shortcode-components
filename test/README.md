# Shortcode Tests

This directory contains tests for the dynamic shortcode components.

## Test Structure

- **Unit Tests** - Tests individual components in isolation
  - `shortcode-cache.test.ts` - Tests for the `ShortcodeCache` class
  - `shortcode-manager.test.ts` - Tests for the `ShortcodeManager` class
  - `shortcode.test.ts` - Tests for the main `Shortcode` class
  - `integration.test.ts` - Tests all components working together

## Running Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run only unit tests
npm run test:unit

# Run tests with coverage report
npm run test:coverage
```

## Coverage

Coverage reports are generated in the `/coverage` directory when running with the `--coverage` flag. You can open the HTML report in a browser to see detailed coverage information:

```bash
npm run test:coverage
# Then open coverage/lcov-report/index.html in a browser
```

## Writing Tests

When writing additional tests, follow these guidelines:

1. Put unit tests in the `unit` directory
2. Mock external dependencies where appropriate
3. Use descriptive test names that follow the pattern "should [expected behavior]"
4. Group related tests using `describe` blocks
5. Use `beforeEach` for common setup

## Mocking

The tests use Jest's mocking capabilities to isolate components:

- External dependencies like `@mdfriday/shortcode-compiler` are mocked
- Where needed, partial implementations are provided to support specific test scenarios

## Integration Tests

Integration tests verify that all components work correctly together. These tests:

1. Use real implementations (not mocks)
2. Test end-to-end functionality
3. Verify correct rendering of shortcodes
4. Test caching behavior
5. Test multi-step rendering workflow 