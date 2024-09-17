import React, { useState } from 'react';
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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Collapse,
  Button,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Custom Styled Components
const StyledContainer = styled(Container)({
  marginTop: '20px',
  marginBottom: '20px',
  display: 'flex',
  position: 'relative',
});

const SidebarToggle = styled(Box)({
  position: 'fixed',
  top: '100px',
  left: '20px',
  zIndex: 1000,
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

const statusIcon = (status) => {
  switch (status) {
    case 'Attended':
      return <CheckIcon style={{ color: 'green' }} />;
    case 'Missed':
      return <CancelIcon style={{ color: 'red' }} />;
    default:
      return null;
  }
};

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

// Sample Data
const sampleData = [
  {
    eventName: 'Food Drive',
    eventDescription: 'A community food drive for the homeless.',
    location: 'Community Center',
    requiredSkills: ['Teamwork', 'Organization'],
    urgency: 'High',
    eventDate: '2024-08-01',
    participationStatus: 'Attended',
  },
  {
    eventName: 'Charity Run',
    eventDescription: 'A charity run to raise funds for cancer research.',
    location: 'City Park',
    requiredSkills: ['Endurance', 'Motivation'],
    urgency: 'Medium',
    eventDate: '2024-09-01',
    participationStatus: 'Missed',
  },
  {
    eventName: 'Beach Cleanup',
    eventDescription: 'An initiative to clean up the local beach and preserve marine life.',
    location: 'Sunny Beach',
    requiredSkills: ['Physical Stamina', 'Environmental Awareness'],
    urgency: 'High',
    eventDate: '2024-09-15',
    participationStatus: 'Attended',
  },
  {
    eventName: 'Community Garden',
    eventDescription: 'Planting and maintaining a community garden to promote local agriculture.',
    location: 'Greenfield Park',
    requiredSkills: ['Gardening', 'Teamwork'],
    urgency: 'Low',
    eventDate: '2024-10-05',
    participationStatus: 'Attended',
  },
  {
    eventName: 'Fundraising Gala',
    eventDescription: 'A formal event to raise funds for local charities.',
    location: 'Grand Hotel',
    requiredSkills: ['Event Planning', 'Networking'],
    urgency: 'Medium',
    eventDate: '2024-11-01',
    participationStatus: 'Missed',
  },
  {
    eventName: 'Health Fair',
    eventDescription: 'A fair providing free health screenings and wellness information to the community.',
    location: 'Community Center',
    requiredSkills: ['Healthcare Knowledge', 'Public Speaking'],
    urgency: 'High',
    eventDate: '2024-11-15',
    participationStatus: 'Attended',
  },
  {
    eventName: 'Winter Clothing Drive',
    eventDescription: 'Collecting winter clothing to distribute to those in need during the colder months.',
    location: 'Local Library',
    requiredSkills: ['Organization', 'Communication'],
    urgency: 'Medium',
    eventDate: '2024-12-01',
    participationStatus: 'Attended',
  },
  {
    eventName: 'Book Fair',
    eventDescription: 'Organizing a fair to promote literacy and distribute books to underprivileged children.',
    location: 'City Hall',
    requiredSkills: ['Organization', 'Literacy Promotion'],
    urgency: 'Low',
    eventDate: '2024-12-15',
    participationStatus: 'Missed',
  },
];
const VolunteerHistory = () => {
  const [filters, setFilters] = useState({
    urgency: { High: true, Medium: true, Low: true },
    status: { Attended: true, Missed: true },
  });
  const [showFilters, setShowFilters] = useState(false);  // Toggle filter sidebar
  const [expandedRow, setExpandedRow] = useState(null);  // Track which row is expanded

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: {
        ...prevFilters[name],
        [value]: checked,
      },
    }));
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const filteredData = sampleData.filter(entry =>
    filters.urgency[entry.urgency] && filters.status[entry.participationStatus]
  );

  const [checked, setChecked] = useState(true);

  return (
    <Fade in={checked} timeout={600}>
    <StyledContainer>
      {/* Sidebar Toggle Button */}
      <SidebarToggle>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterAltIcon />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </Button>
      </SidebarToggle>

      {/* Collapsible Filter Section */}
      <Collapse in={showFilters} orientation="horizontal" sx={{ width: '250px', position: 'absolute', left: 0 }}>
        <Box sx={{ width: '220px', marginRight: '10px' }}> {/* Smaller width for the filter box */}
          <StyledPaper sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Filters {/* Slightly larger font for title */}
            </Typography>
            <FormGroup>
              {/* Make "Urgency" stand out */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px' }}>
                Urgency
              </Typography>
              {['High', 'Medium', 'Low'].map((level) => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      checked={filters.urgency[level]}
                      onChange={handleFilterChange}
                      name="urgency"
                      value={level}
                    />
                  }
                  label={level}
                />
              ))}

              {/* Make "Participation Status" stand out */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px' }}>
                Participation Status
              </Typography>
              {['Attended', 'Missed'].map((status) => (
                <FormControlLabel
                  key={status}
                  control={
                    <Checkbox
                      checked={filters.status[status]}
                      onChange={handleFilterChange}
                      name="status"
                      value={status}
                    />
                  }
                  label={status}
                />
              ))}
            </FormGroup>
          </StyledPaper>
        </Box>
      </Collapse>

      {/* Volunteer History Table */}
      <Box sx={{ flex: 1, ml: showFilters ? '270px' : '20px' }}> {/* Adjust layout when filter box is shown */}
        <StyledPaper>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#6482AD', fontWeight: 'bold' }}>
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
                {filteredData.map((entry, index) => (
                  <React.Fragment key={index}>
                    <StyledTableRow onClick={() => handleRowClick(index)} style={{ cursor: 'pointer' }}>
                      <StyledTableCell>{entry.eventName}</StyledTableCell>
                      <StyledTableCell>{formatDate(entry.eventDate)}</StyledTableCell>
                      <StyledUrgencyCell urgency={entry.urgency}>{entry.urgency}</StyledUrgencyCell>
                      <StyledTableCell>{statusIcon(entry.participationStatus)}</StyledTableCell>
                      <StyledTableCell>
                        {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </StyledTableCell>
                    </StyledTableRow>

                    {/* Collapsible content */}
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              <strong>Event Description:</strong> {entry.eventDescription}
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
                ))}
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
