type Props = {
  title: string;
};

export function parseProps(raw: string) {
  return JSON.parse(raw) as Props;
}
