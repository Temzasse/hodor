import { useEffect } from "react";
useEffect(() => {
  fetch("/api/profile");
}, []);
