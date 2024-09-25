function updateColorFromRGB() {
	const r = Math.max(0, Math.min(255, parseInt(document.querySelector('.rect-r').value) || 0));
	const g = Math.max(0, Math.min(255, parseInt(document.querySelector('.rect-g').value) || 0));
	const b = Math.max(0, Math.min(255, parseInt(document.querySelector('.rect-b').value) || 0));

	if (r !== parseInt(document.querySelector('.rect-r').value) ||
		g !== parseInt(document.querySelector('.rect-g').value) ||
		b !== parseInt(document.querySelector('.rect-b').value)) {
		showWarning('RGB значения были обрезаны до диапазона [0, 255]');
	}

	const colorDisplay = document.querySelector('.color-display');
	colorDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

	const cmyk = rgbToCmyk(r, g, b);
	updateCMYKFields(cmyk.c, cmyk.m, cmyk.y, cmyk.k);

	const lab = rgbToLab(r, g, b);
	updateLabFields(lab.l, lab.a, lab.b);
}

function updateColorFromCMYK() {
	const c = Math.max(0, Math.min(1, parseFloat(document.querySelector('.rect-c').value) || 0));
	const m = Math.max(0, Math.min(1, parseFloat(document.querySelector('.rect-m').value) || 0));
	const y = Math.max(0, Math.min(1, parseFloat(document.querySelector('.rect-y').value) || 0));
	const k = Math.max(0, Math.min(1, parseFloat(document.querySelector('.rect-k').value) || 0));

	if (c !== parseFloat(document.querySelector('.rect-c').value) ||
		m !== parseFloat(document.querySelector('.rect-m').value) ||
		y !== parseFloat(document.querySelector('.rect-y').value) ||
		k !== parseFloat(document.querySelector('.rect-k').value)) {
		showWarning('CMYK значения были обрезаны до диапазона [0, 1]');
	}

	const rgb = cmykToRgb(c, m, y, k);
	updateRGBFields(rgb.r, rgb.g, rgb.b);

	const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
	updateLabFields(lab.l, lab.a, lab.b);
}

function updateColorFromLab() {
	const l = Math.max(0, Math.min(100, parseFloat(document.querySelector('.rect-l').value) || 0));
	const a = Math.max(-128, Math.min(127, parseFloat(document.querySelector('.rect-a').value) || 0));
	const b = Math.max(-128, Math.min(127, parseFloat(document.querySelector('.rect-bb').value) || 0));

	if (l !== parseFloat(document.querySelector('.rect-l').value) ||
		a !== parseFloat(document.querySelector('.rect-a').value) ||
		b !== parseFloat(document.querySelector('.rect-bb').value)) {
		showWarning('Lab значения были обрезаны до допустимого диапазона');
	}

	const rgb = labToRgb(l, a, b);
	updateRGBFields(rgb.r, rgb.g, rgb.b);

	const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
	updateCMYKFields(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
}

function updateRGBFields(r, g, b) {
	document.querySelector('.rect-r').value = r;
	document.querySelector('.rect-g').value = g;
	document.querySelector('.rect-b').value = b;
	document.querySelector('.slide-r').value = r;
	document.querySelector('.slide-g').value = g;
	document.querySelector('.slide-b').value = b;

	const colorDisplay = document.querySelector('.color-display');
	colorDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function updateCMYKFields(c, m, y, k) {
	document.querySelector('.rect-c').value = c.toFixed(2);
	document.querySelector('.rect-m').value = m.toFixed(2);
	document.querySelector('.rect-y').value = y.toFixed(2);
	document.querySelector('.rect-k').value = k.toFixed(2);
	document.querySelector('.slide-c').value = c.toFixed(2);
	document.querySelector('.slide-m').value = m.toFixed(2);
	document.querySelector('.slide-y').value = y.toFixed(2);
	document.querySelector('.slide-k').value = k.toFixed(2);
}

function updateLabFields(l, a, b) {
	document.querySelector('.rect-l').value = l.toFixed(2);
	document.querySelector('.rect-a').value = a.toFixed(2);
	document.querySelector('.rect-bb').value = b.toFixed(2);
	document.querySelector('.slide-l').value = l.toFixed(2);
	document.querySelector('.slide-a').value = a.toFixed(2);
	document.querySelector('.slide-bb').value = b.toFixed(2);
}

function rgbToCmyk(r, g, b) {
	const c = 1 - (r / 255);
	const m = 1 - (g / 255);
	const y = 1 - (b / 255);
	const k = Math.min(c, m, y);

	if (k === 1) {
		return { c: 0, m: 0, y: 0, k: 1 };
	}

	return {
		c: (c - k) / (1 - k),
		m: (m - k) / (1 - k),
		y: (y - k) / (1 - k),
		k: k
	};
}

function cmykToRgb(c, m, y, k) {
	const r = 255 * (1 - c) * (1 - k);
	const g = 255 * (1 - m) * (1 - k);
	const b = 255 * (1 - y) * (1 - k);

	return {
		r: Math.round(r),
		g: Math.round(g),
		b: Math.round(b)
	};
}

function labToRgb(l, a, b) {
	let y = (l + 16) / 116;
	let x = a / 500 + y;
	let z = y - b / 200;

	const epsilon = 0.008856;

	x = Math.pow(x, 3) > epsilon ? Math.pow(x, 3) : (x - 16 / 116) / 7.787;
	y = Math.pow(y, 3) > epsilon ? Math.pow(y, 3) : (y - 16 / 116) / 7.787;
	z = Math.pow(z, 3) > epsilon ? Math.pow(z, 3) : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100.000;
	z *= 108.883;

	x /= 100;
	y /= 100;
	z /= 100;

	let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	let bb = x * 0.0557 + y * -0.2040 + z * 1.0570;

	r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
	g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
	bb = bb > 0.0031308 ? 1.055 * Math.pow(bb, 1 / 2.4) - 0.055 : 12.92 * bb;

	r = Math.min(Math.max(0, r * 255), 255);
	g = Math.min(Math.max(0, g * 255), 255);
	bb = Math.min(Math.max(0, bb * 255), 255);

	return {
		r: Math.round(r),
		g: Math.round(g),
		b: Math.round(bb)
	};
}


function rgbToLab(r, g, b) {
	let rNorm = r / 255;
	let gNorm = g / 255;
	let bNorm = b / 255;

	rNorm = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
	gNorm = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
	bNorm = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

	let x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375;
	let y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.0721750;
	let z = rNorm * 0.0193339 + gNorm * 0.1191920 + bNorm * 0.9503041;

	x /= 0.95047;
	y /= 1.00000;
	z /= 1.08883;

	x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

	let l = (116 * y) - 16;
	let a = 500 * (x - y);
	let bVal = 200 * (y - z);

	return {l: l, a: a, b: bVal};
}


function rgbclick() {
	const r = document.querySelector('.rect-r').value;
	const g = document.querySelector('.rect-g').value;
	const b = document.querySelector('.rect-b').value;

	document.querySelector('.slide-r').value = r;
	document.querySelector('.slide-g').value = g;
	document.querySelector('.slide-b').value = b;

	updateColorFromRGB();
}

function rgbslide() {
	const r = document.querySelector('.slide-r').value;
	const g = document.querySelector('.slide-g').value;
	const b = document.querySelector('.slide-b').value;

	document.querySelector('.rect-r').value = r;
	document.querySelector('.rect-g').value = g;
	document.querySelector('.rect-b').value = b;

	updateColorFromRGB();
}

function cmykclick() {
	const c = document.querySelector('.rect-c').value;
	const m = document.querySelector('.rect-m').value;
	const y = document.querySelector('.rect-y').value;
	const k = document.querySelector('.rect-k').value;

	document.querySelector('.slide-c').value = c;
	document.querySelector('.slide-m').value = m;
	document.querySelector('.slide-y').value = y;
	document.querySelector('.slide-k').value = k;

	updateColorFromCMYK();
}

function cmykslide() {
	const c = document.querySelector('.slide-c').value;
	const m = document.querySelector('.slide-m').value;
	const y = document.querySelector('.slide-y').value;
	const k = document.querySelector('.slide-k').value;

	document.querySelector('.rect-c').value = c;
	document.querySelector('.rect-m').value = m;
	document.querySelector('.rect-y').value = y;
	document.querySelector('.rect-k').value = k;

	updateColorFromCMYK();
}

function labclick() {
	const l = document.querySelector('.rect-l').value;
	const a = document.querySelector('.rect-a').value;
	const bb = document.querySelector('.rect-bb').value;

	document.querySelector('.slide-l').value = l;
	document.querySelector('.slide-a').value = a;
	document.querySelector('.slide-bb').value = bb;

	updateColorFromLab();
}

function labslide() {
	const l = document.querySelector('.slide-l').value;
	const a = document.querySelector('.slide-a').value;
	const bb = document.querySelector('.slide-bb').value;

	document.querySelector('.rect-l').value = l;
	document.querySelector('.rect-a').value = a;
	document.querySelector('.rect-bb').value = bb;

	updateColorFromLab();
}

function selectPaletteColor(color) {
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);

	updateRGBFields(r, g, b);

	const cmyk = rgbToCmyk(r, g, b);
	updateCMYKFields(cmyk.c, cmyk.m, cmyk.y, cmyk.k);

	const lab = rgbToLab(r, g, b);
	updateLabFields(lab.l, lab.a, lab.b);
}

function validateInput(inputElement) {
	const min = parseFloat(inputElement.min);
	const max = parseFloat(inputElement.max);
	let value = parseFloat(inputElement.value);

	if (isNaN(value)) {
		value = min;
	} else if (value < min) {
		value = min;
	} else if (value > max) {
		value = max;
	}

	inputElement.value = value;

	if (value < min || value > max) {
		inputElement.setCustomValidity(`Please enter a number between ${min} and ${max}`);
	} else {
		inputElement.setCustomValidity('');
	}

	inputElement.reportValidity();
}

document.querySelectorAll('input[type="number"]').forEach((inputElement) => {
	inputElement.addEventListener('input', () => validateInput(inputElement));
});

function showWarning(message) {
	const warningElement = document.querySelector('.warning-message');
	if (warningElement) {
		warningElement.textContent = message;
		warningElement.style.display = 'block';
		setTimeout(() => {
			warningElement.style.display = 'none';
		}, 3000);
	}
}