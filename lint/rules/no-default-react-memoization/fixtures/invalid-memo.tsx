import { memo } from "react";

function Card({ title }: { title: string }) {
  return <section>{title}</section>;
}

export const MemoCard = memo(Card);
