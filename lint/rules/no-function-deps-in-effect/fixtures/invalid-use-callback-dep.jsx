// hodor-test expect-message: Function 'onChange' in effect deps
import { useCallback, useEffect } from "react";

export function Component({ value }) {
  const onChange = useCallback(() => value, [value]);

  useEffect(() => {
    onChange();
  }, [onChange]);
}
