// hodor-test expect-message: fetch work
import { useEffect } from "react";
useEffect(() => {
  fetch("/api/profile");
}, []);
