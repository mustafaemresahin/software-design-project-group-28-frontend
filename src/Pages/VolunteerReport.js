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
  Button,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { unparse } from 'papaparse';

const VolunteerReport = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  // Fetch volunteer data from the new endpoint
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/matching/volunteer-details');
        const groupedVolunteers = response.data.reduce((acc, item) => {
          const volunteer = acc[item.userEmail] || {
            userName: item.userName,
            userEmail: item.userEmail,
            events: [],
          };
          volunteer.events.push({
            eventName: item.eventName,
            eventDate: item.eventDate ? new Date(item.eventDate).toLocaleDateString() : 'N/A',
            eventLocation: item.eventLocation || 'N/A',
          });
          acc[item.userEmail] = volunteer;
          return acc;
        }, {});
        setVolunteers(Object.values(groupedVolunteers));
      } catch (error) {
        console.error('Error fetching volunteer data:', error);
      }
    };

    fetchVolunteers();
  }, []);

  const toggleExpandRow = (email) => {
    setExpandedRows((prev) => ({ ...prev, [email]: !prev[email] }));
  };

  const generateCSV = () => {
    try {
      const csvData = volunteers.flatMap((volunteer) => [
        { VolunteerName: volunteer.userName, Email: volunteer.userEmail, EventName: '', EventDate: '', Location: '' },
        ...volunteer.events.map((event) => ({
          VolunteerName: '',
          Email: '',
          EventName: event.eventName,
          EventDate: event.eventDate,
          Location: event.eventLocation,
        })),
      ]);

      const csv = unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'volunteer_report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating CSV:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Volunteer Participation Report', 14, 22);

    const pdfData = volunteers.flatMap((volunteer) => [
      [volunteer.userName, volunteer.userEmail, '', '', ''],
      ...volunteer.events.map((event) => ['', '', event.eventName, event.eventDate, event.eventLocation]),
    ]);

    autoTable(doc, {
      head: [['Volunteer Name', 'Email', 'Event Name', 'Event Date', 'Location']],
      body: pdfData,
    });

    doc.save('volunteer_report.pdf');
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Volunteer Participation Report
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Volunteer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((volunteer, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{volunteer.userName}</TableCell>
                  <TableCell>{volunteer.userEmail}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => toggleExpandRow(volunteer.userEmail)}>
                      {expandedRows[volunteer.userEmail] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Collapse in={expandedRows[volunteer.userEmail]} timeout="auto" unmountOnExit>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Event Date</TableCell>
                            <TableCell>Location</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {volunteer.events.map((event, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{event.eventName}</TableCell>
                              <TableCell>{event.eventDate}</TableCell>
                              <TableCell>{event.eventLocation}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={generatePDF} sx={{ mt: 3, mr: 2 }}>
        Download PDF
      </Button>
      <Button variant="contained" onClick={generateCSV} sx={{ mt: 3 }}>
        Download CSV
      </Button>
    </Container>
  );
};

export default VolunteerReport;
