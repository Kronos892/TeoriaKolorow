declare module 'colorthief' {
    class ColorThief {
        constructor();
        getColor(source: HTMLImageElement, quality?: number): Promise<number[]>;
        getPalette(source: HTMLImageElement, colorCount?: number, quality?: number): Promise<number[][]>;
    }
    export = ColorThief;
}
declare module 'color' {
    class Color {
        constructor(color: string);

        rgbArray(): number[];
        hslArray(): number[];
        rgbaArray(): number[];
        hslaArray(): number[];
    }

    export default Color;
}
declare module 'node-vibrant' {
    class Vibrant {
        constructor(source: HTMLImageElement, options?: object);

        getPalette(): Promise<{ [key: string]: Color }>;
    }

    export default Vibrant;
}
declare module 'file-saver' {
    function saveAs(data: Blob, filename: string, options?: object): void;

    export {
        saveAs,
    };
}
