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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { unparse } from 'papaparse';

const EventReport = () => {
  const [events, setEvents] = useState([]);
  const [openRows, setOpenRows] = useState({});

  // Fetch event data with volunteer details
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events/all-with-volunteer-count');
        setEvents(
          response.data.map(event => ({
            ...event,
            eventDate: new Date(event.eventDate).toLocaleDateString(), // Format date
          }))
        );
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvents();
  }, []);

  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const generateCSV = () => {
    try {
      if (!events || events.length === 0) {
        alert('No events available to generate the CSV report.');
        return;
      }

      // Format data for CSV
      const csvData = events.flatMap((event) => [
        {
          eventName: event.eventName || 'N/A',
          eventDate: event.eventDate || 'N/A',
          location: event.location || 'N/A',
          volunteerCount: event.volunteerCount || 0,
          volunteerName: '---', // Placeholder for main event row
          volunteerEmail: '---',
        },
        ...event.volunteers.map((volunteer) => ({
          eventName: '',
          eventDate: '',
          location: '',
          volunteerCount: '',
          volunteerName: volunteer.name || 'N/A',
          volunteerEmail: volunteer.email || 'N/A',
        })),
      ]);

      // Generate and download CSV
      const csv = unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'event_report.csv');
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
    doc.text('Event Management Report', 14, 22);

    // Generate table with event and volunteer details
    const rows = events.flatMap((event) => [
      [
        event.eventName,
        event.eventDate,
        event.location,
        event.volunteerCount || 0,
        '', // Placeholder for main event row
        '',
      ],
      ...event.volunteers.map((volunteer) => [
        '',
        '',
        '',
        '',
        volunteer.name || 'N/A',
        volunteer.email || 'N/A',
      ]),
    ]);

    autoTable(doc, {
      head: [['Event Name', 'Date', 'Location', 'Volunteers', 'Volunteer Name', 'Volunteer Email']],
      body: rows,
    });

    doc.save('event_report.pdf');
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Event Management Report
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Event Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Number of Volunteers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => toggleRow(index)}>
                      {openRows[index] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.eventDate}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.volunteerCount || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} style={{ padding: 0 }}>
                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Volunteer Name</TableCell>
                              <TableCell>Volunteer Email</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {event.volunteers.map((volunteer, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{volunteer.name}</TableCell>
                                <TableCell>{volunteer.email}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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

export default EventReport;
