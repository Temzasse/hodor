import { useCallback } from "react";

export function Button({ onClick }: { onClick(): void }) {
  const wrappedClick = useCallback(() => onClick(), [onClick]);

  return <button onClick={wrappedClick}>Save</button>;
}
