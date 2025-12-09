const User = require('../models/User');
const MentorRequest = require('../models/MentorRequest');

exports.getAllMentors = async (req, res) => {
    try {
        const mentors = await User.find({ isMentor: true }).select('-password');
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.registerAsMentor = async (req, res) => {
    try {
        const { jobTitle, company, bio, skills } = req.body;

        // Update user to be a mentor
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                isMentor: true,
                jobTitle,
                company,
                bio,
                skills // Optional: update skills if provided
            },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.connectToMentor = async (req, res) => {
    try {
        const { mentorId, message } = req.body;

        if (mentorId === req.user.id) {
            return res.status(400).json({ message: "You cannot request mentorship from yourself" });
        }

        // Check if request already exists
        const existingRequest = await MentorRequest.findOne({
            mentor: mentorId,
            mentee: req.user.id,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Request already pending' });
        }

        const request = new MentorRequest({
            mentor: mentorId,
            mentee: req.user.id,
            message
        });

        await request.save();
        res.status(201).json({ message: 'Connection request sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
