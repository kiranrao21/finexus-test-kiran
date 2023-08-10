import './App.css';
import React, { useState } from 'react';

const mockData = {
  userProfile: [{"contactinfo":"60123456789", "contactTyp":"M", "name":"John Smith",  "age":"24"}, {"contactinfo":"jccs44@haysc.com", "contactTyp":"E", "name":"Jenson", "age":"31"}, {"contactInfo":"12123456789", "contactTyp":"M", "name":"John Smith", "age": "24"}], "userCount":3};

  const App = () => {
    const [data, setData] = useState(mockData.userProfile);
    const [searchTerm, setSearchTerm] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editedData, setEditedData] = useState({
      contactInfo: '',
      contactType: '',
      name: '',
      age: ''
    });
  
    const handleDelete = (index) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    };

    const handleEdit = (index) => {
      setEditIndex(index);
      setEditedData({
        name: data[index].name, // Allow editing name
        age: data[index].age,   // Allow editing age
        // Other fields (contactInfo, contactType) remain unchanged
        ...data[index]
      });
    };
  
    const handleSaveEdit = () => {
      const newData = [...data];
      newData[editIndex] = editedData;
      setData(newData);
      setEditIndex(-1);
    };
  
    const handleCancelEdit = () => {
      setEditIndex(-1);
    };
  
    const handleSearch = () => {
      const filteredData = mockData.userProfile.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (filteredData.length === 0) {
        alert('No matching names found.');
      } else {
        setData(filteredData);
      }
    };

    return (
      <div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button> {/* Add this line */}
        </div>
        <table className="data-table">
          {/* <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead> */}
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.contactInfo}
                      onChange={(e) =>
                        setEditedData({ ...editedData, contactInfo: e.target.value })
                      }
                    />
                  ) : (
                    item.contactInfo
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedData.age}
                      onChange={(e) =>
                        setEditedData({ ...editedData, age: e.target.value })
                      }
                    />
                  ) : (
                    item.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <div>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default App;