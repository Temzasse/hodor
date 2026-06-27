import type { FunctionComponent } from "react";

type Props = {
  title: string;
};

export const Card: FunctionComponent<Props> = ({ title }) => <section>{title}</section>;
