// ColorPositionCalculator.ts
const calculationHSL = (
    hue: number,
    adjustedSaturation: number,
    radius: number
): { x: number; y: number } => {
    const normalizedSaturation = adjustedSaturation / 100;
    const angle = (hue % 360) * (Math.PI / 180);
    const x = Math.cos(angle) * normalizedSaturation * radius + radius;
    const y = Math.sin(angle) * normalizedSaturation * radius + radius;
    return { x, y };
};

export default calculationHSL;

