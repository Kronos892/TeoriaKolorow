// Interface for RGB color properties
interface RGBColorPickerProps {
    red: number;
    green: number;
    blue: number;
    
}

// Interface for 2D coordinates
interface Coordinates {
    x: number;
    y: number;

}

// Function to calculate coordinates from RGB color values
const calculationRGB = ({ red, green, blue, }: RGBColorPickerProps): Coordinates => {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const M = Math.max(r, g, b);
    const m = Math.min(r, g, b);
    const l = (M + m) / 2;

    
    let s, h;
    if (M === m) {
        s = 0;
        h = 0; // undefined hue when saturation is 0
        return {x : 170, y : 170};
    } else {
        s = l <= 0.5 ? (M - m) / (M + m) : (M - m) / (2 - M - m);
        switch (M) {
            case r:
                h = ((g - b) / (M - m)) % 6;
                break;
            case g:
                h = ((b - r) / (M - m)) + 2;
                break;
            case b:
                h = ((r - g) / (M - m)) + 4;
                break;
            default:
                h = 0;
                break;
        }
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    let distance;
    if (s === 0) {
        // W przypadku achromatycznego koloru (szarość), ustalamy odległość na podstawie jasności
        distance = l * 170;
    } else {
        distance = (l <= 0.5 ? l : 1 - l) * 170; // Ustalamy odległość na podstawie jasności i nasycenia
    }

    const angleInRadians = (h * Math.PI) / 180;
    const x = 170 + distance * Math.cos(angleInRadians) * 2 ;
    const y = 170 - distance * Math.sin(angleInRadians) * 2 ;
    ;
    
    return { x, y };
};

export default calculationRGB