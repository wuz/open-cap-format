import {
  FileStakeholders,
  FileStockClasses,
  FileStockLegendTemplates,
  FileStockPlans,
  FileTransactions,
  FileValuations,
  FileVestingTerms,
  OCFManifestFile,
} from "./ocf";

export enum OcfFiles {
  OCF_MANIFEST_FILE = "Manifest.ocf.json",
  OCF_STAKEHOLDERS_FILE = "Stakeholders.ocf.json",
  OCF_STOCK_CLASSES_FILE = "StockClasses.ocf.json",
  OCF_STOCK_LEGEND_TEMPLATES_FILE = "StockLegends.ocf.json",
  OCF_STOCK_PLANS_FILE = "StockPlans.ocf.json",
  OCF_TRANSACTIONS_FILE = "Transactions.ocf.json",
  OCF_VALUATIONS_FILE = "Valuations.ocf.json",
  OCF_VESTING_TERMS_FILE = "VestingTerms.ocf.json",
}

export type Issuer = {
  legal_name: string;
  dba: string;
};

export type OcfFileData =
  | OCFManifestFile
  | FileStakeholders
  | FileStockClasses
  | FileStockLegendTemplates
  | FileStockPlans
  | FileTransactions
  | FileValuations
  | FileVestingTerms;
