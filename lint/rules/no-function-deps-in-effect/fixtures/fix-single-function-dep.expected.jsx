import { useEffect, useEffectEvent } from "react";

export function Component() {
  const onChange = useEffectEvent(() => {});

  useEffect(() => {
    onChange();
  }, []);
}
