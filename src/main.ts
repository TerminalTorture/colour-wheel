// Fix CSS import
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  console.log("Color palette element exists:", !!document.getElementById('color-palette'));
  console.log("Harmony select element exists:", !!document.getElementById('harmony-type'));
  console.log("Harmony select element exists:", !!document.getElementById('harmony-type'));
  console.log("Canvas element exists:", !!document.getElementById('colour_wheel'));
  console.log("RGB display elements:", {
    r: !!document.getElementById('r'),
    g: !!document.getElementById('g'),
    b: !!document.getElementById('b')
  });
});

// Color harmony types
type HarmonyType = 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'monochromatic';

// Color representation
interface Color {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

function drawColourWheel(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  for (let angle = 0; angle < 360; angle++) {
    const startAngle = (angle - 1) * Math.PI / 180
    const endAngle = angle * Math.PI / 180

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, radius, startAngle, endAngle)
    ctx.closePath()

    ctx.fillStyle = `hsl(${angle}, 100%, 50%)`
    ctx.fill()
  }

  // Draw a center circle to indicate selection
  ctx.beginPath()
  ctx.arc(cx, cy, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.stroke()
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

// Generate a color palette based on the selected color and harmony type
function generatePalette(baseColor: Color, type: HarmonyType): Color[] {
  const palette: Color[] = [baseColor];
  const h = baseColor.h;
  const s = baseColor.s;
  const l = baseColor.l;
  
  switch (type) {
    case 'analogous':
      // Add colors that are 30° and 60° on either side
      palette.push(createColor((h + 30) % 360, s, l));
      palette.push(createColor((h + 60) % 360, s, l));
      palette.push(createColor((h + 330) % 360, s, l));
      palette.push(createColor((h + 300) % 360, s, l));
      break;
    case 'complementary':
      // Add complementary color and variants
      palette.push(createColor((h + 180) % 360, s, l));
      palette.push(createColor((h + 180) % 360, s * 0.8, l * 1.1));
      palette.push(createColor(h, s * 0.8, l * 1.1));
      palette.push(createColor(h, s * 0.7, l * 0.9));
      break;
    case 'triadic':
      // Add colors that are 120° apart
      palette.push(createColor((h + 120) % 360, s, l));
      palette.push(createColor((h + 240) % 360, s, l));
      palette.push(createColor((h + 120) % 360, s * 0.8, l * 0.9));
      palette.push(createColor((h + 240) % 360, s * 0.8, l * 0.9));
      break;
    case 'tetradic':
      // Add colors that form a rectangle in the color wheel
      palette.push(createColor((h + 90) % 360, s, l));
      palette.push(createColor((h + 180) % 360, s, l));
      palette.push(createColor((h + 270) % 360, s, l));
      break;
    case 'monochromatic':
      // Add lighter and darker variants of the same hue
      palette.push(createColor(h, s * 0.7, Math.min(l * 1.3, 100)));
      palette.push(createColor(h, s * 0.5, Math.min(l * 1.5, 100)));
      palette.push(createColor(h, s * 0.8, l * 0.7));
      palette.push(createColor(h, s * 0.9, l * 0.5));
      break;
  }
  
  return palette;
}

// Create a Color object with both HSL and RGB values
function createColor(h: number, s: number, l: number): Color {
  h = Math.round(h) % 360;
  s = Math.max(0, Math.min(100, Math.round(s)));
  l = Math.max(0, Math.min(100, Math.round(l)));
  
  const [r, g, b] = hslToRgb(h, s, l);
  return { h, s, l, r, g, b };
}

// Display the palette in the UI
function displayPalette(palette: Color[]) {
  const paletteContainer = document.getElementById('color-palette');
  if (!paletteContainer) return;
  
  paletteContainer.innerHTML = '';
  
  palette.forEach((color) => {
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    
    const colorInfo = document.createElement('div');
    colorInfo.className = 'color-info';
    colorInfo.innerHTML = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
    
    colorBox.appendChild(colorInfo);
    paletteContainer.appendChild(colorBox);
  });
}

// Update RGB display
function updateRgbDisplay(color: Color) {
  const rElement = document.getElementById('r');
  const gElement = document.getElementById('g');
  const bElement = document.getElementById('b');
  
  if (rElement) rElement.textContent = `R: ${color.r}`;
  if (gElement) gElement.textContent = `G: ${color.g}`;
  if (bElement) bElement.textContent = `B: ${color.b}`;
}

const canvas = document.getElementById("colour_wheel") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!canvas || !ctx) {
  console.error("Canvas not found");
} else {
  canvas.width = 500;
  canvas.height = 500;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  
  // Initial draw
  drawColourWheel(ctx, centerX, centerY, radius);
  
  let selectedColor: Color = createColor(0, 100, 50);
  let currentHarmony: HarmonyType = 'analogous';
  
  // Initialize the palette on page load
  updateRgbDisplay(selectedColor);
  displayPalette(generatePalette(selectedColor, currentHarmony));
  
  // Draw selected point indicator on the wheel for initial color
  const angle = selectedColor.h;
  const distance = (selectedColor.s / 100) * radius;
  const selectedX = centerX + Math.cos(angle * Math.PI / 180) * distance;
  const selectedY = centerY + Math.sin(angle * Math.PI / 180) * distance;
  ctx.beginPath();
  ctx.arc(selectedX, selectedY, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Handle mouse move
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate distance from center and angle
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only update if inside the wheel
    if (distance <= radius) {
      // Calculate angle (hue)
      let angle = Math.atan2(dy, dx) * 180 / Math.PI;
      if (angle < 0) angle += 360;
      
      // Calculate saturation based on distance from center
      const saturation = Math.min(100, (distance / radius) * 100);
      
      const color = createColor(angle, saturation, 50);
      updateRgbDisplay(color);
    }
  });
  
  // Handle click to select a color
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= radius) {
      let angle = Math.atan2(dy, dx) * 180 / Math.PI;
      if (angle < 0) angle += 360;
      
      const saturation = Math.min(100, (distance / radius) * 100);
      
      selectedColor = createColor(angle, saturation, 50);
      updateRgbDisplay(selectedColor);
      
      // Generate and display palette
      const palette = generatePalette(selectedColor, currentHarmony);
      displayPalette(palette);
      
      // Mark the selected point on the color wheel
      drawColourWheel(ctx, centerX, centerY, radius);
      ctx.beginPath();
      const selectedX = centerX + Math.cos(angle * Math.PI / 180) * (distance);
      const selectedY = centerY + Math.sin(angle * Math.PI / 180) * (distance);
      ctx.arc(selectedX, selectedY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
  
  // Handle harmony type selection
  const harmonySelect = document.getElementById('harmony-type') as HTMLSelectElement;
  if (harmonySelect) {
    harmonySelect.addEventListener('change', () => {
      currentHarmony = harmonySelect.value as HarmonyType;
      const palette = generatePalette(selectedColor, currentHarmony);
      displayPalette(palette);
    });
  }
}


