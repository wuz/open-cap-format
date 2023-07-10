import path from "path";
export const SCHEMA_PATH = path.resolve(__dirname, "./schema");

export const OCF_MANIFEST_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/OCFManifestFile.schema.json";

export const OCF_TRANSACTIONS_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/TransactionsFile.schema.json";

export const OCF_STAKEHOLDERS_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/StakeholdersFile.schema.json";

export const OCF_STOCK_PLANS_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/StockPlansFile.schema.json";

export const OCF_VALUATIONS_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/ValuationsFile.schema.json";

export const OCF_VESTING_TERMS_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/VestingTermsFile.schema.json";

export const OCF_STOCK_CLASSES_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/StockClassesFile.schema.json";

export const OCF_STOCK_LEGEND_TEMPLATES_FILE_SCHEMA_URI =
  "https://opencaptablecoalition.com/schema/files/StockLegendTemplatesFile.schema.json";

export const URI_LOOKUP_FOR_FILE_TYPE = {
  OCF_MANIFEST_FILE: OCF_MANIFEST_FILE_SCHEMA_URI,
  OCF_STAKEHOLDERS_FILE: OCF_STAKEHOLDERS_FILE_SCHEMA_URI,
  OCF_STOCK_CLASSES_FILE: OCF_STOCK_CLASSES_FILE_SCHEMA_URI,
  OCF_STOCK_LEGEND_TEMPLATES_FILE: OCF_STOCK_LEGEND_TEMPLATES_FILE_SCHEMA_URI,
  OCF_STOCK_PLANS_FILE: OCF_STOCK_PLANS_FILE_SCHEMA_URI,
  OCF_TRANSACTIONS_FILE: OCF_TRANSACTIONS_FILE_SCHEMA_URI,
  OCF_VALUATIONS_FILE: OCF_VALUATIONS_FILE_SCHEMA_URI,
  OCF_VESTING_TERMS_FILE: OCF_VESTING_TERMS_FILE_SCHEMA_URI,
};
