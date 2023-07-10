import path from "path";
import ocf from "../src";

const OCF_PATH = path.join(__dirname, "./sample/ACME.ocf.zip");

test("runs reader", async () => {
  const { files, issuerLegalName, issuerName, transactions } = await ocf.reader(
    OCF_PATH
  );
  expect(Object.keys(files)).toContain("Manifest.ocf.json");
  expect(issuerLegalName).toBe("ACME Industries");
  expect(issuerName).toBe("ACME & Co");
  expect(transactions).toContainEqual({
    object_type: "TX_CONVERTIBLE_ACCEPTANCE",
    id: "test-convertible-acceptance-minimal",
    security_id: "2936wa8yefhdsvcn",
    date: "2022-01-20",
  });
});
