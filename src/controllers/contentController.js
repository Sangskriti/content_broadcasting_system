const Content = require('../models/Content');
const { Op } = require('sequelize'); 

exports.uploadContent = async (req, res) => {
    try {
        const { title, subject, start_time, end_time, duration } = req.body;
        
        if (!req.file) return res.status(400).json({ message: "Please upload a file" });

        const content = await Content.create({
            title,
            subject,
            start_time,
            end_time,
            duration: parseInt(duration) || 5, 
            file_path: req.file.path,
            uploaded_by: req.userId 
        });
        res.status(201).json(content);
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
};

// exports.getLiveContent = async (req, res) => {
//     try {
//         const { teacherId } = req.params;
//         const now = new Date();

        
//         const contents = await Content.findAll({ 
//             where: { 
//                 uploaded_by: teacherId, 
//                 status: 'approved',
//                 start_time: { [Op.lte]: now }, 
//                 end_time: { [Op.gte]: now }
//             },
//             order: [['createdAt', 'ASC']] 
//         });

//         if (!contents || contents.length === 0) {
//             return res.status(200).json({ message: "No content available" });
//         }

        
//         const durationPerContent = 5 * 60 * 1000; 
//         const totalContents = contents.length;
        
        
//         const currentTimeMillis = now.getTime();
//         const index = Math.floor((currentTimeMillis / durationPerContent) % totalContents);

//         const active = contents[index];
        
//         res.json({
//             status: "Live",
//             currentIndex: index,
//             totalInRotation: totalContents,
//             data: active
//         });
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// };

exports.reviewContent = async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);
        if (!content) return res.status(404).json({ message: "Content not found" });

        content.status = req.body.status;
        content.rejection_reason = req.body.rejection_reason || null;
        
        await content.save();
        res.json({ message: `Content ${req.body.status} successfully`, content });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


exports.getLiveContent = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const now = new Date();

        const contents = await Content.findAll({ 
            where: { 
                uploaded_by: teacherId, 
                status: 'approved',
                start_time: { [Op.lte]: now }, 
                end_time: { [Op.gte]: now }
            },
            order: [['createdAt', 'ASC']] 
        });

        if (!contents || contents.length === 0) {
            return res.status(200).json({ message: "No content available" });
        }

        const totalContents = contents.length;
        
        
        const startTime = new Date(contents[0].start_time).getTime();
        const currentTime = now.getTime();
        const timeDiff = currentTime - startTime;

        
        const durationPerContent = 5 * 60 * 1000; 
        
        
        const index = Math.floor((timeDiff / durationPerContent) % totalContents);

        const active = contents[index];
        
        res.json({
            status: "Live",
            currentIndex: index,
            totalInRotation: totalContents,
            nextRotationIn: Math.ceil((durationPerContent - (timeDiff % durationPerContent)) / 1000) + " seconds",
            data: active
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};