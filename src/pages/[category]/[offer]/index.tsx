import { useLocation } from "react-router-dom";
import { content } from "../../../content/content";

export default function Index() {
  const location = useLocation();

  const offer = content[location.pathname].offer;

  if (!offer) {
    return <h1>Offer not found</h1>;
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{offer.provider}</h2>
          <p className="text-gray-600 mb-4">{offer.providerDescription}</p>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Offer Description</h3>
            <p>{offer.offerDescription}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Offer Information</h3>
            <p>{offer.offerInformation}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <p>
              {offer.address}, {offer.city}, {offer.zip}
            </p>
            <p>District: {offer.district}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="list-disc list-inside">
              {offer.category.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Target Groups</h3>
            <ul className="list-disc list-inside">
              {offer.targetGroups.map((group, index) => (
                <li key={index}>{group}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Pricing</h3>
            <p>{offer.isFree ? "Free" : "Paid"}</p>
          </div>

          <div className="mt-6">
            <a
              href={offer.website}
              className="text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
