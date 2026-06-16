/**
 * Minimal, dependency-free Markdown renderer for assistant replies.
 *
 * Supports the small subset the model actually emits: bold, italic, inline
 * code, links, and unordered/ordered lists. It returns React elements (never
 * raw HTML), so there is no XSS risk from model output.
 */

// Inline formatting: links, **bold**, `code`, *italic* / _italic_.
function renderInline(text, keyPrefix) {
  const nodes = [];
  const regex =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*|_([^_]+)_/g;
  let last = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) {
      nodes.push(
        <a key={key} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      nodes.push(<strong key={key}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(<code key={key}>{match[4]}</code>);
    } else {
      nodes.push(<em key={key}>{match[5] || match[6]}</em>);
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function Markdown({ text }) {
  const lines = String(text).split("\n");
  const blocks = [];
  let list = null; // { type: "ul" | "ol", items: [] }

  for (const line of lines) {
    const trimmed = line.trim();
    const bullet = /^[-*]\s+(.*)/.exec(trimmed);
    const numbered = /^\d+\.\s+(.*)/.exec(trimmed);

    if (bullet) {
      if (!list || list.type !== "ul") {
        list = { type: "ul", items: [] };
        blocks.push(list);
      }
      list.items.push(bullet[1]);
    } else if (numbered) {
      if (!list || list.type !== "ol") {
        list = { type: "ol", items: [] };
        blocks.push(list);
      }
      list.items.push(numbered[1]);
    } else {
      list = null;
      if (trimmed) blocks.push({ type: "p", text: trimmed });
    }
  }

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return <p key={i}>{renderInline(block.text, i)}</p>;
        }
        const items = block.items.map((it, j) => (
          <li key={j}>{renderInline(it, `${i}-${j}`)}</li>
        ));
        return block.type === "ol" ? (
          <ol key={i}>{items}</ol>
        ) : (
          <ul key={i}>{items}</ul>
        );
      })}
    </>
  );
}
