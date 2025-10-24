// These are the correct patterns using function declarations

// 1. Simple function declaration
function SimpleComponent() {
    return <div>Hello World</div>;
}

// 2. Function with props
function ComponentWithProps(props) {
    return <div>{props.name}</div>;
}

// 3. Function with destructured props
function ComponentWithDestructuring({ name, age }) {
    return <span>{name} is {age}</span>;
}

// 4. Function with logic
function ComponentWithLogic(props) {
    const message = props.greeting || "Hello";
    return <div>{message}</div>;
}

// 5. Function returning fragment
function ComponentWithFragment() {
    return (
        <>
            <h1>Title</h1>
            <p>Content</p>
        </>
    );
}

// 6. Exported function
export function ExportedComponent() {
    return <div>Exported</div>;
}

// 7. Default exported function (option 1)
export default function DefaultComponent() {
    return <div>Default Export</div>;
}

// 8. Multiple props
function MultiPropComponent(props, context) {
    return <div>{props.title}</div>;
}

// 9. Function with state-like logic
function StatefulLikeComponent({ initialCount }) {
    const count = initialCount || 0;
    return <div>Count: {count}</div>;
}

// 10. Nested JSX
function NestedComponent() {
    return (
        <div>
            <header>
                <h1>Title</h1>
            </header>
            <main>
                <p>Content</p>
            </main>
        </div>
    );
}

// 11. Conditional rendering
function ConditionalComponent({ isVisible }) {
    return isVisible ? <div>Visible</div> : <div>Hidden</div>;
}

// 12. List rendering
function ListComponent({ items }) {
    return (
        <ul>
            {items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
    );
}

// 13. Simple fragment
function FragmentShorthand() {
    return <>Content</>;
}

// Note: Arrow functions are still fine for callbacks and event handlers
function ButtonComponent({ onClick }) {
    // This arrow function is correct - it's not a component, it's a callback
    const handleClick = () => {
        console.log('Clicked!');
        onClick?.();
    };

    return <button onClick={handleClick}>Click me</button>;
}

// Arrow functions in map/filter/etc are also fine
function ListWithCallbacks({ items }) {
    return (
        <ul>
            {items
                .filter(item => item.active)
                .map(item => <li key={item.id}>{item.name}</li>)
            }
        </ul>
    );
}
