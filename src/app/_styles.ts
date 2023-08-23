import type { CSSProperties } from "react";
import { TBlockType, TStructuredContentNode } from "./_mock-data";
import { formatTree } from "./_utils";

export const defaultStyles: Record<TBlockType, CSSProperties> = {
  columns: {
    width: "100%",
    height: "auto",
    padding: 12,
    position: "relative",
    display: "grid",
    gap: 8,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "flex-start",
  },
  text: {
    width: "auto",
    height: "auto",
    padding: 0,
    position: "relative",
    lineHeight: "inherit",
    display: "inline",
    fontSize: "inherit",
    fontWeight: "inherit",
    textAlign: "inherit",
    textDecorationLine: "inherit",
    textDecorationThickness: 2,
  },
  container: {
    width: "800px",
    maxWidth: "90%",
    height: "auto",
    minHeight: "200px",
    padding: 2,
    position: "relative",
    margin: "auto",
    borderRadius: 2,
    display: "flex",
    gap: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  block: {
    width: "100%",
    height: "auto",
    padding: 12,
    position: "relative",
    borderRadius: 2,
    display: "flex",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  separator: {
    width: "100%",
    height: "1px",
    position: "relative",
    backgroundColor: "#9e9bc0",
    borderRadius: 2,
    display: "block",
    opacity: 0.2,
    margin: "12px auto",
  },
  heading: {
    width: "100%",
    height: "auto",
    padding: 2,
    position: "relative",
    display: "block",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 1.1,
    textAlign: "left",
    textDecorationLine: "none",
    textDecorationThickness: 2,
  },
  paragraph: {
    width: "100%",
    height: "auto",
    padding: 2,
    display: "block",
    position: "relative",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 1.1,
    textAlign: "left",
    textDecorationLine: "none",
    textDecorationThickness: 2,
  },
  image: {
    width: "100px",
    height: "100px",
    padding: 2,
    borderRadius: 2,
    backgroundColor: undefined,
    display: "inline-block",
    position: "relative",
    opacity: 1,
    flex: "none",
  },
  "internal-link": {
    width: "auto",
    height: "auto",
    padding: 2,
    display: "inline",
    fontSize: 14,
    fontWeight: "inherit",
    textAlign: "inherit",
  },
  "external-link": {
    width: "auto",
    height: "auto",
    padding: 2,
    display: "inline",
    fontSize: 14,
    fontWeight: "inherit",
    textAlign: "inherit",
  },
  root: {
    backgroundColor: "#FFFFFF",
    position: "relative",
    width: "100%",
    minHeight: "200px",
    height: "auto",
  },
  "category-view": {
    width: "100%",
    height: "auto",
    padding: 2,
    borderRadius: 2,
    display: "block",
    gap: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  "content-view": {
    width: "auto",
    height: "auto",
    padding: 2,
    borderRadius: 2,
    display: "block",
    gap: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  "influencers-view": {
    width: "100%",
    height: "auto",
    padding: 2,
    borderRadius: 2,
    display: "block",
    gap: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
};

export const generateSheet = (data: TStructuredContentNode) => {
  const { nodes, types } = formatTree(data);
  let style = "";
  let responsive = "@media only screen and (max-width: 600px) {\n";

  // base styles
  for (const [key, value] of Object.entries(defaultStyles)) {
    if (!types.has(key)) continue;
    style += `.${key} {\n${propertiesToCSS(value)}${
      key === "image" ? "img {\n    border-radius: 2px;\n  }\n" : ""
    }}\n`;
  }

  // custom styles
  nodes.forEach((value) => {
    const desktop = value.styles.desktop || {};
    if (Object.keys(desktop).length > 0) {
      style += buildIds(value.id, value.type, desktop);
    }

    const mobile = value.styles.mobile || {};
    if (Object.keys(mobile).length > 0) {
      responsive += buildIds(value.id, value.type, mobile);
    }
  });

  responsive += "}";

  style += responsive;
  return style;
};

const buildIds = (id: string, type: string, properties: CSSProperties) => {
  let s = `#B${id} {\n${propertiesToCSS(properties)}}\n`;
  if (type === "image") {
    s += `#B${id}  img {\n    border-radius: ${
      properties?.borderRadius || 2
    }px;\n  }\n`;
  }

  return s;
};

export const propertiesToCSS = (JS: CSSProperties) => {
  let cssString = "";

  const toPixel = [
    "fontSize",
    "gap",
    "padding",
    "borderRadius",
    "textDecorationThickness",
  ];

  for (const [key, value] of Object.entries(JS)) {
    cssString += `  ${key.replace(
      /([A-Z])/g,
      (g) => `-${g[0].toLowerCase()}`
    )}: ${value}${
      toPixel.includes(key) && typeof value === "number" ? "px" : ""
    };\n`;
  }

  return cssString;
};
