const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime() 
    });
});

// Get university information (Simple JSON)
app.get('/api/universities', (req, res) => {
    const universities = [
        {
            id: 1,
            slug: 'mit',
            name: 'Massachusetts Institute of Technology',
            abbreviation: 'MIT',
            location: 'Cambridge, MA, USA',
            established: 1861,
            landingPage: '/mit',
            type: 'Private Research University'
        },
        {
            id: 2,
            slug: 'delhi-university',
            name: 'Delhi University',
            abbreviation: 'DU',
            location: 'Delhi, India',
            established: 1922,
            landingPage: '/delhi-university',
            type: 'Public Central University'
        }
    ];
    res.json({
        success: true,
        count: universities.length,
        data: universities
    });
});

// Get specific university details (Nested JSON)
app.get('/api/universities/:id', (req, res) => {
    const { id } = req.params;
    
    const universities = {
        'mit': {
            id: 1,
            slug: 'mit',
            name: 'Massachusetts Institute of Technology',
            abbreviation: 'MIT',
            description: 'Leading research university in science and technology',
            established: 1861,
            location: {
                city: 'Cambridge',
                state: 'Massachusetts',
                country: 'USA',
                coordinates: {
                    latitude: 42.3601,
                    longitude: -71.0942
                }
            },
            contact: {
                email: 'admissions@mit.edu',
                phone: '+1-617-253-1000',
                website: 'https://www.mit.edu'
            },
            programs: [
                {
                    id: 1,
                    name: 'Engineering',
                    description: 'World-class engineering programs',
                    degrees: ['Bachelor\'s', 'Master\'s', 'PhD']
                },
                {
                    id: 2,
                    name: 'Science',
                    description: 'Leading research in natural sciences',
                    degrees: ['Bachelor\'s', 'Master\'s', 'PhD']
                },
                {
                    id: 3,
                    name: 'Computing',
                    description: 'Computer science and AI leadership',
                    degrees: ['Bachelor\'s', 'Master\'s', 'PhD']
                },
                {
                    id: 4,
                    name: 'Management',
                    description: 'MIT Sloan School of Management',
                    degrees: ['MBA', 'Master\'s', 'PhD']
                }
            ],
            statistics: {
                students: 11520,
                faculty: 1000,
                internationalStudents: 3800,
                acceptanceRate: '3.9%'
            }
        },
        'delhi-university': {
            id: 2,
            slug: 'delhi-university',
            name: 'Delhi University',
            abbreviation: 'DU',
            description: 'One of India\'s premier educational institutions',
            established: 1922,
            location: {
                city: 'New Delhi',
                state: 'Delhi',
                country: 'India',
                coordinates: {
                    latitude: 28.6863,
                    longitude: 77.2050
                }
            },
            contact: {
                email: 'info@du.ac.in',
                phone: '+91-11-27667725',
                website: 'https://www.du.ac.in'
            },
            programs: [
                {
                    id: 1,
                    name: 'Undergraduate',
                    description: 'Bachelor\'s programs in Arts, Science, and Commerce',
                    degrees: ['B.A.', 'B.Sc.', 'B.Com']
                },
                {
                    id: 2,
                    name: 'Postgraduate',
                    description: 'Master\'s programs across disciplines',
                    degrees: ['M.A.', 'M.Sc.', 'M.Com', 'MBA']
                },
                {
                    id: 3,
                    name: 'Research',
                    description: 'PhD and research opportunities',
                    degrees: ['M.Phil', 'PhD']
                }
            ],
            statistics: {
                students: 132000,
                faculty: 9000,
                colleges: 77,
                acceptanceRate: 'Variable by college'
            }
        }
    };
    
    const university = universities[id];
    if (university) {
        res.json({
            success: true,
            data: university
        });
    } else {
        res.status(404).json({ 
            success: false,
            error: 'University not found' 
        });
    }
});

// Get programs list (Simple JSON)
app.get('/api/programs', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: 'Engineering', category: 'STEM', duration: '4 years' },
            { id: 2, name: 'Science', category: 'STEM', duration: '4 years' },
            { id: 3, name: 'Computing', category: 'STEM', duration: '4 years' },
            { id: 4, name: 'Management', category: 'Business', duration: '2 years' },
            { id: 5, name: 'Arts', category: 'Humanities', duration: '3 years' },
            { id: 6, name: 'Commerce', category: 'Business', duration: '3 years' }
        ]
    });
});

// Get admissions information (Nested JSON)
app.get('/api/admissions', (req, res) => {
    res.json({
        success: true,
        data: {
            applicationProcess: {
                steps: [
                    {
                        step: 1,
                        title: 'Create Account',
                        description: 'Register on the admissions portal',
                        duration: '5 minutes'
                    },
                    {
                        step: 2,
                        title: 'Fill Application',
                        description: 'Complete the application form',
                        duration: '30-45 minutes'
                    },
                    {
                        step: 3,
                        title: 'Upload Documents',
                        description: 'Submit required documents',
                        duration: '15 minutes'
                    },
                    {
                        step: 4,
                        title: 'Pay Fee',
                        description: 'Complete fee payment',
                        duration: '5 minutes'
                    },
                    {
                        step: 5,
                        title: 'Submit',
                        description: 'Review and submit',
                        duration: '5 minutes'
                    }
                ]
            },
            requirements: {
                undergraduate: {
                    academic: ['High School Diploma', 'Transcripts', 'Test Scores'],
                    documents: ['Passport', 'Photo', 'Recommendation Letter']
                },
                postgraduate: {
                    academic: ['Bachelor\'s Degree', 'Transcripts', 'GRE/GMAT'],
                    documents: ['Resume', 'Statement of Purpose', 'Letters']
                }
            },
            deadlines: {
                fall: {
                    earlyAction: 'November 1',
                    regularDecision: 'January 1',
                    notification: 'March 15'
                },
                spring: {
                    regularDecision: 'October 1',
                    notification: 'December 15'
                }
            }
        }
    });
});

// Get student statistics (Nested JSON)
app.get('/api/statistics', (req, res) => {
    res.json({
        success: true,
        data: {
            enrollment: {
                total: 143520,
                undergraduate: 95000,
                postgraduate: 40000,
                doctoral: 8520
            },
            demographics: {
                international: {
                    count: 25000,
                    percentage: 17.4,
                    topCountries: [
                        { country: 'China', count: 8000 },
                        { country: 'India', count: 6000 },
                        { country: 'South Korea', count: 3500 }
                    ]
                },
                gender: {
                    male: 51.2,
                    female: 47.8,
                    other: 1.0
                }
            },
            outcomes: {
                graduationRate: 94.5,
                employmentRate: 92.3,
                averageSalary: {
                    currency: 'USD',
                    amount: 85000
                },
                topEmployers: ['Google', 'Microsoft', 'Amazon', 'Apple']
            }
        }
    });
});

// Get course-wise fees (Nested JSON)
app.get('/api/fees/:university', (req, res) => {
    const { university } = req.params;
    
    const feesData = {
        'mit': {
            success: true,
            university: 'MIT',
            currency: 'USD',
            data: {
                undergraduate: [
                    {
                        course: 'B.Tech Computer Science',
                        duration: '4 Years',
                        tuitionFee: 55878,
                        additionalFees: 2000,
                        totalAnnual: 57878,
                        totalProgram: 231512
                    },
                    {
                        course: 'B.Tech Electrical Engineering',
                        duration: '4 Years',
                        tuitionFee: 55878,
                        additionalFees: 2000,
                        totalAnnual: 57878,
                        totalProgram: 231512
                    },
                    {
                        course: 'B.Sc. Physics',
                        duration: '4 Years',
                        tuitionFee: 55878,
                        additionalFees: 1800,
                        totalAnnual: 57678,
                        totalProgram: 230712
                    },
                    {
                        course: 'B.Arch Architecture',
                        duration: '5 Years',
                        tuitionFee: 55878,
                        additionalFees: 2500,
                        totalAnnual: 58378,
                        totalProgram: 291890
                    }
                ],
                postgraduate: [
                    {
                        course: 'M.Tech Computer Science',
                        duration: '2 Years',
                        tuitionFee: 55878,
                        additionalFees: 3000,
                        totalAnnual: 58878,
                        totalProgram: 117756
                    },
                    {
                        course: 'MBA (Sloan School)',
                        duration: '2 Years',
                        tuitionFee: 80000,
                        additionalFees: 5000,
                        totalAnnual: 85000,
                        totalProgram: 170000
                    },
                    {
                        course: 'M.Sc. Data Science',
                        duration: '2 Years',
                        tuitionFee: 55878,
                        additionalFees: 2500,
                        totalAnnual: 58378,
                        totalProgram: 116756
                    }
                ],
                phd: [
                    {
                        course: 'PhD Engineering',
                        duration: '5-6 Years',
                        tuitionFee: 'Fully Funded',
                        additionalFees: 0,
                        totalAnnual: 0,
                        totalProgram: 0,
                        note: 'Full tuition waiver + stipend provided'
                    }
                ]
            }
        },
        'delhi-university': {
            success: true,
            university: 'Delhi University',
            currency: 'INR',
            data: {
                undergraduate: [
                    {
                        course: 'B.A. (Hons) Economics',
                        duration: '3 Years',
                        tuitionFee: 15000,
                        additionalFees: 2000,
                        totalAnnual: 17000,
                        totalProgram: 51000
                    },
                    {
                        course: 'B.Sc. (Hons) Computer Science',
                        duration: '3 Years',
                        tuitionFee: 25000,
                        additionalFees: 3000,
                        totalAnnual: 28000,
                        totalProgram: 84000
                    },
                    {
                        course: 'B.Com (Hons)',
                        duration: '3 Years',
                        tuitionFee: 12000,
                        additionalFees: 2000,
                        totalAnnual: 14000,
                        totalProgram: 42000
                    },
                    {
                        course: 'B.A. (Hons) English',
                        duration: '3 Years',
                        tuitionFee: 10000,
                        additionalFees: 1500,
                        totalAnnual: 11500,
                        totalProgram: 34500
                    }
                ],
                postgraduate: [
                    {
                        course: 'M.A. Economics',
                        duration: '2 Years',
                        tuitionFee: 20000,
                        additionalFees: 3000,
                        totalAnnual: 23000,
                        totalProgram: 46000
                    },
                    {
                        course: 'M.Sc. Computer Science',
                        duration: '2 Years',
                        tuitionFee: 35000,
                        additionalFees: 4000,
                        totalAnnual: 39000,
                        totalProgram: 78000
                    },
                    {
                        course: 'MBA (FMS Delhi)',
                        duration: '2 Years',
                        tuitionFee: 100000,
                        additionalFees: 10000,
                        totalAnnual: 110000,
                        totalProgram: 220000
                    },
                    {
                        course: 'M.Com',
                        duration: '2 Years',
                        tuitionFee: 18000,
                        additionalFees: 2500,
                        totalAnnual: 20500,
                        totalProgram: 41000
                    }
                ],
                phd: [
                    {
                        course: 'PhD (All Disciplines)',
                        duration: '3-5 Years',
                        tuitionFee: 5000,
                        additionalFees: 1000,
                        totalAnnual: 6000,
                        totalProgram: 30000,
                        note: 'Fellowship available for eligible candidates'
                    }
                ]
            }
        }
    };
    
    const fees = feesData[university];
    if (fees) {
        res.json(fees);
    } else {
        res.status(404).json({
            success: false,
            error: 'University fees not found'
        });
    }
});

// Get Indian states list
app.get('/api/states', (req, res) => {
    res.json({
        success: true,
        data: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
            'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
            'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
            'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
            'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
            'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
            'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
        ]
    });
});

// Application submission endpoint (POST - integrates with Pipedream)
app.post('/api/applications', (req, res) => {
    const { universityId, studentName, email, program } = req.body;
    
    if (!universityId || !studentName || !email || !program) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In production, this would save to a database
    const application = {
        applicationId: `APP-${Date.now()}`,
        universityId,
        studentName,
        email,
        program,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    console.log('New application received:', application);
    
    res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: application
    });
});

// Leads submission endpoint (POST)
app.post('/api/leads', (req, res) => {
    const { name, email, phone, program, message, university } = req.body;
    
    if (!name || !email || !phone || !program) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields'
        });
    }
    
    const lead = {
        id: Date.now(),
        name,
        email,
        phone,
        program,
        message: message || '',
        university: university || 'Unknown',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    console.log('New lead received:', lead);
    
    res.status(201).json({
        success: true,
        message: 'Lead submitted successfully',
        data: lead
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
