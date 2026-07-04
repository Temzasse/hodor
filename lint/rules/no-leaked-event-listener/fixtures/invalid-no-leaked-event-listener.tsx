// hodor-test expect-message: event listeners
import { useEffect } from "react";
useEffect(() => {
  window.addEventListener("resize", onResize);
}, []);
