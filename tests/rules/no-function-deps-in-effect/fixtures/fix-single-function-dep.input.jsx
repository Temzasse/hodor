import { useEffect } from "react";

export function Component() {
  const onChange = () => {};

  useEffect(() => {
    onChange();
  }, [onChange]);
}
