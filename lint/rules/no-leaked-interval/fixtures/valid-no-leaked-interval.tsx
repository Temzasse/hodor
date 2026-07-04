import { useEffect } from "react";
useEffect(() => {
  const intervalId = setInterval(refresh, 1000);
  return () => clearInterval(intervalId);
}, []);
