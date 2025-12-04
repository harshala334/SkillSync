'use client'
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Plus, Trash2 } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function ResumeBuilderPage() {
    const [resumeData, setResumeData] = useState({
        name: "Harshala Mahajan",
        role: "Full-Stack Developer",
        email: "harshala@example.com",
        phone: "+91 98765 43210",
        summary: "Passionate Full-Stack Developer with expertise in MERN stack and AI integration. Building scalable web applications and exploring new technologies.",
        skills: ["React", "Node.js", "MongoDB", "TailwindCSS", "Python"],
        experience: [
            {
                id: 1,
                role: "Frontend Intern",
                company: "Tech Solutions",
                duration: "Jan 2024 - Present",
                description: "Developed responsive UI components using React and TailwindCSS. Collaborated with the backend team to integrate APIs."
            }
        ],
        projects: [
            {
                id: 1,
                title: "SkillSync",
                description: "AI-powered peer learning platform connecting students for collaboration."
            }
        ]
    });

    const resumeRef = useRef();

    const handleDownloadPDF = () => {
        const element = resumeRef.current;
        const opt = {
            margin: [10, 10],
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleChange = (e, field) => {
        setResumeData({ ...resumeData, [field]: e.target.value });
    };

    const handleArrayChange = (index, field, value, arrayName) => {
        const newArray = [...resumeData[arrayName]];
        newArray[index][field] = value;
        setResumeData({ ...resumeData, [arrayName]: newArray });
    };

    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [
                ...resumeData.experience,
                { id: Date.now(), role: "", company: "", duration: "", description: "" }
            ]
        });
    };

    const removeExperience = (id) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.filter(exp => exp.id !== id)
        });
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                        Smart <span className="text-gradient">Resume Builder</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Create a professional resume in minutes. Edit the details on the left and see the live preview on the right.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Editor Section */}
                    <div className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader>
                                <CardTitle>Personal Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <Input value={resumeData.name} onChange={(e) => handleChange(e, 'name')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <Input value={resumeData.role} onChange={(e) => handleChange(e, 'role')} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Input value={resumeData.email} onChange={(e) => handleChange(e, 'email')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone</label>
                                        <Input value={resumeData.phone} onChange={(e) => handleChange(e, 'phone')} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Professional Summary</label>
                                    <Textarea value={resumeData.summary} onChange={(e) => handleChange(e, 'summary')} rows={4} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 backdrop-blur-sm border-border">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Experience</CardTitle>
                                <Button variant="outline" size="sm" onClick={addExperience}>
                                    <Plus className="w-4 h-4 mr-2" /> Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={exp.id} className="p-4 border border-border rounded-lg space-y-4 relative group">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeExperience(exp.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                placeholder="Role"
                                                value={exp.role}
                                                onChange={(e) => handleArrayChange(index, 'role', e.target.value, 'experience')}
                                            />
                                            <Input
                                                placeholder="Company"
                                                value={exp.company}
                                                onChange={(e) => handleArrayChange(index, 'company', e.target.value, 'experience')}
                                            />
                                        </div>
                                        <Input
                                            placeholder="Duration"
                                            value={exp.duration}
                                            onChange={(e) => handleArrayChange(index, 'duration', e.target.value, 'experience')}
                                        />
                                        <Textarea
                                            placeholder="Description"
                                            value={exp.description}
                                            onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'experience')}
                                        />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Preview Section */}
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <Button onClick={handleDownloadPDF} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </Button>
                        </div>

                        <div className="bg-white text-black p-8 rounded-lg shadow-xl min-h-[800px]" ref={resumeRef}>
                            {/* Resume Header */}
                            <div className="border-b-2 border-gray-800 pb-6 mb-6">
                                <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">{resumeData.name}</h1>
                                <p className="text-xl text-indigo-600 font-medium mt-1">{resumeData.role}</p>
                                <div className="flex gap-4 mt-3 text-sm text-gray-600">
                                    <span>{resumeData.email}</span>
                                    <span>•</span>
                                    <span>{resumeData.phone}</span>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-2 mb-3">Summary</h2>
                                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
                            </div>

                            {/* Experience */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-2 mb-4">Experience</h2>
                                <div className="space-y-6">
                                    {resumeData.experience.map((exp) => (
                                        <div key={exp.id}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                                <span className="text-sm text-gray-600 italic">{exp.duration}</span>
                                            </div>
                                            <p className="text-indigo-600 font-medium text-sm mb-2">{exp.company}</p>
                                            <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-2 mb-3">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
