import { useEffect } from "react";

export function Component({ value }) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}
