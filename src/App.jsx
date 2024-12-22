import "./Index.css";
import React, { useState } from "react";

const App = () => {
  const [inputs, setInputs] = useState({
    topLength: { feet: "", inches: "" },
    leftBreadth: { feet: "", inches: "" },
    bottomLength: { feet: "", inches: "" },
    rightBreadth: { feet: "", inches: "" },
  });

  const [showArea, setShowArea] = useState(false);
  const [savedResults, setSavedResults] = useState([]);
  const [boxName, setBoxName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e, field, unit) => {
    const value = e.target.value;
    if (value === "" || /^[0-9.]+$/.test(value)) {
      setInputs({
        ...inputs,
        [field]: { ...inputs[field], [unit]: value },
      });
      setShowArea(false);
    }
  };

  const convertToFeet = (feet, inches) => {
    const totalFeet = parseFloat(feet || 0) + parseFloat(inches || 0) / 12;
    return totalFeet.toFixed(2);
  };

  const calculateArea = () => {
    const lengthValues = [
      parseFloat(convertToFeet(inputs.topLength.feet, inputs.topLength.inches)),
      parseFloat(
        convertToFeet(inputs.bottomLength.feet, inputs.bottomLength.inches)
      ),
    ];
    const breadthValues = [
      parseFloat(
        convertToFeet(inputs.leftBreadth.feet, inputs.leftBreadth.inches)
      ),
      parseFloat(
        convertToFeet(inputs.rightBreadth.feet, inputs.rightBreadth.inches)
      ),
    ];

    const avgLength =
      lengthValues.reduce((a, b) => a + b) / lengthValues.length;
    const avgBreadth =
      breadthValues.reduce((a, b) => a + b) / breadthValues.length;

    const plotArea = avgLength * avgBreadth;

    return plotArea.toFixed(2);
  };

  const saveResult = () => {
    if (!boxName.trim()) {
      setError("Box name is required.");
      return;
    }
    const area = calculateArea();
    if (area) {
      setSavedResults([...savedResults, { name: boxName, area }]);
      setBoxName("");
      setShowArea(false);
      setError("");
    }
  };

  const clearInputs = () => {
    setInputs({
      topLength: { feet: "", inches: "" },
      leftBreadth: { feet: "", inches: "" },
      bottomLength: { feet: "", inches: "" },
      rightBreadth: { feet: "", inches: "" },
    });
    setShowArea(false);
    setError("");
  };

  const deleteResult = (index) => {
    setSavedResults(savedResults.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 py-10 sm:py-20">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
        <h2 className="text-3xl font-bold mb-6 text-teal-400">
          Plot Area Calculator
        </h2>
        <div className="mb-6">
          <input
            type="text"
            value={boxName}
            onChange={(e) => setBoxName(e.target.value)}
            className="w-full p-3 border border-teal-500 rounded-lg mb-2 bg-gray-700 text-yellow-200 text-xl placeholder-gray-400"
            placeholder="Enter Person Name"
            required
          />
          {error && <small className="text-red-500">{error}</small>}
        </div>
        {["topLength", "leftBreadth", "bottomLength", "rightBreadth"].map(
          (field, idx) => (
            <div key={idx} className="mb-6">
              <label className="block text-teal-400 mb-2">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <div className="flex">
                <input
                  type="text"
                  name={`${field}.feet`}
                  value={inputs[field].feet}
                  onChange={(e) => handleChange(e, field, "feet")}
                  className="w-1/2 p-3 border border-teal-500 rounded-lg mr-2 bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Feet"
                  required
                />
                <input
                  type="text"
                  name={`${field}.inches`}
                  value={inputs[field].inches}
                  onChange={(e) => handleChange(e, field, "inches")}
                  className="w-1/2 p-3 border border-teal-500 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Inches"
                  required
                />
              </div>
              {(inputs[field].feet || inputs[field].inches) && (
                <small className="text-yellow-400">
                  {convertToFeet(inputs[field].feet, inputs[field].inches)} feet
                </small>
              )}
            </div>
          )
        )}
        <button
          onClick={() => setShowArea(true)}
          className="bg-teal-600 text-white p-3 rounded-lg mt-4 w-full hover:bg-teal-700"
        >
          Calculate Area
        </button>
        {showArea && (
          <p className="text-teal-400 mt-4">
            Avg Plot Area = {calculateArea()} sq. feet
          </p>
        )}
        <button
          onClick={clearInputs}
          className="bg-red-600 text-white p-3 rounded-lg mt-4 w-full hover:bg-red-700"
        >
          Clear Inputs
        </button>
        <button
          onClick={saveResult}
          className="bg-green-600 text-white p-3 rounded-lg mt-4 w-full hover:bg-green-700"
        >
          Save Result
        </button>
      </div>
      {savedResults.length > 0 && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h3 className="text-2xl font-bold mb-4 text-teal-400">
            Saved Results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedResults.map((result, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-400 font-bold">{result.name}</span>
                  <button
                    onClick={() => deleteResult(index)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-blue-200">{result.area} sq. feet</p>
              </div>
            ))}
           
          </div>
        </div>
      )}
       <div className="text-pink-400  font-bold">
              Project By Aman Bhardwaj
            </div>
    </div>
  );
};

export default App;
