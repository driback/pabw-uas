import path from "path";
import { promises as fs } from "fs";
import { parseString } from "xml2js";
import { parse } from "papaparse";

export default async function handler(req, res) {
  if (req?.method !== "GET") {
    res?.status(400)?.json({ msg: "Something went wrong" });
    return;
  }

  const { id } = req?.query;

  const rgx = /^(cars-csv|cars-json|cars-xml)$/g;
  const isMatch = id?.match(rgx);

  if (!isMatch) {
    res?.status(400)?.json({ msg: "Something went wrong" });
    return;
  }

  const dataDirectory = path.join(process.cwd(), "public/data");

  try {
    if (id === "cars-json") {
      const jsonContent = await fs.readFile(
        dataDirectory + "/cars.json",
        "utf8"
      );
      const objectData = JSON.parse(jsonContent);
      res?.send({ data: objectData });
      return;
    }

    if (id === "cars-xml") {
      let xmlData = null;
      const xmlContent = await fs.readFile(dataDirectory + "/cars.xml", "utf8");
      parseString(
        xmlContent,
        { trim: true, explicitArray: false },
        function (err, result) {
          const datas = result?.root?.row;
          return (xmlData = datas.slice(1));
        }
      );
      res?.send({ data: xmlData });
      return;
    }

    let csvData = null;
    const csvContent = await fs.readFile(dataDirectory + "/cars.csv", "utf8");
    parse(csvContent, {
      skipEmptyLines: true,
      header: true,
      complete: function (results) {
        return (csvData = results?.data);
      },
    });

    res?.send({ data: csvData });
    return;
  } catch (error) {
    console.log({ error });
    res?.send({ error });
  }
}
