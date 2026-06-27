import { useEffect } from "react";

export function Component() {
  function handleClick() {}

  useEffect(() => {
    handleClick();
  }, [handleClick]);
}
