import {
  EnumOCFFileType,
  FileVestingTerms,
  ObjectVestingTerms,
  TypeVestingCondition,
} from "../ocf";
import { OcfFileData } from "../types";

const buildVestingConditions = (conditions: TypeVestingCondition[]) => {
  return conditions.map((condition) => {
    return {
      nextConditions: () => {
        return conditions.filter((cond) =>
          condition.next_condition_ids.includes(cond.id)
        );
      },
    };
  });
};

const buildVestingTerm = (item: ObjectVestingTerms) => {
  return {
    id: item.id,
    vestingConditions: buildVestingConditions(
      item.vesting_conditions as TypeVestingCondition[]
    ),
  };
};

export default (files: Record<EnumOCFFileType, OcfFileData>) => {
  const vestingTermsData = files["OCF_VESTING_TERMS_FILE"] as FileVestingTerms;
  return vestingTermsData.items.map(buildVestingTerm);
};
