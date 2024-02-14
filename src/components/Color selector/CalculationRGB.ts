

interface RGBColorPickerProps {
    red: number;
    green: number;
    blue: number;
}

interface Coordinates {
    x: number;
    y: number;
}

const calculationRGB = ({ red, green, blue }: RGBColorPickerProps): Coordinates => {
    // Wyliczenie kąta i promienia na podstawie składowych RGB
    const angle = Math.atan2(green - blue, red - green);
    const radius = Math.sqrt(Math.pow(red, 2) + Math.pow(green, 2) + Math.pow(blue, 2));

    // Przekształcanie współrzędnych biegunowych na kartezjańskie
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { x, y };
};

export default calculationRGB;