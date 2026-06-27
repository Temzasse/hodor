type Props = {
  title: string;
};

export function Card({ title }: Props) {
  return <section>{title}</section>;
}
