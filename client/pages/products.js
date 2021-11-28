import React, { useState } from "react";
import Fuse from "fuse.js";
import * as _ from "underscore";

function products({ data }) {
  const options = {
    keys: ["name", "brand"],
    minMatchCharLength: 1,
    threshold: 0.8,
  };

  // collected items
  var collectedSizes = new Array();
  var collectedPrices = new Array();
  var collectedBrands = new Array();
  var collectedCategories = new Array();

  // selected items for filtering
  var selectedSizes = new Array();
  var selectedPrices = new Array();
  var selectedBrands = new Array();
  var selectedCategories = new Array();

  // generated arrays for intersection
  var generatedSizes = new Array();
  var generatedPrices = new Array();
  var generatedBrands = new Array();
  var generatedCategories = new Array();
  // should've been used, hasn't been.
  var generatedTexts = new Array();

  // should've been used, hasn't been.
  var minPrice = new Number();

  // Max budget
  var maxPrice = new Number();

  // API call results
  const [results, setResults] = useState([]);
  // shown results
  const [displayed, setDisplayed] = useState(data);
  // shown count
  const [count, setCount] = useState(8);
  // "Load More" toggle
  const [buttonToggle, setButtonToggle] = useState(false);

  // Filter toggles:
  async function filters() {
    data.map((item) => {
      collectedBrands.push(item.brand);
      collectedCategories.push(item.category);
      collectedPrices.push(item.price);
      item.warehouseStock.map((subItem) => {
        collectedSizes.push(subItem.size);
      });
    });
    collectedSizes = [...new Set(collectedSizes)].sort();
    collectedBrands = [...new Set(collectedBrands)].sort();
    collectedCategories = [...new Set(collectedCategories)].sort();
    collectedPrices = [...new Set(collectedPrices)].sort();
  }

  async function checkSize(item) {
    console.log(item);
    var found = false;
    var tempSize = item.item;
    for (var i = 0; i < selectedSizes.length; i++) {
      if (selectedSizes[i] == item.item) {
        found = true;
        selectedSizes.splice(i, 1);
        var tempLocalArray = [];
        data.map((item) =>
          item.warehouseStock.forEach((subItem) => {
            selectedSizes.forEach((element) => {
              if (subItem.size == element) tempLocalArray.push(item);
            });
          })
        );
        generatedSizes.length = 0;
        generatedSizes.push.apply(generatedSizes, tempLocalArray);

        break;
      }
    }
    if (!found) {
      selectedSizes.push(item.item);
      data.map((item) =>
        item.warehouseStock.forEach((subItem) => {
          if (subItem.size == tempSize) generatedSizes.push(item);
        })
      );
    }
    console.log("Sizes:");
    console.log(selectedSizes);
    console.log(generatedSizes);
    intersectArrays();
  }

  async function checkCategory(item) {
    var found = false;
    for (var i = 0; i < selectedCategories.length; i++) {
      if (selectedCategories[i] == item.item) {
        found = true;
        selectedCategories.splice(i, 1);
        break;
      }
    }
    if (!found) {
      selectedCategories.push(item.item);
    }
    console.log("Categories:");
    console.log(selectedCategories);
    generatedCategories = data.filter((item) =>
      selectedCategories.includes(item.category)
    );
    console.log("Generated Categories:");
    console.log(generatedCategories);
    intersectArrays();
  }

  async function checkBrand(item) {
    var found = false;
    for (var i = 0; i < selectedBrands.length; i++) {
      if (selectedBrands[i] == item.item) {
        found = true;
        selectedBrands.splice(i, 1);
        break;
      }
    }
    if (!found) {
      selectedBrands.push(item.item);
    }
    console.log("Brands:");
    console.log(selectedBrands);
    generatedBrands = data.filter((item) =>
      selectedBrands.includes(item.brand)
    );
    console.log("Generated Brands:");
    console.log(generatedBrands);
    intersectArrays();
  }

  async function checkPrice(item) {
    maxPrice = parseInt(item);

    if (isNaN(maxPrice) || maxPrice === 0) {
      selectedPrices.splice(0, selectedPrices.length, ...collectedPrices);
    } else {
      selectedPrices = collectedPrices.filter(function (it) {
        return it < maxPrice;
      });
    }
    console.log("Prices:");
    console.log(selectedPrices);
    generatedPrices = data.filter((item) =>
      selectedPrices.includes(item.price)
    );
    console.log(generatedPrices);
    intersectArrays();
  }

  async function intersectArrays() {
    setResults(
      // should've worked with a join, but no way in this manner.
      _.union(
        generatedCategories,
        generatedBrands,
        generatedPrices,
        generatedSizes
      )
    );
    setDisplayed(results?.slice(0, count));
    setButtonToggle(true);
  }

  useState(filters());

  return (
    <div className="bg-gray-50">
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
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-1 sm:text-sm rounded-none"
              placeholder="Bluza Natascha Navy"
              onChange={async (e) => {
                const { value } = e.currentTarget;
                const fuse = new Fuse(data, options);
                const tempResults = fuse.search(value);
                setResults(tempResults.map((result) => result.item));
                setDisplayed(results?.slice(0, count));
                setButtonToggle(true);
              }}
            />
          </div>

          <div>
            <p className="font-medium">Mărime</p>
            {collectedSizes?.map((item, refIndex) => (
              <span key={refIndex}>
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className=" h-4 w-4 text-yellow-600 border-gray-300 rounded"
                  onClick={() => checkSize({ item })}
                />
                <label> {item} </label>
              </span>
            ))}
            <p className="font-medium">Preț</p>
            <span>
              <input
                id="input2"
                name="input2"
                placeholder="bugetul tau"
                type="text"
                className="p-1 shadow-sm rounded"
                onChange={(e) => {
                  checkPrice(e.target.value);
                }}
              />
            </span>
            <p className="font-medium">Brand</p>
            {collectedBrands?.map((item, refIndex) => (
              <span key={refIndex}>
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="focus:bg-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                  onClick={() => checkBrand({ item })}
                />
                <label> {item} </label>
              </span>
            ))}
            <p className="font-medium">Tip produs</p>
            {collectedCategories?.map((item, refIndex) => (
              <span key={refIndex}>
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="focus:bg-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded"
                  onClick={() => checkCategory({ item })}
                />
                <label> {item} </label>
              </span>
            ))}
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
                  <h3 className="text-sm pb-1 text-gray-700">
                    <a className="font-medium" href={item.siteURL}>
                      <span aria-hidden="true" className="absolute inset-0 ">
                        <span className="bg-white pb-1.5 pr-1.5 rounded-none">
                          {item.brand}
                        </span>
                      </span>
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-xs text-black">
                    {item.warehouseStock.map((subItem, subRefIndex) => (
                      <span key={subRefIndex}>
                        <span className="p-0.5 border border-1 border-gray-300">
                          {subItem.size}
                        </span>
                        {"⠀"}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm pt-2 font-medium text-yellow-500">
                    {item.price} lei
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2"></div>
        <button
          id="loadMore"
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
