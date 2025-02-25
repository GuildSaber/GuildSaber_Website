import { EModifiers } from "@/enums/api/models/modifiers";

export const formatCommasNumber = (num: number) => {
  return new Intl.NumberFormat("en").format(num);
};

export const formatDurationSince = (start: number | undefined): string => {
  if (!start) {
    return "N/A";
  }

  const seconds = Math.floor((Date.now() - start * 1000) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
};

export const formatMinSec = (seconds: number) => {
  return (
    (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ":" : ":0") + seconds
  );
};

export const formatAccuracy = (
  baseScore: number | undefined,
  maxScore: number | undefined,
) => {
  if (!baseScore || !maxScore) {
    return "N/A";
  }

  return ((baseScore / maxScore) * 100).toFixed(2) + "%";
};

export const formatHMD = (hmd: number | undefined): string => {
  if (!hmd) {
    return "Unknown";
  }

  return (
    {
      1: "Rift CV1",
      16: "Rift S",
      32: "Quest 1",
      256: "Quest 2",
      512: "Quest 3",
      513: "Quest 3S",
      2: "Vive",
      4: "Vive Pro",
      128: "Vive Cosmos",
      8: "WMR",
      33: "Pico Neo 3",
      34: "Pico Neo 2",
      35: "Vive Pro 2",
      36: "Vive Elite",
      37: "Miramar",
      38: "Pimax 8K",
      39: "Pimax 5K",
      40: "Pimax Artisan",
      41: "HP Reverb",
      42: "Samsung WMR",
      43: "Qiyu Dream",
      44: "Disco",
      45: "Lenovo Explorer",
      46: "Acer WMR",
      47: "Vive Focus",
      48: "Arpara",
      49: "Dell Visor",
      50: "E3",
      51: "HTC Vive DVT",
      52: "Glasses 2.0",
      53: "Hedy",
      54: "Vaporeon",
      55: "Huawei VR",
      56: "Asus WMR",
      57: "CloudXR",
      58: "VRidge",
      59: "Medion",
      60: "Pico Neo 4",
      61: "Quest Pro",
      62: "Pimax Crystal",
      63: "E4",
      64: "Valve Index",
      65: "Controllable",
      66: "Big Screen Beyond",
      67: "Nolo Sonic",
      68: "Hypereal",
      69: "Varjo Aero",
      70: "PSVR 2",
      71: "Megane 1",
      72: "Varjo XR-3",
    }[hmd] ?? "Unknown"
  );
};

export const formatModifiers = (modifiers: EModifiers): ModifierShort[] => {
  const modList: ModifierShort[] = [];
  if (modifiers & EModifiers.NoObstacles) modList.push("NO");
  if (modifiers & EModifiers.NoBombs) modList.push("NB");
  if (modifiers & EModifiers.NoFail) modList.push("NF");
  if (modifiers & EModifiers.SlowerSong) modList.push("SS");
  if (modifiers & EModifiers.BatteryEnergy) modList.push("BE");
  if (modifiers & EModifiers.InstaFail) modList.push("IF");
  if (modifiers & EModifiers.SmallNotes) modList.push("SC");
  if (modifiers & EModifiers.ProMode) modList.push("PM");
  if (modifiers & EModifiers.FasterSong) modList.push("FS");
  if (modifiers & EModifiers.StrictAngles) modList.push("SA");
  if (modifiers & EModifiers.DisappearingArrows) modList.push("DA");
  if (modifiers & EModifiers.GhostNotes) modList.push("GN");
  if (modifiers & EModifiers.NoArrows) modList.push("NA");
  if (modifiers & EModifiers.SuperFastSong) modList.push("SF");
  if (modifiers & EModifiers.OldDots) modList.push("OD");
  if (modifiers & EModifiers.OffPlatform) modList.push("OP");
  if (modifiers & EModifiers.Unk) modList.push("UNK");
  return modList;
};

export const formatModifierShortToLong = (modifier: ModifierShort) => {
  return (
    {
      NO: "No Obstacles",
      NB: "No Bombs",
      NF: "No Fail",
      SS: "Slower Song",
      BE: "Battery Energy",
      IF: "Insta Fail",
      SC: "Small Notes",
      PM: "Pro Mode",
      FS: "Faster Song",
      SA: "Strict Angles",
      DA: "Disappearing Arrows",
      GN: "Ghost Notes",
      NA: "No Arrows",
      SF: "Super Fast Song",
      OD: "Old Dots",
      OP: "Off Platform",
      UNK: "Unknown",
    }[modifier] ?? "Unknown"
  );
};

export type ModifierShort =
  | "NO"
  | "NB"
  | "NF"
  | "SS"
  | "BE"
  | "IF"
  | "SC"
  | "PM"
  | "FS"
  | "SA"
  | "DA"
  | "GN"
  | "NA"
  | "SF"
  | "OD"
  | "OP"
  | "UNK";

export const formatDifficulty: Record<string, string> = {
  1: "easy",
  3: "normal",
  5: "hard",
  7: "expert",
  9: "expert-plus",
};
