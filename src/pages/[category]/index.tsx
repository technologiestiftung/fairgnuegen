import { useLocation } from "react-router-dom";
import { content, offers } from "../../content/content";

export default function Index() {
  const location = useLocation();
  const title = content[location.pathname].title;
  const category = content[location.pathname].category;

  return (
    <>
      <h1>{title}</h1>
      {offers
        .filter((offer) => (offer.category ?? []).find((c) => c === category))
        .map((offer) => (
          <div key={offer.provider}>
            <a href={offer.path}>{offer.provider}</a>
          </div>
        ))}
    </>
  );
}
