// hodor-test expect-message: timeouts
import { useEffect } from "react";
useEffect(() => {
  setTimeout(closeToast, 3000);
}, []);
