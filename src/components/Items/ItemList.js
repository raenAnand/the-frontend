// src/components/Items/ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ItemList.css'; // Import the CSS file for styling
import { ITEM_LIST_API, TOTAL_PRICE } from '../../Constents';

const ItemList = () => {
  const [itemListData, setItemListData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemList, setShowItemList] = useState(true);
  const [showNewBox, setShowNewBox] = useState(false);
  const [newBoxData, setNewBoxData] = useState(null);
  const authToken = localStorage.getItem('access_token');


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {

        const response = await axios.get(ITEM_LIST_API, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
    
        // Replace the below line with the actual data from your API response
        const data = response.data.result;
        setItemListData(response.data['results']);
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
    .map((item) => (item.id));

    console.log()

    try {
      console.log(selectedItemsData)
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      // Make the axios.post request with the authentication token in the headers
      const response = await axios.post(TOTAL_PRICE, 
       {items: selectedItemsData}
      , { headers });

      // Check if API call is successful
      if (true) {
        toast.success('Selected items sent successfully!');
        setNewBoxData("total price: "+ response.data['total_price']); // Assuming the response contains data for the new box
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
                  <td>{item.id}</td>
                  <td>{item.name}</td>
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
          <h2 className="fancy-title">Selected Item Summary</h2>
          {/* Display content from the API response in the new box */}
          {newBoxData && (
            <div>
              {/* Example: Display response data in the new box */}
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
