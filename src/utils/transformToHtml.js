import parse from "html-react-parser";

function transformToHtml(description) {
  const parsedHtml = parse(`<div>${description}</div>`);
  return parsedHtml;
}

export { transformToHtml };
