// src/components/Items/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ItemList.css'; // Import the CSS file for styling

const ItemList = () => {
  const [itemListData, setItemListData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemList, setShowItemList] = useState(true);
  const [showNewBox, setShowNewBox] = useState(false);
  const [newBoxData, setNewBoxData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // TODO: const response = await axios.get('your_api_endpoint'); // Replace with your API endpoint
        // Temporary data for demonstration purposes
        const data =
          [
            {
              "id": "a44slkdf1alksjdf",
              "item": "apple",
              "price": 12.5,
              "description": "A crisp, juicy, and delicious red apple."
            },
            {
              "id": "b56fjh345hkjsad",
              "item": "banana",
              "price": 0.99,
              "description": "A bright yellow banana, perfect for snacking or smoothies."
            },
            {
              "id": "c78opw980dfjkl",
              "item": "orange",
              "price": 1.50,
              "description": "A juicy, sweet orange with a vibrant citrus flavor."
            },
            {
              "id": "d90asdfh2345lkj",
              "item": "grapes",
              "price": 4.99,
              "description": "A bunch of fresh, green grapes, ideal for snacking or salads."
            },
            {
              "id": "e02zxcv98765mnb",
              "item": "strawberries",
              "price": 5.99,
              "description": "Sweet, juicy strawberries, perfect for desserts or eating fresh."
            }
          ];
        setItemListData(data);
      } catch (error) {
        console.error('API Error:', error);
        toast.error('Failed to fetch item data from the API.');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that the effect runs once on component mount

  const handleCheckboxChange = (itemId) => {
    // Check if the item is already selected
    if (selectedItems.includes(itemId)) {
      // If selected, remove it from the list
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== itemId)
      );
    } else {
      // If not selected, add it to the list
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    }
  };

  const handleSendRequest = async () => {
    // Check if any items are selected
    if (selectedItems.length === 0) {
      toast.error('No items selected.');
      return;
    }

    // Filter the selected items from the data
    const selectedItemsData = itemListData
      .filter((item) => selectedItems.includes(item.id))
      .map((item, index) => ({
        serialNumber: index + 1,
        id: item.id,
        item: item.item,
        price: item.price,
        description: item.description,
      }));

    try {

      //  TODO: erf
      // Example: Send a POST request to an API endpoint with selectedItemsData using Axios
      // const response = await axios.post('your_api_endpoint', {
      //   selectedItems: selectedItemsData,
      // });

      // Check if API call is successful
      if (true) {
        toast.success('Selected items sent successfully!');
        setNewBoxData("total price : 10212"); // Assuming the response contains data for the new box
        setShowItemList(false);
        setShowNewBox(true);
      } else {
        toast.error('Failed to send selected items.');
        // Handle API failure
      }
    } catch (error) {
      console.error('API Error:', error);
      toast.error('An unexpected error occurred.');
      // Handle API error
    }
  };

  const handleBackToList = () => {
    setShowItemList(true);
    setShowNewBox(false);
  };

  return (
    <div>
      {showItemList && (
        <div className="item-list-container">
          <h2 className="fancy-title">Super Fancy Item List</h2>
          <table className="fancy-item-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Serial Number</th>
                <th>Item</th>
                <th>Price</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {itemListData.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <input
                      className="fancy-checkbox"
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.item}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="fancy-button" onClick={handleSendRequest}>
            Send Selected Items
          </button>
        </div>
      )}

      {showNewBox && (
        <div className="item-list-container">
          <h2 className="fancy-title">New Fancy Box</h2>
          {/* Display content from the API response in the new box */}
          {newBoxData && (
            <div>
              {/* Example: Display response data in the new box */}
              <p>Data from API:</p>
              <pre>{JSON.stringify(newBoxData, null, 2)}</pre>
            </div>
          )}
          <button className="fancy-button" onClick={handleBackToList}>
            Back to Item List
          </button>
        </div>
      )}

      {/* ToastContainer for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default ItemList;
