import { useEffect } from "react";
useEffect(() => {
  const observer = new IntersectionObserver(onIntersect);
  observer.observe(node);
}, []);
