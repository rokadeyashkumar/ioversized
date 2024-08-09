import React, { useState } from "react";
import axios from "./service/axios"; // Ensure this path is correct
import "./style/addproduct.scss";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [info, setInfo] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([
    'Classic Oversized T-Shirts',
    'Standard Oversized T-Shirts',
    'Hoodies',
    'Zippers',
  ]);
  const [size, setSize] = useState([]);
  const [colors, setColors] = useState(['']);
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [additionalImage1, setAdditionalImage1] = useState("");
  const [additionalImage2, setAdditionalImage2] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    const productData = {
      name,
      details,
      info,
      type,
      size,
      colors,
      originalPrice,
      salePrice,
      mainImage,
      additionalImage1,
      additionalImage2,
    };

    axios.post("/products/add", productData)
      .then(() => {
        // Clear form fields on success
        setName('');
        setDetails('');
        setInfo('');
        setType('');
        setSize([]);
        setColors(['']);
        setOriginalPrice('');
        setSalePrice('');
        setMainImage('');
        setAdditionalImage1('');
        setAdditionalImage2('');
      })
      .catch((error) => {
        console.error('Error adding product:', error.response ? error.response.data : error.message);
        alert('Error adding product. Please check the console for more details.');
      });
  };

  return (
    <section className="add-product">
      <div className="card">
        <h2>Add Product</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Additional Product Information (Use newline for bullet points)"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Product Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="sizes">
          <h3>Sizes</h3>
          {["XS", "S", "M", "L", "XL", "XXL"].map((sizeOption) => (
            <label key={sizeOption}>
              <input
                type="checkbox"
                checked={size.includes(sizeOption)}
                onChange={(e) => {
                  setSize((prev) => (
                    e.target.checked
                      ? [...prev, sizeOption]
                      : prev.filter((s) => s !== sizeOption)
                  ));
                }}
              />
              {sizeOption}
            </label>
          ))}
        </div>
        <div className="colors">
          <h3>Colors</h3>
          {colors.map((color, index) => (
            <div key={index} className="color-input">
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  const updatedColors = [...colors];
                  updatedColors[index] = e.target.value;
                  setColors(updatedColors);
                }}
              />
              <button onClick={() => {
                const updatedColors = colors.filter((_, i) => i !== index);
                setColors(updatedColors);
              }}>Remove</button>
            </div>
          ))}
          <button onClick={() => setColors([...colors, ''])}>Add Color</button>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Original Price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sale Price"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Main Image URL</label>
          <input
            type="text"
            name="mainImage"
            placeholder="Enter the main image URL"
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Additional Image 1 URL</label>
          <input
            type="text"
            name="additionalImage1"
            placeholder="Enter the first additional image URL"
            value={additionalImage1}
            onChange={(e) => setAdditionalImage1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Additional Image 2 URL</label>
          <input
            type="text"
            name="additionalImage2"
            placeholder="Enter the second additional image URL"
            value={additionalImage2}
            onChange={(e) => setAdditionalImage2(e.target.value)}
          />
        </div>
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div className="product-info">
        <h3>Additional Product Information</h3>
        <ul>
          {info.split('\n').filter(line => line.trim() !== '').map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AddProduct;
