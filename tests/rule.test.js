import { RuleTester } from "eslint";
import plugin from "../react-opinionated.js";

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    }
});

const rule = plugin.rules["prefer-function-declaration"];

ruleTester.run("prefer-function-declaration", rule, {
    valid: [
        // Function declarations are valid
        {
            code: "function MyComponent() { return <div>Hello</div>; }",
        },
        {
            code: "export function MyComponent() { return <div>Hello</div>; }",
        },
        {
            code: "export default function MyComponent() { return <div>Hello</div>; }",
        },
        // Arrow functions that don't return JSX are valid
        {
            code: "const myFunction = () => { return 42; };",
        },
        {
            code: "const myFunction = () => 'hello';",
        },
    ],

    invalid: [
        // Simple arrow function returning JSX
        {
            code: "const MyComponent = () => <div>Hello</div>;",
            errors: [{ message: "Convert arrow function component 'MyComponent' to function declaration" }],
            output: "function MyComponent() {\n  return <div>Hello</div>;\n}",
        },
        // Arrow function with props
        {
            code: "const MyComponent = (props) => <div>{props.name}</div>;",
            errors: [{ message: "Convert arrow function component 'MyComponent' to function declaration" }],
            output: "function MyComponent(props) {\n  return <div>{props.name}</div>;\n}",
        },
        // Arrow function with block statement
        {
            code: "const MyComponent = () => { return <div>Hello</div>; };",
            errors: [{ message: "Convert arrow function component 'MyComponent' to function declaration" }],
            output: "function MyComponent() { return <div>Hello</div>; }",
        },
        // Exported arrow function
        {
            code: "export const MyComponent = () => <div>Hello</div>;",
            errors: [{ message: "Convert arrow function component 'MyComponent' to function declaration" }],
            output: "export function MyComponent() {\n  return <div>Hello</div>;\n}",
        },
        // Arrow function with conditional
        {
            code: "const MyComponent = ({ isVisible }) => { return isVisible ? <div>Visible</div> : <div>Hidden</div>; };",
            errors: [{ message: "Convert arrow function component 'MyComponent' to function declaration" }],
            output: "function MyComponent({ isVisible }) { return isVisible ? <div>Visible</div> : <div>Hidden</div>; }",
        },
        // Arrow function with fragment
        {
            code: "const MyComponent = () => <><h1>Title</h1><p>Content</p></>;",
            errors: [{ message: "Convert arrow function component 'MyComponent' to function declaration" }],
            output: "function MyComponent() {\n  return <><h1>Title</h1><p>Content</p></>;\n}",
        },
    ],
});

console.log("✅ All tests passed!");
