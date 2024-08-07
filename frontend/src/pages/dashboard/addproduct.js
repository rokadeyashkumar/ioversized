import React, { useState } from "react";
import axios from "axios";
import "./style/addproduct.scss";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    originalPrice: "",
    salePrice: "",
    size: [],
    colors: [],
    details: "",
    info: "",
    type: "Classic Oversized T-Shirts",
    types: [
      "Classic Oversized T-Shirts",
      "Standard Oversized T-Shirts",
      "Hoodies",
      "Zippers",
    ],
    mainImage: "",
    additionalImage1: "",
    additionalImage2: "",
  });

  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.originalPrice ||
      !newProduct.salePrice ||
      !newProduct.mainImage
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.post("/api/products/add", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Product added successfully!");
      setNewProduct({
        name: "",
        originalPrice: "",
        salePrice: "",
        size: [],
        colors: [],
        details: "",
        info: "",
        type: "Classic Oversized T-Shirts",
        types: [
          "Classic Oversized T-Shirts",
          "Standard Oversized T-Shirts",
          "Hoodies",
          "Zippers",
        ],
        mainImage: "",
        additionalImage1: "",
        additionalImage2: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddColor = () => {
    setNewProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, "#000000"],
    }));
  };

  const handleRemoveColor = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleColorChange = (index, value) => {
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) => (i === index ? value : color)),
    }));
  };

  const handleTypeChange = (e) => {
    setNewProduct((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handleAddType = () => {
    const newType = prompt("Enter new product type:");
    if (newType && !newProduct.types.includes(newType)) {
      setNewProduct((prev) => ({
        ...prev,
        types: [...prev.types, newType],
        type: newType,
      }));
    }
  };

  const formatInfo = (info) => {
    return info.split("\n").filter((line) => line.trim() !== "");
  };

  return (
    <section className="add-product">
      <div className="card">
        <h2>Add Product</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Details"
            value={newProduct.details}
            onChange={(e) =>
              setNewProduct({ ...newProduct, details: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Additional Product Information (Use newline for bullet points)"
            value={newProduct.info}
            onChange={(e) =>
              setNewProduct({ ...newProduct, info: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Product Type</label>
          <select id="type" value={newProduct.type} onChange={handleTypeChange}>
            {newProduct.types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button onClick={handleAddType}>+ Add More Types</button>
        </div>
        <div className="sizes">
          <h3>Sizes</h3>
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                checked={newProduct.size.includes(size)}
                onChange={(e) => {
                  setNewProduct((prev) => ({
                    ...prev,
                    size: e.target.checked
                      ? [...prev.size, size]
                      : prev.size.filter((s) => s !== size),
                  }));
                }}
              />
              {size}
            </label>
          ))}
        </div>
        <div className="colors">
          <h3>Colors</h3>
          {newProduct.colors.map((color, index) => (
            <div key={index} className="color-input">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
              />
              <button onClick={() => handleRemoveColor(index)}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddColor}>Add Color</button>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Original Price"
            value={newProduct.originalPrice}
            onChange={(e) =>
              setNewProduct({ ...newProduct, originalPrice: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Sale Price"
            value={newProduct.salePrice}
            onChange={(e) =>
              setNewProduct({ ...newProduct, salePrice: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Main Image URL</label>
          <input
            type="text"
            name="mainImage"
            placeholder="Enter the main image URL"
            value={newProduct.mainImage}
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label>Additional Image 1 URL</label>
          <input
            type="text"
            name="additionalImage1"
            placeholder="Enter the first additional image URL"
            value={newProduct.additionalImage1}
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label>Additional Image 2 URL</label>
          <input
            type="text"
            name="additionalImage2"
            placeholder="Enter the second additional image URL"
            value={newProduct.additionalImage2}
            onChange={handleImageChange}
          />
        </div>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="product-info">
        <h3>Additional Product Information</h3>
        <ul>
          {formatInfo(newProduct.info).map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AddProduct;
