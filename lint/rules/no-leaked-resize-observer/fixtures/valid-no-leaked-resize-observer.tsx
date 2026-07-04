import { useEffect } from "react";
useEffect(() => {
  const observer = new ResizeObserver(onResize);
  observer.observe(node);
  return () => observer.disconnect();
}, []);
