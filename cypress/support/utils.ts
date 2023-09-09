export function hexToRgb(hex: string) {
    const rValue = parseInt(hex.substring(1, 3), 16);
    const gValue = parseInt(hex.substring(3, 5), 16);
    const bValue = parseInt(hex.substring(5), 16);
    return `rgb(${rValue}, ${gValue}, ${bValue})`;
}