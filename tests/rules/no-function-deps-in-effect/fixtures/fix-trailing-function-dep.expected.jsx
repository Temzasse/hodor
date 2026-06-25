import { useEffect, useEffectEvent } from "react";

export function Component({ value }) {
  const onChange = useEffectEvent(() => {});

  useEffect(() => {
    onChange();
  }, [value]);
}
