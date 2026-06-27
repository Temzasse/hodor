import { useCallback, useEffect } from "react";

export function Component({ value }) {
  const onChange = useCallback(() => value, [value]);

  useEffect(() => {
    onChange();
  }, [onChange]);
}
