// hodor-test expect-message: Use a plain function component
import type { FC } from "react";

type Props = {
  title: string;
};

export const Card: FC<Props> = ({ title }) => <section>{title}</section>;
