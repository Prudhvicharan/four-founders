import { useMemo, useState } from "react";

const SECTIONS = ["Charms", "Transfiguration", "Astronomy"];

/** The reading room above the Ravenclaw tower stairs. */
export function Library({ books, restricted = false }) {
  const [query, setQuery] = useState("");
  const shelf = useMemo(
    () => books.filter((b) => b.title.toLowerCase().includes(query.toLowerCase())),
    [books, query],
  );

  if (restricted) {
    return <p className="warning">A signed permission slip is required.</p>;
  }

  return (
    <section className="library" aria-label="Reading room">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${books.length} volumes`}
      />
      {SECTIONS.map((name) => (
        <h2 key={name}>{name}</h2>
      ))}
      <ul>
        {shelf.map((book) => (
          <li key={book.id}>
            {book.title} <em>by {book.author}</em>
          </li>
        ))}
      </ul>
    </section>
  );
}
