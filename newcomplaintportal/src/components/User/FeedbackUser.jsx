

import React, { useEffect, useState } from 'react'

import { Dialog,DialogTitle,DialogContent, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,TextField,DialogActions } from '@mui/material'

import './userstyles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'







const FeedbackUser = () => {
    const [userComplaints, setUserComplaints] = useState([]);
    const [isFeedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
   const navigate=useNavigate(); 
  const fetchUserComplaints = async () => {
    try {
      const token = localStorage.getItem('Token'); // Replace with your actual token key
      const response = await axios.get('http://localhost:8081/api/complaints/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserComplaints(response.data);
    } catch (error) {
      console.error('Error fetching user complaints:', error.message);
    }
  };
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('Token'); // Replace with your actual token key
   navigate("/login")
  };
  const handleFeedbackButtonClick = (complaintId, currentFeedback) => {
    setSelectedComplaintId(complaintId);
    setFeedbackContent(currentFeedback);
    setFeedbackPopupOpen(true);
  };

  const handleFeedbackUpdate =  () => {
    
      
      axios.put(
        `http://localhost:8081/api/complaints/${selectedComplaintId}/feedback`
        ,null,
        {
            params: {
                feedback: feedbackContent,
            },
            headers:{
                Authorization:`Bearer ${localStorage.getItem('Token')}`
            }
        }
      )
      .then(response=>{
        console.log('Response from server', response.data);
        setUserComplaints(prevComplaints => {
            const updatedComplaints = prevComplaints.map(complaint => {
              if (complaint.id === selectedComplaintId) {
                return { ...complaint, feedback: feedbackContent };
              }
              return complaint;
            });
            return updatedComplaints;
          });
          // Close the feedback popup
          setFeedbackPopupOpen(false);
        })
        .catch(error => console.error('Error updating feedback:', error));
    };
  
    const handleCloseDialog = () => {
      setFeedbackPopupOpen(false);
    };
  
  

  useEffect(() => {
    fetchUserComplaints();
  }, []);
 return (
    
    <div className='p-10' >
    <Card className='mt-2  '>
      <CardHeader title="All Complaints" />
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="caption table">
      
      <TableHead sx={{ backgroundColor: 'rgb(59,59,251)' }}>
        <TableRow>
          <TableCell sx={{ color: 'white' }}>Id</TableCell>
         
          <TableCell align="left" sx={{ color: 'white' }}>Employeecode</TableCell>
          <TableCell align="left" sx={{ color: 'white' }}>Department</TableCell>
          <TableCell align="left" sx={{ color: 'white' }}>Subdepartment</TableCell>
          <TableCell align="left" sx={{ color: 'white' }}>ComplaintDate</TableCell>
         < TableCell align="left" sx={{ color: 'white' }}>Status</TableCell>
         < TableCell align="left" sx={{ color: 'white' }}> Complaint</TableCell>
         < TableCell align="left" sx={{ color: 'white' }}> Feedback</TableCell>
         < TableCell align="left" sx={{ color: 'white' }}>Provide Feedback</TableCell>
         < TableCell align="left" sx={{ color: 'white' }}> AdminRemark</TableCell>
         
        </TableRow>
      </TableHead>
      <TableBody>
              {userComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell align="left">{complaint.employeeCode}</TableCell>
                  <TableCell align="left">{complaint.department}</TableCell>
                  <TableCell align="left">{complaint.subDepartment}</TableCell>
                  <TableCell align="left">{complaint.complaintDate}</TableCell>
                  <TableCell align="left">{complaint.status}</TableCell>
                  <TableCell align="left">{complaint.complaint}</TableCell>
                  <TableCell align="left">{complaint.feedback}</TableCell>
                 
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleFeedbackButtonClick(complaint.id, complaint.feedback)
                      }
                    >
                      Provide Feedback
                    </Button>
                  </TableCell>
                  <TableCell align="left">{complaint.adminRemark}</TableCell>
                </TableRow>
                
              ))}
            </TableBody>
   
                
    </Table>
  </TableContainer>
  
    </Card>

    <Dialog open={isFeedbackPopupOpen} onClose={handleCloseDialog}>
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Feedback"
            type="text"
            fullWidth
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleFeedbackUpdate} color="primary">
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>


    <div className="logout-button">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
  </div>  
        
    
)
}


export default FeedbackUser
