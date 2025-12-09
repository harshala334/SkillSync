import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Code, Youtube, CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { generateRoadmap } from "../services/aiService";

export default function SkillCoachPage() {
    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState([]);

    const handleGenerate = async () => {
        if (!goal.trim()) return;
        setLoading(true);
        try {
            const data = await generateRoadmap(goal);
            if (data.roadmap) {
                setRoadmap(data.roadmap);
            }
        } catch (err) {
            console.error("Failed to generate roadmap", err);
            // Fallback static data if everything fails
            setRoadmap([
                {
                    week: "Week 1-2",
                    title: "Foundations of " + goal,
                    topics: ["Core Concepts", "Basic Setup"],
                    resources: [],
                    status: "in-progress"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                        <Brain className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
                        AI Skill <span className="text-gradient">Coach</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Your personalized AI-powered learning roadmap. Tell us your goal, and we'll guide you step-by-step.
                    </p>
                </div>

                {/* Input Section */}
                <Card className="glass border-primary/20 shadow-lg max-w-2xl mx-auto">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                placeholder="E.g., Become a React Developer..."
                                className="flex-1 bg-background/50 border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <Button
                                onClick={handleGenerate}
                                disabled={loading || !goal}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-6 shadow-lg shadow-primary/20"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                                {loading ? "Generating..." : "Generate Roadmap"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Roadmap Section */}
                {roadmap.length > 0 && (
                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

                        <div className="space-y-12">
                            {roadmap.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 w-full">
                                        <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4 ${index === 0 ? "border-primary" : "border-muted"}`}>
                                            <CardHeader>
                                                <div className="flex justify-between items-start mb-2">
                                                    <Badge variant="outline" className="bg-background/50">
                                                        {item.week}
                                                    </Badge>
                                                    {index === 0 && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                                </div>
                                                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {item.topics.map((topic, i) => (
                                                        <Badge key={i} variant="secondary" className="bg-secondary/50">
                                                            {topic}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="space-y-2 pt-4 border-t border-border">
                                                    <p className="text-sm font-medium text-muted-foreground">Recommended Resources:</p>
                                                    <div className="grid gap-2">
                                                        {item.resources.map((res, i) => (
                                                            <a key={i} href="#" className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors group">
                                                                <div className="flex items-center gap-3">
                                                                    {res.type === "video" ? <Youtube className="w-4 h-4 text-red-500" /> :
                                                                        res.type === "course" ? <BookOpen className="w-4 h-4 text-blue-500" /> :
                                                                            <Code className="w-4 h-4 text-green-500" />}
                                                                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{res.title}</span>
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">{res.platform}</div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-border shadow-sm shrink-0 md:order-none order-first">
                                        <div className={`w-4 h-4 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground"}`} />
                                    </div>

                                    {/* Spacer for alignment */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

