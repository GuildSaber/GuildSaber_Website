import { RankedMap } from "@/types/api/models/rankedTypes";
import { formatModifiers } from "@/utils/format";

type RequirementKeyMap = {
  [key: string]: keyof RankedMap["requirements"];
};

const keyMap: RequirementKeyMap = {
  "Need Confirmation": "doesNeedConfirmation",
  FullCombo: "doesNeedFullCombo",
  "Max Pause Duration": "maxPauseDuration",
  Allowed: "mandatoryModifiers",
  "Non Allowed": "prohibitedModifiers",
  "Min Accuracy": "minAccuracy",
};

export const formatMapRequirements = (
  requirements: RankedMap["requirements"],
): Record<string, string | number | boolean> => {
  const parsedRequirements: Record<string, string | number> = {};

  for (const newKey in keyMap) {
    const oldKey = keyMap[newKey];
    const value = requirements[oldKey];

    if (typeof value === "boolean") {
      if (!value) {
        continue;
      }

      parsedRequirements[newKey] = "Yes";

      continue;
    }

    if (oldKey === "prohibitedModifiers" || oldKey === "mandatoryModifiers") {
      const modifiers = formatModifiers(value);

      if (!modifiers.length) {
        continue;
      }

      parsedRequirements[newKey] = modifiers.join(" | ");

      continue;
    }

    if (oldKey === "minAccuracy") {
      if (value <= 0) {
        continue;
      }

      parsedRequirements[newKey] = `${value}%`;

      continue;
    }

    if (oldKey === "maxPauseDuration") {
      if (value === -1.0) {
        continue;
      }

      parsedRequirements[newKey] = `${value}s`;

      continue;
    }

    parsedRequirements[newKey] = value;
  }

  return parsedRequirements;
};
