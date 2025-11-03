# holoflash-lint

Opinionated oxlint plugin for React/Preact development.

## Installation

```bash
npm install --save-dev holoflash-lint oxlint
```

## Usage

Add the following to your .oxlintrc.json file:

### .oxlintrc.json

```json
{
  "jsPlugins": ["holoflash-lint"],
  "rules": {
    "holoflash-lint/prefer-function-declaration": "warn"
  }
}
```

### Running the linter

```bash
# Check for issues
npx oxlint

# Automatically fix issues (experimental)
npx oxlint --fix
```

**⚠️ Note on auto-fixing:** The `--fix` feature is experimental and still being refined. While it works well in most cases, it may occasionally produce unexpected formatting or miss edge cases. Always review the changes after running `--fix` and consider running your code formatter afterward.

## Rules

### `prefer-function-declaration`

Enforces the use of function declarations for JSX components instead of arrow functions.

#### Why use function declarations?

Function declarations offer several practical benefits for component definitions:

- **Better readability**: Function declarations are easier to distinguish from regular variables and other code
- **Hoisting flexibility**: You can define functions after they're used, providing more organizational freedom
- **Improved debugging**: Function names appear more clearly in error stack traces and React/Preact DevTools
- **Explicit exports**: You can export the function on the same line (`export function MyComponent()`)
- **Clear intent**: `function MyComponent()` clearly signals "this is a component" to other developers

While this is partly a matter of style preference, this plugin helps use function declarations for components and reserving arrow functions for callbacks, event handlers, and inline functions creates a more consistent and maintainable codebase.

**❌ Incorrect:**
```javascript
const MyComponent = () => {
  return <div>Hello World</div>;
};

const AnotherComponent = () => <span>Content</span>;
```

**✅ Correct:**
```javascript
function MyComponent() {
  return <div>Hello World</div>;
}

function AnotherComponent() {
  return <span>Content</span>;
}
```

#### Rule Options

This rule has no options.

## Requirements

- Node.js >= 20.0.0
- oxlint >= 1.22.0

## Contributing

Issues and pull requests are welcome on the [GitHub repository](https://github.com/holoflash/lint-plugins).

## License

MIT