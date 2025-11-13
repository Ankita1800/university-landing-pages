const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from landing pages
app.use('/delhi-university', express.static(path.join(__dirname, '../delhi-university-landing')));
app.use('/mit', express.static(path.join(__dirname, '../mit-landing')));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get university information
app.get('/api/universities', (req, res) => {
    const universities = [
        {
            id: 'delhi-university',
            name: 'Delhi University',
            location: 'Delhi, India',
            established: 1922,
            landingPage: '/delhi-university'
        },
        {
            id: 'mit',
            name: 'Massachusetts Institute of Technology',
            location: 'Cambridge, MA, USA',
            established: 1861,
            landingPage: '/mit'
        }
    ];
    res.json(universities);
});

// Get specific university details
app.get('/api/universities/:id', (req, res) => {
    const { id } = req.params;
    
    const universities = {
        'delhi-university': {
            id: 'delhi-university',
            name: 'Delhi University',
            description: 'One of India\'s premier educational institutions',
            programs: ['Undergraduate', 'Postgraduate', 'Research'],
            website: 'https://www.du.ac.in'
        },
        'mit': {
            id: 'mit',
            name: 'Massachusetts Institute of Technology',
            description: 'Leading research university in science and technology',
            programs: ['Engineering', 'Science', 'Management', 'Architecture'],
            website: 'https://www.mit.edu'
        }
    };
    
    const university = universities[id];
    if (university) {
        res.json(university);
    } else {
        res.status(404).json({ error: 'University not found' });
    }
});

// Application submission endpoint
app.post('/api/applications', (req, res) => {
    const { universityId, studentName, email, program } = req.body;
    
    if (!universityId || !studentName || !email || !program) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In production, this would save to a database
    console.log('New application received:', { universityId, studentName, email, program });
    
    res.status(201).json({
        message: 'Application submitted successfully',
        applicationId: `APP-${Date.now()}`,
        status: 'pending'
    });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ message: 'Thank you for contacting us. We will get back to you soon.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Delhi University landing: http://localhost:${PORT}/delhi-university`);
    console.log(`MIT landing: http://localhost:${PORT}/mit`);
});

module.exports = app;
