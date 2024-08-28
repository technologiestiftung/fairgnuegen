import { offers } from "../../content/content";

export default function Index() {
  return (
    <>
      <h1>All Offers</h1>
      {offers.map((offer) => (
        <div key={offer.provider}>
          <a href={offer.path}>{offer.provider}</a>
        </div>
      ))}
    </>
  );
}
