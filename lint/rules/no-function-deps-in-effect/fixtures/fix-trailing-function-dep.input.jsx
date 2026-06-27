import { useEffect } from "react";

export function Component({ value }) {
  const onChange = () => {};

  useEffect(() => {
    onChange();
  }, [value, onChange]);
}
