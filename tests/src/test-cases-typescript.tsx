// TypeScript/TSX test cases for generic components

// 1. Simple generic component with single type parameter
const GenericComponent = <T,>(props: { value: T }) => <div>{props.value}</div>;

// 2. Multiple type parameters
const MultiGenericComponent = <T, U>(props: { first: T; second: U }) => (
  <div>
    {props.first} - {props.second}
  </div>
);

// 3. Exported generic component
export const ExportedGeneric = <T,>(props: { data: T[] }) => (
  <ul>
    {props.data.map((item, i) => (
      <li key={i}>{String(item)}</li>
    ))}
  </ul>
);

// 4. Generic with extends constraint
const ConstrainedGeneric = <T extends string | number>(props: { value: T }) => {
  return <div>{props.value}</div>;
};

// 5. Complex generic type with object constraint
const ComplexGeneric = <T extends { id: number; name: string }>(props: {
  items: T[];
}) => (
  <div>
    {props.items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);

// 6. Default exported generic component
const DefaultGeneric = <T,>(props: { content: T }) => (
  <span>{String(props.content)}</span>
);
export default DefaultGeneric;

// 7. Generic with multiple constraints
const MultiConstraint = <T extends string, U extends number>(props: {
  text: T;
  count: U;
}) => (
  <div>
    {props.text}: {props.count}
  </div>
);

// 8. Generic component with block statement
const GenericWithBlock = <T,>(props: { value: T }) => {
  const formatted = String(props.value);
  return <div>{formatted}</div>;
};
