# holoflash-lint

Opinionated oxlint plugin for React/Preact development.
Will be able to auto-fix soon!

## Installation

First, install oxlint:

```bash
npm install --save-dev oxlint
```

Then install this plugin:

```bash
npm install --save-dev holoflash-lint
```

## Usage

Add to your oxlint configuration:

### .oxlintrc.json

```json
{
  "jsPlugins": ["holoflash-lint"],
  "rules": {
    "holoflash-lint/prefer-function-declaration": "error"
  }
}
```

## Rules

### `prefer-function-declaration`

Enforces the use of function declarations for React components instead of arrow functions.

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

- Node.js >= 16.0.0
- oxlint >= 1.22.0

## Contributing

Issues and pull requests are welcome on the [GitHub repository](https://github.com/holoflash/lint-plugins).

## License

MIT