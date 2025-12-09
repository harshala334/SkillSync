const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { title, description, techStack } = req.body;
        const project = new Project({
            title,
            description,
            techStack,
            owner: req.user.id,
            members: [req.user.id] // Owner is automatically a member
        });
        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('owner', 'name email')
            .populate('members', 'name role avatar'); // Avatar might be empty initially
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.joinProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Check if already a member
        if (project.members.some(member => member.toString() === req.user.id)) {
            return res.status(400).json({ message: 'User already a member' });
        }

        project.members.push(req.user.id);
        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getProjectTeammates = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('members', 'name email role avatar');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project.members);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
