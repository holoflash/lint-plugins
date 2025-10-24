// These should all trigger the prefer-function-declaration rule

// 1. Simple expression body
const SimpleComponent = () => <div>Hello World</div>;

// 2. Expression body with props
const ComponentWithProps = (props) => <div>{props.name}</div>;

// 3. Expression body with destructured props
const ComponentWithDestructuring = ({ name, age }) => <span>{name} is {age}</span>;

// 4. Block statement with return
const ComponentWithBlock = () => {
    return <div>Block Statement</div>;
};

// 5. Block statement with logic
const ComponentWithLogic = (props) => {
    const message = props.greeting || "Hello";
    return <div>{message}</div>;
};

// 6. Fragment expression
const ComponentWithFragment = () => (
    <>
        <h1>Title</h1>
        <p>Content</p>
    </>
);

// 7. Fragment in block
const ComponentWithFragmentBlock = () => {
    return (
        <>
            <h1>Title</h1>
            <p>Content</p>
        </>
    );
};

// 8. Exported component
export const ExportedComponent = () => <div>Exported</div>;

// 9. Default exported component
const DefaultComponent = () => <div>Default Export</div>;
export default DefaultComponent;

// 10. Component with multiple props
const MultiPropComponent = (props, context) => {
    return <div>{props.title}</div>;
};

// 11. Component with JSX and state logic
const StatefulLikeComponent = ({ initialCount }) => {
    const count = initialCount || 0;
    return <div>Count: {count}</div>;
};

// 12. Nested JSX
const NestedComponent = () => (
    <div>
        <header>
            <h1>Title</h1>
        </header>
        <main>
            <p>Content</p>
        </main>
    </div>
);

// 13. Component with conditional rendering
const ConditionalComponent = ({ isVisible }) => {
    return isVisible ? <div>Visible</div> : <div>Hidden</div>;
};

// 14. Component with map
const ListComponent = ({ items }) => (
    <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
);

// 15. Simple fragment shorthand
const FragmentShorthand = () => <>Content</>;
