import { useEffect } from "react";
useEffect(() => {
  const controller = new AbortController();
  fetch("/api/profile", { signal: controller.signal });
  return () => controller.abort();
}, []);
