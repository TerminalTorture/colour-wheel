# Color Wheel - Palette Generator

This project is a color palette generator that lets you select colors from a color wheel and generate harmonious color combinations.

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (version 16 or newer)
- npm (comes with Node.js)

## Getting Started

Follow these steps to set up and run the project:

### 1. Open a Terminal/Command Prompt

- On Windows: Press `Win + R`, type `cmd` and press Enter
- On Mac: Open Terminal from Applications > Utilities
- On Linux: Open your preferred terminal application

### 2. Navigate to the Project Directory

```bash
cd "path/to/Colour Wheel/colour-wheel"
```

For example, if it's on your Desktop:
```bash
cd "C:\Users\YourUsername\Desktop\Colour Wheel\colour-wheel"
```

### 3. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This might take a few minutes. You should see progress bars in your terminal.

### 4. Fix the Tailwind Configuration

Create a new `tailwind.config.js` file if it doesn't exist:

```bash
npm install tailwindcss postcss autoprefixer --save-dev
npx tailwindcss init
```

Edit the `postcss.config.js` file to ensure it contains:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

You should see output indicating that the server is running, typically at http://localhost:5173 or another port.

### 6. Open the Application

- Open your web browser (Chrome, Firefox, Safari, etc.)
- Navigate to the URL shown in your terminal (typically http://localhost:5173)
- You should now see the Color Wheel application!

## Using the Application

1. **Select a Color**: Click anywhere on the color wheel to choose a base color
2. **Choose a Harmony Type**: Use the dropdown menu to select different color harmony patterns:
   - Analogous: Colors that are adjacent to each other on the color wheel
   - Complementary: Colors that are opposite to each other
   - Triadic: Three colors evenly spaced around the color wheel
   - Tetradic: Four colors arranged in two complementary pairs
   - Monochromatic: Different shades and tints of the same color

3. **View Generated Palette**: The generated colors will appear in the palette section

## Building for Production

When you're ready to deploy your application:

```bash
npm run build
```

This will create a `dist` folder with optimized files ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Common Issues and Solutions

1. **"Module not found" errors**
   - Run `npm install` again to ensure all dependencies are properly installed

2. **Blank page or styling issues**
   - Check that Tailwind CSS is properly configured
   - Make sure your browser is updated to a recent version

3. **Colors not displaying correctly**
   - Try clearing your browser cache and reloading the page

4. **Development server won't start**
   - Check if another application is using the same port
   - Make sure you're in the correct project directory

If you continue having problems, try searching for the specific error message online or ask for help in web development communities.
