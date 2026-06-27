type Props = {
  title: string;
};

export function parseProps(raw: string) {
  return <Props>JSON.parse(raw);
}
