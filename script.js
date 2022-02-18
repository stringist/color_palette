"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");
    const colorPicker = document.querySelector("#color-picker");
    // const activeColor = colorPicker.value;
    colorPicker.addEventListener("input", updateColor);
    colorPicker.addEventListener("change", updateColor);
}

function updateColor(event) {
    const newColor = event.target.value;
    getHSLValues(newColor);
}

function getHSLValues(HEX) {
    const newRGB = hexToRGB(HEX);
    const HSL = rgbToHSL(newRGB);
    generateHSLPalette(HSL);
}

function generateHSLPalette(HSL) {
    const dropDown = document.querySelector("#harmony-dropdown");
    const dropDownValue = dropDown.options[dropDown.selectedIndex].value;
    if ((dropDownValue === "analogous")) {
        const analogousHSL = makeAnalogous(HSL);
        getRGB(analogousHSL);
    }

    if ((dropDownValue === "monochromatic")) {
        const monoChromatic = makeMonochromatic(HSL);
        displayPalette(monoChromatic)
    }

    if ((dropDownValue === "triad")) {
        const triad = makeTriad(HSL);
        displayPalette(triad)
    }

    if ((dropDownValue === "complementary")) {
        const complementary = makeComplementary(HSL);
        displayPalette(complementary)
    }

    if ((dropDownValue === "compound")) {
        const compound = makeCompound(HSL);
        displayPalette(compound);
    }

    if ((dropDownValue === "shades")) {
        const shades = makeShades(HSL);
        displayPalette(shades);
    }
}

function makeAnalogous(HSL) {
    const h = HSL.h;
    const s = HSL.s;
    const l = HSL.l;
    const baseColor = { h: h, s: s, l: l };
    const color2 = { h: h + 15, s: s, l: l };
    const color3 = { h: h + 30, s: s, l: l };
    const color4 = { h: h + 45, s: s, l: l };
    const color5 = { h: +60, s: s, l: l };
    const color6 = { h: +75, s: s, l: l }
        // console.log(baseColor, color2, color3, color4, color5, color6);
    return [baseColor, color2, color3, color4, color5, color6];
}

// function makeMonochromatic(HSL) {
//     const h = HSL.h;
//     const s = HSL.s;
//     const l = HSL.l;
//     const color2 = { h: , s: , l: }
//     const color3 = { h: , s: , l: }
//     const color4 = { h: , s: , l: }
//     const color5 = { h: , s: , l: }
//     return { baseColor, color2, color3, color4, color5 }
// }

// function makeTriad(HSL) {
//     const h = HSL.h;
//     const s = HSL.s;
//     const l = HSL.l;
//     const color2 = { h: , s: , l: }
//     const color3 = { h: , s: , l: }
//     const color4 = { h: , s: , l: }
//     const color5 = { h: , s: , l: }
//     return { baseColor, color2, color3, color4, color5 }
// }

// function makeComplementary(HSL) {
//     const h = HSL.h;
//     const s = HSL.s;
//     const l = HSL.l;
//     const color2 = { h: , s: , l: }
//     const color3 = { h: , s: , l: }
//     const color4 = { h: , s: , l: }
//     const color5 = { h: , s: , l: }
//     return { baseColor, color2, color3, color4, color5 }
// }

// function makeCompound(HSL) {
//     const h = HSL.h;
//     const s = HSL.s;
//     const l = HSL.l;
//     const color2 = { h: , s: , l: }
//     const color3 = { h: , s: , l: }
//     const color4 = { h: , s: , l: }
//     const color5 = { h: , s: , l: }
//     return { baseColor, color2, color3, color4, color5 }
// }

// function makeShades(HSL) {
//     const h = HSL.h;
//     const s = HSL.s;
//     const l = HSL.l;
//     const color2 = { h: , s: , l: }
//     const color3 = { h: , s: , l: }
//     const color4 = { h: , s: , l: }
//     const color5 = { h: , s: , l: }
//     return { baseColor, color2, color3, color4, color5 }
// }

function displayPalette(RGBArr, HSLArr) {
    const HEXArr = RGBArr.map(RGBArr => { return rgbToHex(RGBArr); });
    const CSSArr = RGBArr.map(RGBArr => { return rgbToCSSString(RGBArr); });
    // color squares
    document.querySelector("#base-color-square").style.backgroundColor = CSSArr[0];
    document.querySelector("#color2-square").style.backgroundColor = CSSArr[1];
    document.querySelector("#color3-square").style.backgroundColor = CSSArr[2];
    document.querySelector("#color4-square").style.backgroundColor = CSSArr[3];
    document.querySelector("#color5-square").style.backgroundColor = CSSArr[4];
    document.querySelector("#color6-square").style.backgroundColor = CSSArr[5];
    // color values
    document.querySelector("#base-color-values .HEX").textContent = "HEX: " + HEXArr[0].toUpperCase();
    document.querySelector("#base-color-values .RGB").textContent = "RGB: " + rgbObjToString(RGBArr[0]);
    document.querySelector("#base-color-values .HSL").textContent = "HSL: " + hslObjToString(HSLArr[0]);




}

function getRGB(HSLArr) {
    console.log(HSLArr);
    const RGBArr = HSLArr.map((HSLArr) => { return hslToRGB(HSLArr) });
    displayPalette(RGBArr, HSLArr);
}


function hexToRGB(hexString) {
    // console.log(hexString);
    const r = parseInt(hexString.substring(1, 3), 16);
    const g = parseInt(hexString.substring(3, 5), 16);
    const b = parseInt(hexString.substring(5, 7), 16);
    // console.log(r, g, b);
    return { r, g, b };
}

function rgbToHex(rgbObject) {
    const hexCode =
        "#" +
        rgbObject.r.toString(16) +
        rgbObject.g.toString(16) +
        rgbObject.b.toString(16);
    return hexCode;
}

function rgbToCSSString(rgb) {
    const cssString = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    return cssString;
}

function cssToRGB(cssString) {
    let cssNumbers = cssString
        .substring(4, cssString.lastIndexOf(`)`))
        .split(", ");

    const r = parseInt(cssNumbers[0]);
    const g = parseInt(cssNumbers[1]);
    const b = parseInt(cssNumbers[2]);

    return { r, g, b };
}

function rgbToHSL(rgb) {

    const r = rgb.r /= 255;
    const g = rgb.g /= 255;
    const b = rgb.b /= 255;


    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / Math.min(l, 1 - l);
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    console.log("hsl(%f,%f%,%f%)", h, s, l);
    // let roundedH = Math.floor(h);
    // let roundedS = Math.floor(s);
    // let roundedL = Math.floor(l);
    // // move the rouding so it only affects the displayed values
    // return { roundedH, roundedS, roundedL };
    return { h, s, l }
}

function rgbObjToString(rgbObj) {
    const rgbString = rgbObj.r + " " + rgbObj.g + " " + rgbObj.b;
    return rgbString;
}

function hslObjToString(hslObj) {
    const h = Math.floor(hslObj.h);
    const s = Math.floor(hslObj.s);
    const l = Math.floor(hslObj.l);
    return `${h} ${s} ${l}`;
}

function hslToRGB(HSL) {
    // console.log(HSL);
    const h = HSL.h;
    const s = HSL.s / 100;
    const l = HSL.l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    if (r > 255)
        r = 255;
    else if (r < 0)
        r = 0;
    console.log({ r, g, b });
    return { r, g, b };
}