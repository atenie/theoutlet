import React, { useState } from "react";
import Fuse from "fuse.js";

function products({ data }) {
  const [results, setResults] = useState();
  const [displayed, setDisplayed] = useState();
  const [count, setCount] = useState(8);
  const [buttonToggle, setButtonToggle] = useState(false);

  const options = {
    keys: ["name", "brand"],
    minMatchCharLength: 1,
    threshold: 0.8,
  };
  return (
    <div className="bg-gray-50	">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>
          <h2 htmlFor="price" className="block font-medium text-gray-700">
            Caută
          </h2>
          <div className="mt-1 relative rounded-none shadow-sm">
            <input
              type="text"
              name="input"
              id="input"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-none"
              placeholder="rochie"
              onChange={async (e) => {
                const { value } = e.currentTarget;
                const fuse = new Fuse(data, options);
                const tempResults = fuse.search(value);
                setResults(tempResults.map((result) => result.item));
                setDisplayed(results?.slice(0, count));
                console.log("Total:" + results?.length);
                console.log("Displayed:" + displayed?.length);
                setButtonToggle(true);
              }}
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {displayed?.map((item, refIndex) => (
            <div key={refIndex} className="group relative bg-white p-4 ">
              <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-none overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a className="font-medium" href={item.siteURL}>
                      <span aria-hidden="true" className="absolute inset-0 ">
                        <span className="bg-white pb-1.5 pr-1.5 rounded-none">
                          {item.brand}
                        </span>
                      </span>
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.warehouseStock[0]?.size}{" "}
                    {item.warehouseStock[1]?.size}{" "}
                    {item.warehouseStock[2]?.size}{" "}
                    {item.warehouseStock[3]?.size}{" "}
                    {item.warehouseStock[4]?.size}{" "}
                    {item.warehouseStock[5]?.size}{" "}
                    {item.warehouseStock[6]?.size}{" "}
                    {item.warehouseStock[7]?.size}{" "}
                    {item.warehouseStock[8]?.size}{" "}
                    {item.warehouseStock[9]?.size}
                  </p>
                  <p className="text-sm font-medium text-yellow-500">
                    {item.price} RON
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2"></div>
        <button
          onClick={() => (
            setDisplayed(results?.slice(0, count + 8)),
            setCount(count + 8),
            console.log("Total:" + results?.length),
            console.log("Displayed:" + displayed?.length)
          )}
          className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
          style={{
            display: buttonToggle ? "block" : "none",
          }}
        >
          Mai multe rezultate
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:4000/`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default products;
