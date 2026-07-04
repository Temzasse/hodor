# ESLint React Rules Missing From Oxlint

Generated on 2026-07-04 by comparing the ESLint React rule list with Oxlint's built-in React-scoped rules.

Sources:

- https://eslint-react.xyz/docs/rules
- https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=react

This list treats renamed and broader Oxlint rules as counterparts when they cover the same behavior. For example, `@eslint-react/no-missing-key` is covered by `react/jsx-key`, and several React Compiler-style diagnostics are covered by Oxlint's aggregate `react/react-compiler` rule. The rules below are the ESLint React rules that did not appear to have any clear Oxlint counterpart.

## Core React

### `no-access-state-in-setstate`

Disallows reading `this.state` while computing a class component state update; use the updater argument instead.

```jsx
this.setState({ count: this.state.count + 1 });
```

### `no-class-component`

Disallows class components in favor of function components.

```jsx
class Profile extends React.Component {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}
```

### `no-context-provider`

Disallows the legacy `<Context.Provider>` syntax when a newer shorthand or project convention is preferred.

```jsx
return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
```

### `no-create-ref`

Disallows `createRef`, usually to prefer `useRef` in function components.

```jsx
const inputRef = React.createRef();
```

### `no-duplicate-key`

Disallows duplicate `key` values in arrays of JSX elements.

```jsx
return [
  <Item key="settings" />,
  <Item key="settings" />,
];
```

### `no-forward-ref`

Disallows `forwardRef`, which is often avoidable in modern React component APIs.

```jsx
const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);
```

### `no-implicit-children`

Disallows implicit `children` in component props; declare children explicitly.

```tsx
type Props = { title: string };

function Panel(props: Props) {
  return <section>{props.children}</section>;
}
```

### `no-implicit-key`

Disallows passing React keys indirectly instead of spelling `key` at the JSX site.

```jsx
const props = { key: id, label };
return <Row {...props} />;
```

### `no-implicit-ref`

Disallows passing refs indirectly through spread props.

```jsx
const props = { ref: inputRef };
return <input {...props} />;
```

### `no-leaked-conditional-rendering`

Disallows conditional rendering patterns that can leak non-renderable or unintended values into JSX.

```jsx
return <main>{count && <Badge count={count} />}</main>;
```

### `no-missing-context-display-name`

Requires a display name for React contexts to make DevTools output easier to inspect.

```jsx
const ThemeContext = React.createContext(null);
```

### `no-misused-capture-owner-stack`

Disallows using React owner-stack capture APIs outside the narrow debugging patterns they are intended for.

```jsx
const stack = React.captureOwnerStack();
sendToAnalytics(stack);
```

### `no-nested-lazy-component-declarations`

Disallows declaring `React.lazy` components inside other components or render paths.

```jsx
function Page() {
  const Settings = React.lazy(() => import("./Settings"));
  return <Settings />;
}
```

### `no-unnecessary-use-prefix`

Disallows naming non-hook functions with a `use` prefix.

```jsx
function useFormatDate(value) {
  return new Intl.DateTimeFormat().format(value);
}
```

### `no-unused-class-component-members`

Reports unused methods or fields inside class components.

```jsx
class Dialog extends React.Component {
  closeDialog() {}

  render() {
    return <button>Close</button>;
  }
}
```

### `no-unused-props`

Reports props that are declared but never read by the component.

```tsx
type Props = { title: string; subtitle: string };

function Header({ title }: Props) {
  return <h1>{title}</h1>;
}
```

### `no-unused-state`

Reports class component state fields that are never read.

```jsx
class Counter extends React.Component {
  state = { count: 0, debug: false };

  render() {
    return <span>{this.state.count}</span>;
  }
}
```

### `no-use-context`

Disallows `useContext`, usually to enforce a project-specific context hook wrapper.

```jsx
const theme = React.useContext(ThemeContext);
```

## JSX

### `no-key-after-spread`

Disallows placing `key` after a prop spread because the spread may already contain a key.

```jsx
return <Row {...rowProps} key={row.id} />;
```

### `no-leaked-dollar`

Disallows stray `$` text in JSX, commonly from accidentally mixing template syntax into JSX text.

```jsx
return <p>Hello ${name}</p>;
```

### `no-leaked-semicolon`

Disallows stray semicolons rendered as JSX text.

```jsx
return <div>{items.map((item) => <Item item={item} />)};</div>;
```

### `no-namespace`

Disallows XML-style JSX namespace names.

```jsx
return <svg:path d={path} />;
```

## Naming

### `context-name`

Enforces a consistent name pattern for React context objects.

```jsx
const Theme = React.createContext(null);
```

### `function-definition`

Enforces the preferred function declaration style for components or hooks.

```jsx
const Profile = function Profile({ name }) {
  return <h1>{name}</h1>;
};
```

### `id-name`

Enforces a consistent name pattern for `useId` values.

```jsx
const value = React.useId();
return <label htmlFor={value}>Email</label>;
```

### `ref-name`

Enforces a consistent name pattern for refs.

```jsx
const input = React.useRef(null);
return <input ref={input} />;
```

## React DOM

### `no-find-dom-node`

Disallows the deprecated `findDOMNode` API.

```jsx
const node = ReactDOM.findDOMNode(component);
```

### `no-flush-sync`

Disallows `flushSync`, which can hurt scheduling and rendering performance.

```jsx
ReactDOM.flushSync(() => {
  setOpen(true);
});
```

### `no-hydrate`

Disallows the legacy `hydrate` API in favor of modern root hydration APIs.

```jsx
ReactDOM.hydrate(<App />, document.getElementById("root"));
```

### `no-render`

Disallows the legacy `render` API in favor of modern root APIs.

```jsx
ReactDOM.render(<App />, document.getElementById("root"));
```

### `no-use-form-state`

Disallows deprecated or disallowed form state hooks when the project expects the newer API.

```jsx
const [state, action] = ReactDOM.useFormState(saveUser, initialState);
```

## Web API Cleanup

### `no-leaked-event-listener`

Requires event listeners registered from React code to be cleaned up.

```jsx
useEffect(() => {
  window.addEventListener("resize", onResize);
}, []);
```

### `no-leaked-fetch`

Requires fetch work started from an effect to be abortable or otherwise cleaned up.

```jsx
useEffect(() => {
  fetch("/api/profile").then(loadProfile);
}, []);
```

### `no-leaked-intersection-observer`

Requires `IntersectionObserver` instances to be disconnected.

```jsx
useEffect(() => {
  const observer = new IntersectionObserver(onIntersect);
  observer.observe(node);
}, []);
```

### `no-leaked-interval`

Requires intervals started in effects to be cleared.

```jsx
useEffect(() => {
  setInterval(refresh, 1000);
}, []);
```

### `no-leaked-resize-observer`

Requires `ResizeObserver` instances to be disconnected.

```jsx
useEffect(() => {
  const observer = new ResizeObserver(onResize);
  observer.observe(node);
}, []);
```

### `no-leaked-timeout`

Requires timeouts started in effects to be cleared when the effect is cleaned up.

```jsx
useEffect(() => {
  setTimeout(closeToast, 3000);
}, []);
```
