import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [tshirtColor, setTshirtColor] = useState('#ffffff'); // Default color (white)
  const [designs, setDesigns] = useState([]); // State to store fetched designs

  // Function to handle color change
  const handleColorChange = (e) => {
    setTshirtColor(e.target.value); // Update the color state
  };

  // Function to save the design to the backend
  const saveDesign = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/save-design', {
        color: tshirtColor, // Send the selected color to the backend
      });
      console.log('Design saved:', response.data);
      alert('Design saved successfully!');
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Error saving design. Please try again.');
    }
  };

  // Function to fetch all designs from the backend
  const fetchDesigns = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/get-designs');
      setDesigns(response.data); // Update the designs state
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  // Fetch designs when the component mounts
  useEffect(() => {
    fetchDesigns();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome to Fashion Designing</h1>
      <p>Explore the latest trends and create your own designs.</p>

      {/* T-shirt image with dynamic background color */}
      <div
        style={{
          ...styles.tshirtContainer,
          backgroundColor: tshirtColor, // Apply the selected color
        }}
      >
        <img
          src="https://res.cloudinary.com/dfyedmlca/image/upload/v1742618850/tshirt-2_cpa7nb.jpg" // T-shirt image URL
          alt="T-Shirt Design"
          style={styles.tshirtImage}
        />
      </div>

      {/* Color picker */}
      <div style={styles.colorPickerContainer}>
        <label htmlFor="color-picker">Choose T-Shirt Color:</label>
        <input
          type="color"
          id="color-picker"
          value={tshirtColor}
          onChange={handleColorChange}
          style={styles.colorInput}
        />
      </div>

      {/* Save button */}
      <button onClick={saveDesign} style={styles.saveButton}>
        Save Design
      </button>

      {/* Display saved designs */}
      <div style={styles.designsContainer}>
        <h2>Saved Designs</h2>
        {designs.map((design, index) => (
          <div key={index} style={styles.designItem}>
            <p>Color: {design.color}</p>
            <p>Saved on: {new Date(design.createdAt).toLocaleString()}</p>
          </div>
        ))}
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
  tshirtContainer: {
    width: '300px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    marginTop: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  tshirtImage: {
    width: '100%',
    height: 'auto',
    mixBlendMode: 'multiply', // Blend the image with the background color
  },
  colorPickerContainer: {
    marginTop: '20px',
  },
  colorInput: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  saveButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
  },
  designsContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  designItem: {
    margin: '10px 0',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
};

export default HomePage;