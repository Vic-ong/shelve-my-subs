export const formatMoney = (v: number, dollar: string, decimals = 2): string => {
  return `${dollar} ${v.toFixed(decimals)}`;
};
