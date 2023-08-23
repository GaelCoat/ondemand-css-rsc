import { TStructuredContentNode } from "./_mock-data";

export const formatTree = (tree: TStructuredContentNode) => {
  const types = new Set<string>();
  const nodes: Omit<TStructuredContentNode, "children">[] = [];

  const traverse = (node: TStructuredContentNode) => {
    const { children, ...data } = node;
    const id = node?.id || "root";

    nodes.push({
      ...data,
      id,
    });

    types.add(data.type);

    if (children) {
      for (const child of children) {
        traverse(child);
      }
    }
  };

  traverse(tree);
  return { nodes, types };
};
