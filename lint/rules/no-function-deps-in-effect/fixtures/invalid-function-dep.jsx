// hodor-test expect-message: Function 'handleClick' in effect deps
import { useEffect } from "react";

export function Component() {
  function handleClick() {}

  useEffect(() => {
    handleClick();
  }, [handleClick]);
}
