import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate the JSON format
      const data = JSON.parse(jsonData);

      // Make POST request to the backend API
      const response = await axios.post('https://bajaj-challenge-r0krgb80h-mukund0704s-projects.vercel.app/api/bfhl', { data });

      setResponseData(response.data);
    } catch (err) {
      setError('Invalid JSON format or backend error');
      setResponseData(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const filteredData = {};
    if (selectedOptions.includes('Numbers')) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response Data:</h3>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Dev Challenge - Frontend</h1>

      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea
            value={jsonData}
            onChange={handleJsonChange}
            rows="6"
            cols="50"
            placeholder='Enter JSON, e.g. { "data": ["A", "C", "z"] }'
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h3>Select Data to Display:</h3>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase Alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>

          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
