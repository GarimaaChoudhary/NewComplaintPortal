import React, { useState } from 'react'
import { Grid,Card, CardContent, TextField, Button, Typography, InputAdornment ,Link} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterComplaint = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    
    employeeCode: '',
    department: '',
    subDepartment: '',
    complaint: '',
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post(
        'http://localhost:8081/api/complaints/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log('Form Data sent successfully!');
        // Reset the form data after successful submission if needed
        setRegistrationStatus(true);
        
      } else {
        console.error('Failed to send form data. Server returned:', response.status);
        setRegistrationStatus(false);
      }
    } catch (error) {
      console.error('Error while sending form data:', error.message);
      setRegistrationStatus(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('jwtToken');
    // Redirect to the login page or any other desired page
    navigate('/login');
  };

  const handleRegisterAnotherComplaint = () => {
    // Clear the form data
    setFormData({
      employeeCode: '',
      department: '',
      subDepartment: '',
      complaint: '',
    });
    // Reset the registration status
    setRegistrationStatus(null);
  };
  const backgroundImageStyle = {
    backgroundImage: 'url("https://cdni.autocarindia.com/ExtraImages/20201229115013_Indian-Oil-Petrol-pump.jpg")', // Replace with the actual URL of your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const cardStyle = {
    maxWidth: 450,
    margin: '0 auto',
    padding: '20px 5px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 8, // Adjust the border radius
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };


  return (
    <div style={backgroundImageStyle}>
      <Card style={cardStyle}>
        <CardContent>
          {registrationStatus === null && (
            <>
              <Typography gutterBottom color="orangered" variant="h5">Complaint Form</Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">Fill up the form and our team will get back to you shortly.</Typography>
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField
                      label="Employee Code"
                      name="employeeCode"
                      value={formData.employeeCode}
                      onChange={handleChange}
                      placeholder="Enter employee code"
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessCenterIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="Department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Enter department"
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MapsHomeWorkIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="SubDepartment"
                      name="subDepartment"
                      value={formData.subDepartment}
                      onChange={handleChange}
                      placeholder="Enter sub-department"
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <TextField
                      label="Complaint"
                      name="complaint"
                      value={formData.complaint}
                      onChange={handleChange}
                      multiline
                      rows={5}
                      placeholder="Write your complaint"
                      variant="outlined"
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MessageIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>

                  <Grid xs={12} item style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
          <Grid xs={12} item style={{ marginTop: '10px' }}>
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
              <Link to="/feedback" color="primary" onClick={() => navigate('/feedback')}>
                Provide feedback
              </Link>
            </Typography>
          </Grid>
                </Grid>
              </form>
            </>
          )}
          {registrationStatus === true && (
            <>
              <Typography gutterBottom color="orangered" variant="h5">Complaint Registered</Typography>
              <Typography variant="body2" color="textSecondary" component="p">Thank you for registering your complaint.</Typography>
              <Grid xs={12} item style={{ marginTop: '10px' }}>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
                      <Link to="/" color="primary" onClick={handleRegisterAnotherComplaint}>
                        Register another complaint
                      </Link>
                    </Typography>
                  </Grid>
              
              <Grid xs={12} item style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
          <Grid xs={12} item style={{ marginTop: '10px' }}>
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
              <Link to="/feedback" color="primary" onClick={() => navigate('/feedback')}>
                Provide feedback
              </Link>
            </Typography>
          </Grid>

          
            </>
          )}
          {registrationStatus === false && (
            <>
              <Typography gutterBottom color="orangered" variant="h5">Complaint Not Registered</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <Link to="/" color="primary" onClick={() => navigate('/login')}>
               Kindly login 
            </Link>
                 </Typography>
            </>
          )}
          
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterComplaint