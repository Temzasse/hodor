import { useEffect } from "react";
useEffect(() => {
  const timeoutId = setTimeout(closeToast, 3000);
  return () => clearTimeout(timeoutId);
}, []);
