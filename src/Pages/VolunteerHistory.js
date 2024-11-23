import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Collapse,
  Fade,
  CircularProgress,
  Alert,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Styled Components
// Styled Components
const StyledContainer = styled(Container)({
  marginTop: '20px',
  marginBottom: '20px',
  display: 'flex',
  position: 'relative',
});

const StyledPaper = styled(Paper)({
  backgroundColor: '#f5f5f5',
  boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
  borderRadius: '15px',
  padding: '20px',
  maxWidth: '900px',
  margin: 'auto',
});

const StyledTable = styled(Table)({
  minWidth: 650,
  borderCollapse: 'separate',
  borderSpacing: '0 8px',
  borderRadius: '12px',
  overflow: 'hidden',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)',
  '&:nth-of-type(even)': {
    backgroundColor: '#FAFAFA',
  },
  '&:hover': {
    backgroundColor: '#F0F4F8',
    transform: 'scale(1.01)',
    transition: 'all 0.3s ease-in-out',
  },
}));

const StyledTableCell = styled(TableCell)({
  padding: '12px 16px',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderBottom: 'none',
  fontSize: '14px',
  width: '150px',
});

const StyledTableHeaderCell = styled(TableCell)({
  border: '1px solid #7FA1C3',
  padding: '15px',
  backgroundColor: '#6482AD',
  color: '#F5EDED',
  fontWeight: 'bold',
  fontSize: '16px',
  width: '150px',
});

const StyledUrgencyCell = styled(TableCell)(({ urgency }) => ({
  color: urgencyColor(urgency),
  fontWeight: 'bold',
  fontSize: '14px',
}));

const urgencyColor = (urgency) => {
  switch (urgency) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'green';
    default:
      return 'gray';
  }
};

const formatDate = (dateStr) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const VolunteerHistory = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('No token found, please log in.');

        const response = await fetch(`http://localhost:4000/api/history?userId=${userId}`, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          console.error('Server responded with error:', errorDetails);
          throw new Error('Failed to fetch volunteer history.');
        }

        const data = await response.json();
        console.log('Fetched history data:', data);
        setVolunteerHistory(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching volunteer history:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVolunteerHistory();
  }, []);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleStatusChange = (index) => {
    const updatedHistory = [...volunteerHistory];
    updatedHistory[index].participationStatus =
      updatedHistory[index].participationStatus === 'Attended' ? 'Missed' : 'Attended';
    setVolunteerHistory(updatedHistory);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ maxWidth: '600px', margin: '20px auto' }}>
        {error}
      </Alert>
    );
  }

  return (
    <Fade in={true} timeout={600}>
      <StyledContainer>
        <Box sx={{ flex: 1 }}>
          <StyledPaper>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}
            >
              Volunteer History
            </Typography>

            <TableContainer component={Paper}>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <StyledTableHeaderCell>Event Name</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Event Date</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Urgency</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Expand</StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteerHistory.length > 0 ? (
                    volunteerHistory.map((entry, index) => (
                      <React.Fragment key={index}>
                        <StyledTableRow>
                          <StyledTableCell>{entry.eventName}</StyledTableCell>
                          <StyledTableCell>{formatDate(entry.eventDate)}</StyledTableCell>
                          <StyledUrgencyCell urgency={entry.urgency}>
                            {entry.urgency}
                          </StyledUrgencyCell>
                          <StyledTableCell>
                            <Checkbox
                              checked={entry.participationStatus === 'Attended'}
                              onChange={() => handleStatusChange(index)}
                              color="success"
                            />
                          </StyledTableCell>
                          <StyledTableCell onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                            {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </StyledTableCell>
                        </StyledTableRow>

                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                            <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                  <strong>Description:</strong> {entry.eventDescription}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                  <strong>Location:</strong> {entry.location}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                  <strong>Required Skills:</strong> {entry.requiredSkills.join(', ')}
                                </Typography>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No volunteer history available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </StyledTable>
            </TableContainer>
          </StyledPaper>
        </Box>
      </StyledContainer>
    </Fade>
  );
};

export default VolunteerHistory;
