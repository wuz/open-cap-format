import { OcfFiles, OcfFileData } from "../types";

export default (files: Record<OcfFiles, OcfFileData>) => {
  const transactionsData = files[OcfFiles.OCF_TRANSACTIONS_FILE];
  console.log(transactionsData);
  return transactionsData.items;
};
