// hodor-test expect-message: flushSync
import ReactDOM from "react-dom";
ReactDOM.flushSync(() => setOpen(true));
