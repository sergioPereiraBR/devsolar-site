export function formatPhoneValue(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return '';
  }

  const hasCountryPrefix = trimmedValue.startsWith('+');
  const hasLocalDDDFormat =
    trimmedValue.includes('(') || trimmedValue.includes(')');
  const digits = trimmedValue.replace(/\D/g, '');

  if (!digits) {
    return hasCountryPrefix ? '+' : '';
  }

  const useInternationalFormat =
    hasCountryPrefix || (!hasLocalDDDFormat && digits.length > 11);

  if (!useInternationalFormat) {
    const limitedDigits = digits.slice(0, 11);

    if (!limitedDigits) {
      return '';
    }

    if (limitedDigits.length <= 2) {
      return `(${limitedDigits}`;
    }

    if (limitedDigits.length <= 7) {
      return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`;
    }

    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`;
  }

  const countryCode = digits.slice(0, 2);
  const nationalDigits = digits.slice(2).slice(0, 11);

  if (!nationalDigits) {
    return `+${countryCode}`;
  }

  if (nationalDigits.length <= 2) {
    return `+${countryCode} ${nationalDigits}`;
  }

  if (nationalDigits.length <= 7) {
    return `+${countryCode} ${nationalDigits.slice(0, 2)} ${nationalDigits.slice(2)}`;
  }

  return `+${countryCode} ${nationalDigits.slice(0, 2)} ${nationalDigits.slice(2, 7)}-${nationalDigits.slice(7)}`;
}
