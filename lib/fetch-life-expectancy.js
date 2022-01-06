const axios = require("axios");
const fs = require("fs");

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const url =
  "https://apps.who.int/gho/athena/api/download/life_expectancy.json?target=GHO/WHOSIS_000001&format=json&profile=simple";

async function main() {
  const res = await axios(url);

  const data = res.data.fact.reduce((acc, curr) => {
    const country = curr.dim.COUNTRY;
    const value = curr.Value;
    if (country && value) {
      acc[country] = {
        country,
        lifeExpectancy: parseInt(value),
      };
    }

    return acc;
  }, {});

  storeData(data, "data/life_expectancy.json");
}

main();
