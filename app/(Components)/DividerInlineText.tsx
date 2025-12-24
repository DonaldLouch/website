import { Divider } from "@mantine/core";
import React from "react";

export default function DividerInlineText({
  text,
  customMargin,
}: {
  text?: string;
  customMargin?: string;
}) {
  return (
    <Divider
      label={text}
      labelPosition="center"
      mx="3rem"
      my={customMargin || "2rem"}
    />
  );
}
