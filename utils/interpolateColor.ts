export const interpolateColor = (startColor: string, endColor: string, factor: number): string => {
    const result = startColor.slice(1).match(/.{2}/g)!.map((hex, i) => {
      return Math.round(parseInt(hex, 16) + (parseInt(endColor.slice(1).match(/.{2}/g)![i], 16) - parseInt(hex, 16)) * factor)
        .toString(16)
        .padStart(2, '0');
    });
    return `#${result.join('')}`;
  };