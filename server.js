const express = require('express');
const fs = require('fs');
const { parseString, Builder } = require('xml2js');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000' // Replace this with your frontend's URL
}));

app.use(express.json());

app.post('/api/authenticate', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(`${__dirname}/data.xml`, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading XML file:', err);
      return res.status(500).send('Error reading XML file');
    }

    parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return res.status(500).send('Error parsing XML');
      }

      const storedUsername = result.root.credentials[0].username[0];
      const storedPassword = result.root.credentials[0].password[0];

      if (username === storedUsername && password === storedPassword) {
        res.status(200).send('Authentication successful');
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  });
});

app.post('/api/updateXml', (req, res) => {
  const { firstName, lastName, email, phone, alignment, pure, adjustment, lieangle, brand, model, shaft, clubs } = req.body;

  // Validate request body
  if (!firstName || !lastName || !email) {
    return res.status(400).send('Missing required fields');
  }

  // Read the existing XML file
  fs.readFile(`${__dirname}/data.xml`, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading XML file:', err);
      return res.status(500).send('Error reading XML file');
    }

    // Parse the XML
    parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return res.status(500).send('Error parsing XML');
      }

      // Create the new user object
      const newUser = {
        firstName: [firstName],
        lastName: [lastName],
        email: [email],
        phone: [phone],
        alignment: [alignment],
        pure: [pure],
        adjustment: [adjustment],
        lieangle: [lieangle],
        brand: [brand],
        model: [model],
        shaft: [shaft],
        clubs: [clubs],
      };

      // Ensure the users array is available under the root element
      if (!result.root.users) {
        result.root.users = [{ user: [] }];
      }

      // Add new user data to the existing XML
      result.root.users[0].user.push(newUser);

      // Convert JSON back to XML
      const builder = new Builder();
      const xml = builder.buildObject(result);

      // Write updated XML back to file
      fs.writeFile(`${__dirname}/data.xml`, xml, (err) => {
        if (err) {
          console.error('Error writing XML file:', err);
          return res.status(500).send('Error writing XML file');
        }
        res.send('XML file updated successfully');
      });
    });
  });
});

app.get('/api/getXml', (req, res) => {
  fs.readFile(`${__dirname}/data.xml`, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading XML file:', err);
      return res.status(500).send('Error reading XML file');
    }

    parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return res.status(500).send('Error parsing XML');
      }

      if (result.root && result.root.users && result.root.users[0].user) {
        res.json({ users: result.root.users[0].user });
      } else {
        res.json({ users: [] });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
