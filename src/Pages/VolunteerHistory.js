import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2em',
    color: '#000000', // Updated heading color to black
  },
  paragraph: {
    fontSize: '1.1em',
    color: '#000000', // Paragraph color remains the same
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  th: {
    border: '1px solid #E2DAD6', // Updated border color
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#6482AD', // Updated header background color
    color: '#F5EDED', // Updated header text color
  },
  td: {
    border: '1px solid #E2DAD6', // Updated border color
    padding: '12px',
    textAlign: 'left',
  },
  trEven: {
    backgroundColor: '#F5EDED', // Updated row background color
  },
  trHover: {
    backgroundColor: '#E2DAD6', // Updated hover background color
  },
};

function formatDate(dateStr) {
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

function VolunteerHistory() {
  // Sample data
  const [volunteerHistory, setVolunteerHistory] = useState([
    { date: '2024-08-01', event: 'Food Drive', hours: 4 },
    { date: '2024-08-15', event: 'Community Cleanup', hours: 3 },
    { date: '2024-09-01', event: 'Charity Run', hours: 5 },
  ]);

  // You can use useEffect to fetch data from an API if needed
  // useEffect(() => {
  //   fetch('/api/volunteer-history')
  //     .then(response => response.json())
  //     .then(data => setVolunteerHistory(data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Volunteer History</h1>
      <p style={styles.paragraph}>
        This page displays the history of days a volunteer has worked and the events they have participated in.
      </p>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Event</th>
              <th style={styles.th}>Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {volunteerHistory.map((entry, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.trEven : {}}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                <td style={styles.td}>{formatDate(entry.date)}</td>
                <td style={styles.td}>{entry.event}</td>
                <td style={styles.td}>{entry.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VolunteerHistory;
