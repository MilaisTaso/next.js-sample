import parse from "html-react-parser";
import Image from "next/image";

export default function ConvertBody({ contentHTML }) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      if (node.name === "img") {
        //分割代入がなぜかうまくいかない個別で宣言はできる
        // const { src, alt, width, height } = node.attributes;
        return (
          <Image
            src={node.attribs.src}
            alt={node.attribs.alt}
            width={node.attribs.width}
            height={node.attribs.height}
            sizes="(min-width:768px) 768px, 100vw"
            style={{ width: "100%", height: "auto" }}
          />
        );
      }
    },
  });
  return <>{contentReact}</>;
}
