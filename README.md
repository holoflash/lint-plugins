## Installation

First, make sure you have oxlint installed:

```bash
npm install --save-dev oxlint
```

Then install this plugin:

```bash
npm install --save-dev holoflash-lint-react-opinionated
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