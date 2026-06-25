import { useEffect, useState } from "react";

export function Component() {
  const [_count, setCount] = useState(0);

  useEffect(() => {
    setCount((count) => count + 1);
  }, [setCount]);
}
