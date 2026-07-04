// hodor-test expect-message: intervals
import { useEffect } from "react";
useEffect(() => {
  setInterval(refresh, 1000);
}, []);
