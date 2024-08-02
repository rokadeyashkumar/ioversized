import React, { useState, useEffect } from 'react';
import './style/edithomepage.scss';


const EditHomePage = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    // Fetch home page sliders from the backend and set state
    // setSliders(response.data);
  };

  const handleUpdateSlider = async (sliderId) => {
    // Update slider logic
    // After updating, refresh the sliders list
    // fetchSliders();
  };

  return (
    <section className="edit-homepage">
      <h2>Edit Home Page Sliders</h2>
      <table>
        <thead>
          <tr>
            <th>Slider Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliders.map(slider => (
            <tr key={slider._id}>
              <td><img src={slider.image} alt="Slider" /></td>
              <td>
                <button onClick={() => handleUpdateSlider(slider._id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default EditHomePage;
