import React, { useState, useEffect } from 'react';
import './App.css'
import { getCounter, updateCounter, getAbelminerVersion } from './service'; // Adjust the import according to your file structure

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [counter, setCounter] = useState<number | string>(""); // State for the counter

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const counterValue = await getCounter(); // Call getCounter
        setCounter(counterValue); // Set the counter value from response
      } catch (error) {
        console.error('Error fetching counter:', error);
      }
    };

    fetchCounter(); // Call the async function when the component mounts
  }, []);

  const openPopup = async () => {
    try {
      await updateCounter()
      const abelminerVersion = (await getAbelminerVersion()).version
      setPopUpMessage(abelminerVersion)
      const counterValue = await getCounter(); // Call getCounter

      setCounter(counterValue); // Set the counter value from response
      setShowPopup(true); // Show the popup
    } catch (error) {
      console.error('Error fetching counter:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="App">
      <div>
        <h1>Count: {counter}</h1>
        <button onClick={openPopup}>Test</button>
      </div>
      {/* Modal Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <div className="popup-content">
              <pre>
                <h2>{popUpMessage}</h2>
              </pre>
              <button onClick={closePopup}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;