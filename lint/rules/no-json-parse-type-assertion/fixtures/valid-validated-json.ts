type Props = {
  title: string;
};

export function parseProps(raw: string, schema: { parse(value: unknown): Props }) {
  return schema.parse(JSON.parse(raw));
}
