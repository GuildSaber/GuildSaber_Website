export function formatLargeNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatDurationSince(start: number): string {
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
}

export function formatHMD(hmd: number): string {
  return (
    {
      1: "Rift CV1",
      16: "Rift S",
      32: "Quest 1",
      256: "Quest 2",
      512: "Quest 3",
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
    }[hmd] ?? "Unknown"
  );
}

export function formatModifiers(modifiers: number): ModifierShort[] {
  const modList: ModifierShort[] = [];
  if (modifiers & (1 << 0)) modList.push("NO");
  if (modifiers & (1 << 1)) modList.push("NB");
  if (modifiers & (1 << 2)) modList.push("NF");
  if (modifiers & (1 << 3)) modList.push("SS");
  if (modifiers & (1 << 4)) modList.push("BE");
  if (modifiers & (1 << 5)) modList.push("IF");
  if (modifiers & (1 << 6)) modList.push("SC");
  if (modifiers & (1 << 7)) modList.push("PM");
  if (modifiers & (1 << 8)) modList.push("FS");
  if (modifiers & (1 << 9)) modList.push("SA");
  if (modifiers & (1 << 10)) modList.push("DA");
  if (modifiers & (1 << 11)) modList.push("GN");
  if (modifiers & (1 << 12)) modList.push("NA");
  if (modifiers & (1 << 13)) modList.push("SF");
  if (modifiers & (1 << 14)) modList.push("OD");
  if (modifiers & (1 << 15)) modList.push("OP");
  if (modifiers & (1 << 30)) modList.push("UNK");
  return modList;
}

export function formatModifierShort(modifier: ModifierShort) {
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
}

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

export const formatDifficulty: { [key: string]: string } = {
  1: "easy",
  3: "normal",
  5: "hard",
  7: "expert",
  9: "expert-plus",
};
