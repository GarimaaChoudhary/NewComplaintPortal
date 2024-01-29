import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Dialog,DialogTitle,DialogActions,TextField,DialogContent, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  
  
    const [isAdminRemarkPopupOpen, setAdminRemarkPopupOpen] = useState(false);
  const [adminRemarkContent, setAdminRemarkContent] = useState('');
  
  const getStatusStyles = (status) => {
    switch (status) {
      case "RESOLVED":
        return { backgroundColor: 'green', color: 'white' };
      
      case "PENDING":
        return { backgroundColor: 'red', color: 'white' };
      default:
        return { backgroundColor: '#369236', color: 'white' };
    }
  };
  const token = localStorage.getItem('adminToken');
  useEffect(() => {
    
    axios.get('http://localhost:8081/api/complaints/view',{
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then(response => setComplaints(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const customSort = (a, b) => {
    
    if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
    if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;

   
    return new Date(a.complaintDate) - new Date(b.complaintDate);
  };

  // Sort the complaints using the custom sorting function
 const sortedComplaints = complaints.sort(customSort);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedComplaintId(id);
  };

  // Function to handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleStatusUpdate = (status) => {
    // Make an API call to update the status in the database
    axios.put(`http://localhost:8081/api/complaints/${selectedComplaintId}/status`, null, {

    params: {
      status: status,
    },
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  })
      .then(response => {
        console.log('Response from server',response.data);
        // Update the UI with the new status
        setComplaints(prevComplaints => {
          const updatedComplaints = prevComplaints.map(complaint => {
            if (complaint.id === selectedComplaintId) {
              return { ...complaint, status };
            }
            return complaint;
          });
          return updatedComplaints;
        });
      })
      .catch(error => console.error('Error updating status:', error));

    handleMenuClose();
  };
  const handleAdminRemarkButtonClick = (complaintId, currentAdminRemark) => {
    setSelectedComplaintId(complaintId);
    setAdminRemarkContent(currentAdminRemark);
    setAdminRemarkPopupOpen(true);
  };
  const handleAdminRemarkUpdate = () => {
    axios
      .put(
        `http://localhost:8081/api/complaints/${selectedComplaintId}/adminRemark`,
        null,
        {
          params: {
            adminRemark: adminRemarkContent,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Response from server', response.data);
        setComplaints((prevComplaints) => {
          const updatedComplaints = prevComplaints.map((complaint) => {
            if (complaint.id === selectedComplaintId) {
              return { ...complaint, adminRemark: adminRemarkContent };
            }
            return complaint;
          });
          return updatedComplaints;
        });
        setAdminRemarkPopupOpen(false);
      })
      .catch((error) => console.error('Error updating admin remark:', error));
  };
     
  

  return (
    <div className='p-10' >
      <Card className='mt-2  '>
        <CardHeader title="All Complaints" />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        
        <TableHead sx={{ backgroundColor: 'rgb(59,59,251)' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Id</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>FirstName</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>EmployeeCode</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>Email</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>ComplaintDate</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>Department</TableCell>
           <TableCell align="left" sx={{ color: 'white' }}>SubDepartmentk</TableCell>
           <TableCell align="left" sx={{ color: 'white' }}>Complaint</TableCell>
           < TableCell align="left" sx={{ color: 'white' }}>Status</TableCell>
           < TableCell align="left" sx={{ color: 'white' }}> Update Status</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>AdminRemark</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}> Update AdminRemark</TableCell>
           
          
           
          </TableRow>
        </TableHead>
       <TableBody>
              {sortedComplaints.map(complaint => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell align="left">{complaint.user.firstName}</TableCell>
                  <TableCell align="left">{complaint.employeeCode}</TableCell>
                  <TableCell align="left">{complaint.user.email}</TableCell>
                  <TableCell align="left">{complaint.complaintDate}</TableCell>
                  <TableCell align="left">{complaint.department}</TableCell>
                  <TableCell align="left">{complaint.subDepartment}</TableCell>
                  <TableCell align="left">{complaint.complaint}</TableCell>
                  <TableCell align="left"> <span style={{ 
                      padding: '5px',
                      borderRadius: '20px',
                      ...getStatusStyles(complaint.status)
                    }}>
                      {complaint.status}
                    </span></TableCell>
                    
                    <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={(event) => handleMenuOpen(event, complaint.id)}
                    >
                      Update Status
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleStatusUpdate('PENDING')}>Pending</MenuItem>
                      <MenuItem onClick={() => handleStatusUpdate('RESOLVED')}>Resolved</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">{complaint.adminRemark}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleAdminRemarkButtonClick(
                          complaint.id,
                          complaint.adminRemark
                        )
                      }
                    >
                      Update AdminRemark
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
                  </TableBody>
      </Table>
    </TableContainer>
      </Card>
      <Dialog open={isAdminRemarkPopupOpen} onClose={() => setAdminRemarkPopupOpen(false)}>
        <DialogTitle>Update AdminRemark</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="AdminRemark"
            type="text"
            fullWidth
            value={adminRemarkContent}
            onChange={(e) => setAdminRemarkContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdminRemarkPopupOpen(false)}>Cancel</Button>
          <Button onClick={handleAdminRemarkUpdate} color="primary">
            Submit AdminRemark
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Complaints
