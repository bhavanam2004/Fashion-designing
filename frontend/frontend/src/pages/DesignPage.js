// src/pages/DesignPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, Image, filters } from 'fabric'; // Import specific classes from Fabric.js

const DesignPage = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff'); // Default T-shirt color (white)
  const canvasRef = useRef(null); // Reference to the canvas element

  // Initialize Fabric.js canvas and load T-shirt image
  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      width: 500, // Canvas width
      height: 600, // Canvas height
    });

    // Load the T-shirt image
    Image.fromURL(
      'https://res.cloudinary.com/dfyedmlca/image/upload/v1742618850/tshirt-2_cpa7nb.jpg',
      (img) => {
        img.set({
          left: 50, // Position from the left
          top: 50, // Position from the top
          scaleX: 0.5, // Scale the image
          scaleY: 0.5, // Scale the image
          selectable: false, // Make the image non-selectable
        });
        canvas.add(img); // Add the image to the canvas
        canvas.renderAll(); // Render the canvas
      },
      { crossOrigin: 'anonymous' } // Handle cross-origin issues
    );

    // Cleanup function to dispose of the canvas
    return () => {
      canvas.dispose();
    };
  }, []);

  // Function to change the T-shirt color
  const changeTshirtColor = (color) => {
    setTshirtColor(color); // Update the state with the new color

    // Apply the color to the T-shirt image
    const canvas = canvasRef.current;
    if (canvas) {
      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        if (obj.type === 'image') {
          obj.set({
            filters: [
              new filters.BlendColor({
                color: color, // Apply the selected color
                mode: 'tint', // Blend mode
              }),
            ],
          });
          canvas.renderAll(); // Re-render the canvas
        }
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1>Customize Your T-Shirt</h1>
      <div style={styles.canvasContainer}>
        {/* Canvas element for the T-shirt */}
        <canvas ref={canvasRef} id="tshirt-canvas" width="500" height="600"></canvas>
      </div>
      <div style={styles.controls}>
        <label htmlFor="color-picker">Choose T-Shirt Color:</label>
        <input
          type="color"
          id="color-picker"
          value={tshirtColor}
          onChange={(e) => changeTshirtColor(e.target.value)}
          style={styles.colorInput}
        />
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
  },
  canvasContainer: {
    margin: '20px 0',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  controls: {
    marginTop: '20px',
  },
  colorInput: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
};

export default DesignPage;