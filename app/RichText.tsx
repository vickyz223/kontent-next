import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import {
  browserParse,
  transformToPortableText,
} from "@kontent-ai/rich-text-resolver";
import { useMemo } from "react";

const createPortableTextComponents = (linkedItems) => ({
  types: {
    component: (block) => {
      const item = linkedItems.find(
        (item) => item.system.codename === block.value.component._ref
      );
      return <div>{item?.elements.text_element.value}</div>;
    },
    table: ({ value }) => {
      const table = (
        <table>
          {value.rows.map((row) => (
            <tr>
              {row.cells.map((cell) => {
                return (
                  <td>
                    <PortableText
                      value={cell.content}
                      components={portableTextComponents}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </table>
      );
      return table;
    },
    image: ({ value }) => {
      // It is possible to use images from the rich text element response same as for linked items
      // const image = images.find(image => image.image_id === value.asset._ref)
      return <img src={value.asset.url}></img>;
    },
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={value?.rel}
          title={value?.title}
          data-new-window={value["data-new-window"]}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      // It is possible to use links from the rich text element response same as for linked items
      // const item = links.find(link => link.link_id === value.reference._ref);
      return (
        <a href={"https://somerandomwebsite.xyz/" + value.reference._ref}>
          {children}
        </a>
      );
    },
  },
});

export default function MyComponent({ props }) {
  // https://github.com/portabletext/react-portabletext#customizing-components

  const parsedTree = browserParse(props.elements.value);
  const portableText = transformToPortableText(parsedTree);

  if (props.element.linkedItems) {
    const portableTextComponents = useMemo(
      () => createPortableTextComponents(props.element.linkedItems),
      [props.element.linkedItems]
    );
    return (
      <PortableText value={portableText} components={portableTextComponents} />
    );
  } else {
    return <div>no</div>;
  }
};
