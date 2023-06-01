const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const dataFilePath = 'hospitalData.json';


app.use(express.json());

//  Read JSON file
const readHospitalData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading hospital data:', err);
    return [];
  }
};


const writeHospitalData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Hospital data has been successfully saved.');
  } catch (err) {
    console.error('Error writing hospital data:', err);
  }
};

// GET 
app.get('/hospitals', (req, res) => {
  const hospitals = readHospitalData();
  res.json(hospitals);
});

// POST 
app.post('/hospitals', (req, res) => {
  const hospitals = readHospitalData();
  const newHospital = req.body;
  hospitals.push(newHospital);
  writeHospitalData(hospitals);
  res.json({ message: 'New hospital added successfully.' });
});

// PUT 
app.put('/hospitals/:id', (req, res) => {
  const hospitals = readHospitalData();
  const hospitalIndex = req.params.id;
  const updatedHospital = req.body;
  hospitals[hospitalIndex] = updatedHospital;
  writeHospitalData(hospitals);
  res.json({ message: 'Hospital updated successfully.' });
});

// DELETE 
app.delete('/hospitals/:id', (req, res) => {
  const hospitals = readHospitalData();
  const hospitalIndex = req.params.id;
  hospitals.splice(hospitalIndex, 1);
  writeHospitalData(hospitals);
  res.json({ message: 'Hospital deleted successfully.' });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
