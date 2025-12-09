const Resume = require('../models/Resume');

exports.saveResume = async (req, res) => {
    try {
        const resumeData = req.body;

        // Upsert: Update if exists, create if not
        const resume = await Resume.findOneAndUpdate(
            { user: req.user.id },
            {
                $set: { ...resumeData, updatedAt: Date.now() },
                $setOnInsert: { user: req.user.id }
            },
            { new: true, upsert: true }
        );

        res.json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error saving resume' });
    }
};

exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ user: req.user.id });
        if (!resume) {
            return res.status(404).json({ message: 'No resume found' });
        }
        res.json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching resume' });
    }
};
