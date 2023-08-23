import {
  Data,
  TImageNode,
  TStructuredContentNode,
  TTextNode,
} from "./_mock-data";
import { generateSheet } from "./_styles";
import Image from "next/image";

const Home = async () => {
  return (
    <div>
      <style>{generateSheet(Data)}</style>
      <Block block={Data} />
    </div>
  );
};

const Block = ({ block }: { block: TStructuredContentNode }) => {
  return (
    <div className={`${block.type}`} id={`B${block.id}`}>
      {/* juste pour preview, pas faire comme ca */}
      {block.type === "text" && <TextNode node={block} />}
      {block.type === "image" && <ImageNode node={block} />}
      {block?.children?.map((c) => {
        return <Block block={c} key={c.id} />;
      })}
    </div>
  );
};

const TextNode = ({ node }: { node: TTextNode }) => {
  return <span>{node.text}</span>;
};

const ImageNode = ({ node }: { node: TStructuredContentNode<TImageNode> }) => {
  const getSize = (prop: string | number | undefined) => {
    if (typeof prop === "number") return prop;
    if (!prop) return 100;
    if (prop === "auto") return 100;
    return Number(prop.replace("px", "").replace("%", ""));
  };

  return (
    <Image
      alt=""
      src={node.url}
      width={getSize(node.styles.desktop.width)}
      height={getSize(node.styles.desktop.height)}
      className="w-full h-full object-cover"
    />
  );
};

export default Home;
