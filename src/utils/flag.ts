export function getFlagStrings<T>(
  values: number | undefined,
  enumType: T,
): string[] {
  if (!values) {
    return [];
  }

  let result: string[] = [];

  for (let enumMember in enumType) {
    let enumValue = Number(enumMember);
    if (!isNaN(enumValue) && (values & enumValue) !== 0) {
      result.push(enumType[enumValue as keyof T] as string);
    }
  }

  return result;
}

export function hasAnyFlag<T>(values: number | undefined, flags: T): boolean {
  return ((values ?? 0) & Number(flags)) != 0;
}

export function hasAllFlags<T>(values: number | undefined, flags: T): boolean {
  return ((values ?? 0) & Number(flags)) == Number(flags);
}
