import StreamZip from "node-stream-zip";
import transactions from "../transactions";
import vestingTerms from "../vesting_terms";
import { OcfFileData } from "../types";
import { parseOcfFile } from "../utils";
import validator from "../validator";
import { EnumOCFFileType, OCFManifestFile } from "../ocf";

type OCFReaderOutput = {
  files: Record<EnumOCFFileType, OcfFileData>;
  issuerLegalName: string;
  issuerDba?: string;
  issuerName: string;
  transactions?: object[];
  vestingTerms?: object[];
};

export default async (file: string): Promise<OCFReaderOutput> => {
  const zip = new StreamZip.async({ file });
  const valid = await validator(zip);
  if (!valid) throw new Error("OCF file is not valid!");
  const files = await parseOcfFile(zip);
  await zip.close();
  const {
    issuer: { legal_name: issuerLegalName, dba: issuerDba },
  } = files["OCF_MANIFEST_FILE"] as OCFManifestFile;
  return {
    files,
    issuerLegalName,
    issuerDba,
    issuerName: issuerDba ?? issuerLegalName,
    // transactions: transactions(files),
    vestingTerms: vestingTerms(files),
  };
};
