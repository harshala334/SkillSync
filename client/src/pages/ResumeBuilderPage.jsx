'use client'
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Plus, Trash2, ExternalLink, FileText } from "lucide-react";
import html2pdf from "html2pdf.js";

import { latexTemplate } from "./latexTemplate";
import { saveResume, getResume } from "../services/resumeService";

export default function ResumeBuilderPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [resumeData, setResumeData] = useState({
        name: "",
        location: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        portfolio: "",
        education: [],
        experience: [],
        projects: [],
        skills: {
            languages: "",
            tools: "",
            frameworks: ""
        },
        coursework: [],
        achievements: [],
        certifications: []
    });

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {
        try {
            const data = await getResume();
            if (data) {
                // Merge backend data with structure to ensure all fields exist
                setResumeData(prev => ({
                    ...prev,
                    ...data.personalInfo, // Spread personal info
                    education: data.education || [],
                    experience: data.experience || [],
                    projects: data.projects || [],
                    skills: data.skills || { languages: "", tools: "", frameworks: "" },
                    coursework: data.coursework || [],
                    achievements: data.achievements || [],
                    certifications: data.certifications || []
                }));
            }
        } catch (err) {
            console.error("Failed to load resume", err);
            // If 404, just keep defaults
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Re-structure to match backend schema expected
            const payload = {
                personalInfo: {
                    name: resumeData.name,
                    location: resumeData.location,
                    phone: resumeData.phone,
                    email: resumeData.email,
                    linkedin: resumeData.linkedin,
                    github: resumeData.github,
                    portfolio: resumeData.portfolio
                },
                education: resumeData.education,
                experience: resumeData.experience,
                projects: resumeData.projects,
                skills: resumeData.skills,
                coursework: resumeData.coursework,
                achievements: resumeData.achievements,
                certifications: resumeData.certifications
            };
            await saveResume(payload);
            alert("Resume saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const handleDownloadTex = () => {
        let tex = latexTemplate;

        const escapeTex = (str) => {
            if (!str) return "";
            return str
                .replace(/&/g, "\\&")
                .replace(/%/g, "\\%")
                .replace(/\$/g, "\\$")
                .replace(/#/g, "\\#")
                .replace(/_/g, "\\_")
                .replace(/{/g, "\\{")
                .replace(/}/g, "\\}")
                .replace(/~/g, "\\textasciitilde")
                .replace(/\^/g, "\\textasciicircum");
        };

        tex = tex.replace("{{name}}", escapeTex(resumeData.name));
        tex = tex.replace("{{location}}", escapeTex(resumeData.location));
        tex = tex.replace(/{{phone}}/g, escapeTex(resumeData.phone));
        tex = tex.replace(/{{email}}/g, escapeTex(resumeData.email));
        tex = tex.replace(/{{linkedin}}/g, escapeTex(resumeData.linkedin));
        tex = tex.replace(/{{github}}/g, escapeTex(resumeData.github));
        tex = tex.replace(/{{portfolio}}/g, escapeTex(resumeData.portfolio));

        const eduItems = resumeData.education.map(edu => `
    \\resumeSubheading
      {${escapeTex(edu.institute)}}{${escapeTex(edu.duration)}}
      {${escapeTex(edu.degree)}}{${escapeTex(edu.location)}}
    `).join("");
        tex = tex.replace("{{education_items}}", eduItems);

        const expItems = resumeData.experience.map(exp => `
        \\resumeSubheading{${escapeTex(exp.role)}}{${escapeTex(exp.duration)}}{${escapeTex(exp.company)}}{${escapeTex(exp.location)}}
            \\resumeItemListStart
            ${exp.points.map(p => `\\resumeItem{${escapeTex(p)}}`).join("\n")}
            \\resumeItemListEnd
    `).join("");
        tex = tex.replace("{{experience_items}}", expItems);

        tex = tex.replace("{{skills_languages}}", escapeTex(resumeData.skills.languages));
        tex = tex.replace("{{skills_tools}}", escapeTex(resumeData.skills.tools));
        tex = tex.replace("{{skills_frameworks}}", escapeTex(resumeData.skills.frameworks));

        const projItems = resumeData.projects.map(proj => `
    \\resumeProjectHeading
    {\\href{https://${escapeTex(proj.link)}}{\\textbf{\\large{${escapeTex(proj.title)}}} \\href{https://${escapeTex(proj.link)}}{\\raisebox{-0.1\\height}\\faExternalLink }} $|$ \\large{\\underline{${escapeTex(proj.tech)}}}}{${escapeTex(proj.date)}}
    \\vspace{-15pt}
    \\resumeItemListStart
        ${proj.points.map(p => `\\resumeItem{${escapeTex(p)}}`).join("\n")}
    \\resumeItemListEnd
    \\vspace{-10pt}
    `).join("");
        tex = tex.replace("{{project_items}}", projItems);

        const courseItems = resumeData.coursework.map(c => `\\item ${escapeTex(c)}`).join("\n");
        tex = tex.replace("{{coursework_items}}", courseItems);

        const achItems = resumeData.achievements.map(a => `\\item ${escapeTex(a)} \\vspace{-10pt}`).join("\n");
        tex = tex.replace("{{achievement_items}}", achItems);

        const certItems = resumeData.certifications.map(c => `\\item {${escapeTex(c)}} \\vspace{-10pt}`).join("\n");
        tex = tex.replace("{{certification_items}}", certItems);

        const blob = new Blob([tex], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.tex";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const resumeRef = useRef();

    const handleDownloadPDF = () => {
        const element = resumeRef.current;
        const opt = {
            margin: [0, 0],
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleChange = (e, field) => {
        setResumeData({ ...resumeData, [field]: e.target.value });
    };

    const handleNestedChange = (e, parent, field) => {
        setResumeData({
            ...resumeData,
            [parent]: { ...resumeData[parent], [field]: e.target.value }
        });
    };

    const updateArrayItem = (index, field, value, arrayName) => {
        const newArray = [...resumeData[arrayName]];
        newArray[index][field] = value;
        setResumeData({ ...resumeData, [arrayName]: newArray });
    };

    const updatePoint = (itemIndex, pointIndex, value, arrayName) => {
        const newArray = [...resumeData[arrayName]];
        newArray[itemIndex].points[pointIndex] = value;
        setResumeData({ ...resumeData, [arrayName]: newArray });
    };

    const addPoint = (itemIndex, arrayName) => {
        const newArray = [...resumeData[arrayName]];
        newArray[itemIndex].points.push("");
        setResumeData({ ...resumeData, [arrayName]: newArray });
    };

    const removePoint = (itemIndex, pointIndex, arrayName) => {
        const newArray = [...resumeData[arrayName]];
        newArray[itemIndex].points = newArray[itemIndex].points.filter((_, i) => i !== pointIndex);
        setResumeData({ ...resumeData, [arrayName]: newArray });
    };

    const addItem = (arrayName, template) => {
        setResumeData({
            ...resumeData,
            [arrayName]: [...resumeData[arrayName], { ...template, id: Date.now() }]
        });
    };

    const removeItem = (id, arrayName) => {
        setResumeData({
            ...resumeData,
            [arrayName]: resumeData[arrayName].filter(item => item.id !== id)
        });
    };

    // Simple list handlers (Coursework, Achievements, Certifications)
    const updateSimpleList = (index, value, listName) => {
        const newList = [...resumeData[listName]];
        newList[index] = value;
        setResumeData({ ...resumeData, [listName]: newList });
    };

    const addSimpleListItem = (listName) => {
        setResumeData({ ...resumeData, [listName]: [...resumeData[listName], ""] });
    };

    const removeSimpleListItem = (index, listName) => {
        const newList = resumeData[listName].filter((_, i) => i !== index);
        setResumeData({ ...resumeData, [listName]: newList });
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4 lg:px-8">
            <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-8">

                {/* Editor Section */}
                <div className="lg:col-span-5 space-y-6 h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-heading font-bold">Resume Editor</h1>
                        <div className="flex gap-2">
                            <Button onClick={handleSave} variant="secondary" className="bg-green-600 hover:bg-green-700 text-white" disabled={saving}>
                                {saving ? "Saving..." : "Save Progress"}
                            </Button>
                            <Button onClick={handleDownloadTex} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                <FileText className="w-4 h-4 mr-2" /> Download .tex
                            </Button>
                            <Button onClick={handleDownloadPDF} className="bg-primary hover:bg-primary/90">
                                <Download className="w-4 h-4 mr-2" /> Export PDF
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardHeader><CardTitle>Header Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <Input placeholder="Full Name" value={resumeData.name} onChange={(e) => handleChange(e, 'name')} />
                            <Input placeholder="Location" value={resumeData.location} onChange={(e) => handleChange(e, 'location')} />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="Phone" value={resumeData.phone} onChange={(e) => handleChange(e, 'phone')} />
                                <Input placeholder="Email" value={resumeData.email} onChange={(e) => handleChange(e, 'email')} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="LinkedIn" value={resumeData.linkedin} onChange={(e) => handleChange(e, 'linkedin')} />
                                <Input placeholder="GitHub" value={resumeData.github} onChange={(e) => handleChange(e, 'github')} />
                            </div>
                            <Input placeholder="Portfolio / Other Link" value={resumeData.portfolio} onChange={(e) => handleChange(e, 'portfolio')} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Education</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => addItem('education', { institute: "", degree: "", location: "", duration: "" })}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {resumeData.education.map((edu, idx) => (
                                <div key={edu.id} className="p-3 border rounded-lg space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-destructive" onClick={() => removeItem(edu.id, 'education')}><Trash2 className="w-3 h-3" /></Button>
                                    <Input placeholder="Institute" value={edu.institute} onChange={(e) => updateArrayItem(idx, 'institute', e.target.value, 'education')} />
                                    <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateArrayItem(idx, 'degree', e.target.value, 'education')} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input placeholder="Location" value={edu.location} onChange={(e) => updateArrayItem(idx, 'location', e.target.value, 'education')} />
                                        <Input placeholder="Duration" value={edu.duration} onChange={(e) => updateArrayItem(idx, 'duration', e.target.value, 'education')} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Experience</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => addItem('experience', { role: "", company: "", location: "", duration: "", points: [""] })}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resumeData.experience.map((exp, idx) => (
                                <div key={exp.id} className="p-3 border rounded-lg space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-destructive" onClick={() => removeItem(exp.id, 'experience')}><Trash2 className="w-3 h-3" /></Button>
                                    <Input placeholder="Role" value={exp.role} onChange={(e) => updateArrayItem(idx, 'role', e.target.value, 'experience')} />
                                    <Input placeholder="Company" value={exp.company} onChange={(e) => updateArrayItem(idx, 'company', e.target.value, 'experience')} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input placeholder="Location" value={exp.location} onChange={(e) => updateArrayItem(idx, 'location', e.target.value, 'experience')} />
                                        <Input placeholder="Duration" value={exp.duration} onChange={(e) => updateArrayItem(idx, 'duration', e.target.value, 'experience')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium">Bullet Points</label>
                                        {exp.points.map((point, pIdx) => (
                                            <div key={pIdx} className="flex gap-2">
                                                <Input value={point} onChange={(e) => updatePoint(idx, pIdx, e.target.value, 'experience')} />
                                                <Button variant="ghost" size="icon" onClick={() => removePoint(idx, pIdx, 'experience')}><Trash2 className="w-3 h-3" /></Button>
                                            </div>
                                        ))}
                                        <Button size="sm" variant="ghost" className="w-full" onClick={() => addPoint(idx, 'experience')}><Plus className="w-3 h-3 mr-1" /> Add Point</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Projects</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => addItem('projects', { title: "", tech: "", date: "", link: "", points: [""] })}>
                                <Plus className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resumeData.projects.map((proj, idx) => (
                                <div key={proj.id} className="p-3 border rounded-lg space-y-3 relative">
                                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 text-destructive" onClick={() => removeItem(proj.id, 'projects')}><Trash2 className="w-3 h-3" /></Button>
                                    <Input placeholder="Title" value={proj.title} onChange={(e) => updateArrayItem(idx, 'title', e.target.value, 'projects')} />
                                    <Input placeholder="Tech Stack" value={proj.tech} onChange={(e) => updateArrayItem(idx, 'tech', e.target.value, 'projects')} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input placeholder="Date" value={proj.date} onChange={(e) => updateArrayItem(idx, 'date', e.target.value, 'projects')} />
                                        <Input placeholder="Link" value={proj.link} onChange={(e) => updateArrayItem(idx, 'link', e.target.value, 'projects')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium">Bullet Points</label>
                                        {proj.points.map((point, pIdx) => (
                                            <div key={pIdx} className="flex gap-2">
                                                <Input value={point} onChange={(e) => updatePoint(idx, pIdx, e.target.value, 'projects')} />
                                                <Button variant="ghost" size="icon" onClick={() => removePoint(idx, pIdx, 'projects')}><Trash2 className="w-3 h-3" /></Button>
                                            </div>
                                        ))}
                                        <Button size="sm" variant="ghost" className="w-full" onClick={() => addPoint(idx, 'projects')}><Plus className="w-3 h-3 mr-1" /> Add Point</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Technical Skills</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Languages</label>
                                <Input value={resumeData.skills.languages} onChange={(e) => handleNestedChange(e, 'skills', 'languages')} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Developer Tools</label>
                                <Input value={resumeData.skills.tools} onChange={(e) => handleNestedChange(e, 'skills', 'tools')} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Technologies/Frameworks</label>
                                <Input value={resumeData.skills.frameworks} onChange={(e) => handleNestedChange(e, 'skills', 'frameworks')} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Coursework</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => addSimpleListItem('coursework')}><Plus className="w-4 h-4" /></Button>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {resumeData.coursework.map((course, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input value={course} onChange={(e) => updateSimpleList(idx, e.target.value, 'coursework')} />
                                    <Button variant="ghost" size="icon" onClick={() => removeSimpleListItem(idx, 'coursework')}><Trash2 className="w-3 h-3" /></Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Achievements</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => addSimpleListItem('achievements')}><Plus className="w-4 h-4" /></Button>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {resumeData.achievements.map((ach, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input value={ach} onChange={(e) => updateSimpleList(idx, e.target.value, 'achievements')} />
                                    <Button variant="ghost" size="icon" onClick={() => removeSimpleListItem(idx, 'achievements')}><Trash2 className="w-3 h-3" /></Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Certifications</CardTitle>
                            <Button size="sm" variant="outline" onClick={() => addSimpleListItem('certifications')}><Plus className="w-4 h-4" /></Button>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {resumeData.certifications.map((cert, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input value={cert} onChange={(e) => updateSimpleList(idx, e.target.value, 'certifications')} />
                                    <Button variant="ghost" size="icon" onClick={() => removeSimpleListItem(idx, 'certifications')}><Trash2 className="w-3 h-3" /></Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                </div>

                {/* Preview Section - Right Side */}
                <div className="lg:col-span-7 bg-gray-100 p-8 rounded-xl overflow-y-auto h-[calc(100vh-120px)] flex justify-center items-start">
                    <div
                        ref={resumeRef}
                        className="bg-white text-black shadow-2xl w-[8.5in] min-h-[11in] h-fit p-[0.5in] box-border mb-8"
                        style={{
                            fontFamily: 'Calibri, "Gill Sans", "Gill Sans MT", "Trebuchet MS", sans-serif',
                            fontSize: '11pt',
                            lineHeight: '1.4'
                        }}
                    >
                        {/* Header */}
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">{resumeData.name}</h1>
                            <div className="text-sm mb-1">{resumeData.location}</div>
                            <div className="text-sm flex justify-center gap-3 flex-wrap">
                                <span>{resumeData.phone}</span>
                                <span>|</span>
                                <a href={`mailto: ${resumeData.email}`} className="underline">{resumeData.email}</a>
                                <span>|</span>
                                <a href={`https://${resumeData.linkedin}`} className="underline">{resumeData.linkedin}</a>
                                <span>|</span>
                                <a href={`https://${resumeData.github}`} className="underline">{resumeData.github}</a>
                                <span>|</span>
                                <a href={`https://${resumeData.portfolio}`} className="underline">{resumeData.portfolio}</a>
                            </div >
                        </div >

                        {/* Education */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Education</h2>
                            <div className="space-y-2">
                                {resumeData.education.map((edu) => (
                                    <div key={edu.id} className="flex justify-between">
                                        <div>
                                            <div className="font-bold">{edu.institute}</div>
                                            <div className="italic">{edu.degree}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">{edu.location}</div>
                                            <div className="italic">{edu.duration}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div >

                        {/* Experience */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Professional Experience</h2>
                            <div className="space-y-4">
                                {resumeData.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between mb-1">
                                            <div>
                                                <span className="font-bold">{exp.role}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="italic">{exp.duration}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <div className="italic">{exp.company}</div>
                                            <div className="italic">{exp.location}</div>
                                        </div>
                                        <ul className="list-disc pl-5 space-y-0.5">
                                            {exp.points.map((point, i) => point && <li key={i}>{point}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div >

                        {/* Projects */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Selected Projects</h2>
                            <div className="space-y-4">
                                {resumeData.projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between mb-1">
                                            <div>
                                                <span className="font-bold">{proj.title}</span> | <span className="italic">{proj.tech}</span>
                                            </div>
                                            <div className="italic">{proj.date}</div>
                                        </div>
                                        <ul className="list-disc pl-5 space-y-0.5">
                                            {proj.points.map((point, i) => point && <li key={i}>{point}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div >

                        {/* Skills */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Technical Skills</h2>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><span className="font-bold">Languages:</span> {resumeData.skills.languages}</li>
                                <li><span className="font-bold">Developer Tools:</span> {resumeData.skills.tools}</li>
                                <li><span className="font-bold">Technologies/Frameworks:</span> {resumeData.skills.frameworks}</li>
                            </ul>
                        </div >

                        {/* Coursework */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Coursework</h2>
                            <div className="pl-2">
                                {resumeData.coursework.join(", ")}
                            </div>
                        </div >

                        {/* Achievements */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Achievements / Extracurricular</h2>
                            <ul className="list-disc pl-5 space-y-0.5">
                                {resumeData.achievements.map((ach, i) => (
                                    <li key={i}>{ach}</li>
                                ))}
                            </ul>
                        </div >

                        {/* Certifications */}
                        < div className="mb-4" >
                            <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Certifications</h2>
                            <ul className="list-disc pl-5 space-y-0.5">
                                {resumeData.certifications.map((cert, i) => (
                                    <li key={i}>{cert}</li>
                                ))}
                            </ul>
                        </div >

                    </div >
                </div >
            </div >
        </div >
    );
}
