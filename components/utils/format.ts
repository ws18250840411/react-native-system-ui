export const formatNumber = (
  value: string | number,
  options: {
    precision?: number;
    thousand?: string;
    decimal?: string;
  } = {}
): string => {
  const { precision = 2, thousand = ",", decimal = "." } = options;

  const num = Number(value);
  if (isNaN(num)) return String(value);

  const parts = num.toFixed(precision).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousand);

  return parts.join(decimal);
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};

export const formatBankCard = (card: string): string => {
  return card.replace(/(\d{4})(?=\d)/g, "$1 ");
};
