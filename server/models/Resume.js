const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    personalInfo: {
        name: String,
        location: String,
        phone: String,
        email: String,
        linkedin: String,
        github: String,
        portfolio: String
    },
    education: [{
        institute: String,
        degree: String,
        location: String,
        duration: String
    }],
    experience: [{
        role: String,
        company: String,
        location: String,
        duration: String,
        points: [String]
    }],
    projects: [{
        title: String,
        tech: String,
        link: String,
        date: String,
        points: [String]
    }],
    skills: {
        languages: String,
        tools: String,
        frameworks: String
    },
    coursework: [String],
    achievements: [String],
    certifications: [String],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
