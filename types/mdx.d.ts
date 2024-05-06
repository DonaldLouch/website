type SerializeResult<TFrontmatter, TScope> = (
  | { compiledSource: string }
  | { error: Error }
) & {
  frontmatter: TFrontmatter;
  scope: TScope;
};
