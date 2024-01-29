import React, { useState } from 'react'
import { Grid,Card, CardContent, TextField, Button, Typography, InputAdornment,Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginUser = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        
        email:'',
        password: '',
        
        
      });
    
      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            'http://localhost:8081/auth/signin',
            formData
          );
    
          if (response.status === 201) {
            console.log('User Login successfully!');
            console.log(response);
            localStorage.setItem('Token', response.data.jwt);

           
            // Reset the form data after successful submission if needed
            setFormData({
              
              email: '',
              password: '',
             
            
            });
            navigate("/register")
          } else {
            console.error('Failed to send form data. Server returned:', response.status);
          }
        } catch (error) {
          console.error('Error while sending form data:', error.message);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
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
              <Typography gutterBottom color="orangered" variant="h5">Login Form</Typography>
              <Typography gutterBottom variant="body2"color="textSecondary" component="p">Kindly login yourself</Typography>
              <form onSubmit={handleFormSubmit}>
              <Grid container spacing={1}>
    
             
             
             <Grid xs={12}  item>
                <TextField  label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange} placeholder="Enter email "variant="outlined" fullWidth required
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon /> {/* Icon to be displayed */}
                    </InputAdornment>
                  ),
                }}/>
             </Grid>
             <Grid xs={12}  item>
                <TextField  label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange} placeholder="Enter password "variant="outlined" fullWidth required
                 InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessCenterIcon /> {/* Icon to be displayed */}
                    </InputAdornment>
                  ),
                }}/>
             </Grid>
    
             
    
             
    
             
             <Grid xs={12}  item>
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
             </Grid>
              </Grid>
              </form>
              <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
            Did not register?{' '}
            <Link to="/" color="primary" onClick={() => navigate('/')}>
              Register here
            </Link>
          </Typography>
            </CardContent>
          </Card>
        </div>
      )
}

export default LoginUser
