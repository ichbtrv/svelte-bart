export const getColorVariant = (color: string): string => {
  const colorMap: Record<string, string> = {
    '#0099cc': 'border-[#0099cc]',
    '#ff9933': 'border-[#ff9933]',
    '#ffff33': 'border-[#ffff33]',
    '#339933': 'border-[#339933]',
    '#ff0000': 'border-[#ff0000]',
    '#9933cc': 'border-[#9933cc]'
  };

  return colorMap[color] || '';
};
