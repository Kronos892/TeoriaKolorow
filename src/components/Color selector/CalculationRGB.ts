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
    const maxColorValue = Math.max(red, green, blue);

    // Jeśli wszystkie składowe koloru są równe, zwróć środek układu
    if (maxColorValue === 0) {
        return { x: 170, y: 170 };
    }

    let angle = 0;

    if (maxColorValue === red) {
        angle = (green >= blue) ? 0 : 180;
    } else if (maxColorValue === green) {
        angle = (blue >= red) ? 120 : 60;
    } else {
        angle = (red >= green) ? 240 : 120;
    }

    // Dodaj obsługę koloru magenta
    if (red === 255 && green === 0 && blue === 255) {
        angle = 300;
    }

    const distanceFromCenter = Math.sqrt(Math.pow(red - 128, 2) + Math.pow(green - 128, 2) + Math.pow(blue - 128, 2));
    const normalizedDistance = distanceFromCenter / 255;

    const x = 170 + normalizedDistance * 170 * Math.cos(angle * (Math.PI / 180));
    const y = 170 - normalizedDistance * 170 * Math.sin(angle * (Math.PI / 180));

    return { x, y };
};

export default calculationRGB;
