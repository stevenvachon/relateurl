"use strict";
// @todo try https://npmjs.com/json-preserve-indent ?
const newData = require("./tests.json");
const orgData = require("./tests-bak.json");

for (let i=0; i<newData.length; i++)
{
  const newDatum = newData[i];

  for (let j=0; j<orgData.length; j++)
  {
    const orgDatum = orgData[j];

    if (orgDatum.base!==newDatum.base || orgDatum.url!==newDatum.url)
    {
      continue;
    }

    newDatum.related = orgDatum.related;

    break;
  }
}

require("fs").writeFileSync(
  `${__dirname}/tests.json`,
  JSON.stringify(newData, null, "\t") + "\n"
);
