import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Mail, Phone, MapPin, Globe, Github, Linkedin, Instagram, FileText } from 'lucide-react';
import { useSocialTracker } from '../hooks/useSocialTracker';
import type { ProjectData } from '../types';

type StackItem = { id: string; name: string; icon?: string };

interface MCVProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectClick?: (project: ProjectData) => void;
}

const MCV = ({ onClose }: Omit<MCVProps, 'isOpen'>) => {
    const { trackClick } = useSocialTracker();
    const [socialLinks] = useState<{ name: string; url: string }[]>([
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/marwan-sitten-b4b06124a/' },
        { name: 'GitHub', url: 'https://github.com/marwan-sitten60' },
        { name: 'Instagram', url: 'https://www.instagram.com/marwan_sitten/' }
    ]);
    const [contactInfo] = useState({
        email: 'marwansitten@gmail.com',
        phone: '+20 1004320786',
        location: 'Egypt, MA'
    });
    const [availableStack] = useState<StackItem[]>([
        { id: 'python', name: 'Python' },
        { id: 'tensorflow', name: 'TensorFlow' },
        { id: 'pandas', name: 'Pandas' },
        { id: 'scikit-learn', name: 'Scikit-learn' },
        { id: 'matplotlib', name: 'Matplotlib' },
        { id: 'sql', name: 'SQL' },
        { id: 'power-bi', name: 'Power BI' },
        { id: 'docker', name: 'Docker' },
        { id: 'git', name: 'Git' },
        { id: 'github', name: 'GitHub' },
        { id: 'pytorch', name: 'PyTorch' },
        { id: 'fastapi', name: 'FastAPI' }
    ]);
    // Fetch Tech Stack
    useEffect(() => {
        // Disabled Firestore sync for stack to keep the locally defined Data Science stack stable.
        // const unsub = onSnapshot(doc(db, 'Settings', 'Tech Stack'), (docSnap) => {
        //     if (docSnap.exists()) {
        //         const data = docSnap.data();
        //         const items = Object.entries(data)
        //             .sort(([a], [b]) => Number(a) - Number(b))
        //             .map(([id, val]: [string, unknown]) => {
        //                 const v = val as Record<string, unknown>;
        //                 return {
        //                     id,
        //                     name: typeof v.Name === 'string' ? v.Name : typeof v.name === 'string' ? v.name : '',
        //                     icon: typeof v.Icon === 'string' ? v.Icon : typeof v.icon === 'string' ? v.icon : undefined
        //                 };
        //             });
        //         setAvailableStack(items);
        //     }
        // });
        // return () => unsub();
    }, []);

    // Social links and contact info are hardcoded to preserve the current CV values.
    useEffect(() => {
        // no-op
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const getSocialIcon = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('github')) return <Github size={16} />;
        if (lower.includes('linkedin')) return <Linkedin size={16} />;
        if (lower.includes('instagram')) return <Instagram size={16} />;
        return <Globe size={16} />;
    };

    return createPortal(
        <>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[1500] bg-black/20 dark:bg-black/40 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[1501] flex items-center justify-center p-4 md:p-12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.3, y: 400 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, y: 400 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 1 }}
                    style={{ transformOrigin: 'bottom center' }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel-deep relative w-full max-w-5xl h-full max-h-[85vh] overflow-hidden pointer-events-auto flex flex-col border border-black/5 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                >
                    {/* Header & Title */}
                    <div className="p-6 pb-0 flex flex-col gap-4 relative z-10 shrink-0 font-sans">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    layoutId="cv-icon"
                                    className="flex items-center justify-center"
                                    transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 1 }}
                                >
                                    <FileText size={26} strokeWidth={2} className="text-blue-500" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-primary m-0 tracking-tight" style={{ fontSize: '1.5rem' }}>
                                    Fast Report
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-black/5 dark:border-white/10 hover:bg-red-500/10 dark:hover:bg-red-500/10 hover:border-red-500/20 dark:hover:border-red-500/30 hover:text-red-500 rounded-full transition-all text-sec shadow-sm group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>

                    {/* CV Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-2 selection:bg-blue-500/30">
                        <div className="max-w-4xl mx-auto space-y-10">

                            {/* Header Section */}
                            <header className="space-y-5">
                                <div className="space-y-3">
                                    <motion.h1
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-5xl md:text-7xl font-black tracking-tighter text-primary font-sans uppercase leading-none"
                                    >
                                        Marwan <span className="text-blue-500">sitten</span>
                                    </motion.h1>
                                    <p className="text-blue-500/80 dark:text-blue-400/80 font-sans font-bold tracking-[0.2em] text-lg md:text-sm uppercase">Data Science Specialist</p>
                                </div>

                                <div className="flex flex-wrap gap-x-8 gap-y-3 text-base text-sec font-sans">
                                    <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                                        <Mail size={16} className="text-blue-500" /> {contactInfo.email}
                                    </a>
                                    <span className="flex items-center gap-2.5">
                                        <Phone size={16} className="text-blue-500" /> {contactInfo.phone}
                                    </span>
                                    <span className="flex items-center gap-2.5">
                                        <MapPin size={16} className="text-blue-500" /> {contactInfo.location}
                                    </span>
                                </div>
                            </header>

                            <div className="grid md:grid-cols-[1fr_350px] gap-10 pt-10 md:pt-6">
                                <div className="space-y-16">
                                    {/* Summary Section */}
                                    <section className="space-y-4">
                                        <h2 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-[0.3em] text-blue-500">Overview</h2>
                                        <p className="text-lg leading-relaxed text-sec font-medium block">
                                            Data Science professional with 1 year of experience in Python, data analytics, machine learning, and visualization. Skilled in modern data workflows, cloud databases, and AI-powered reporting with a focus on delivering business insights.
                                        </p>
                                    </section>

                                    {/* Education Section */}
                                    <section className="space-y-8 pt-4">
                                        <h2 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-[0.3em] text-blue-500">Academic Background</h2>
                                        <div className="space-y-8 pt-2">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-bold text-primary">Bachelor of Science : Mathematics and Computer Science</h3>
                                                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded">09/2022 – 06/2026</span>
                                                </div>
                                                <p className="text-sec text-sm">Menoufia University • Shebin Elkom, Egypt</p>
                                                <p className="text-sec text-sm">I have a strong foundation in mathematics and computer science, which has led me to devote all my passion to learning machine learning, data science, and understanding complex algorithms.</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Experience Section */}
                                    <section className="space-y-8 pt-4">
                                        <h2 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-[0.3em] text-blue-500">Professional Experience</h2>
                                        <div className="space-y-8 pt-2">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-bold text-primary">Fawry Data Science Intern</h3>
                                                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded">08/2025 - 10/2025</span>
                                                </div>
                                                <p className="text-sec text-sm">Cairo, Egypt</p>
                                                <ul className="list-disc list-inside text-sec text-sm leading-relaxed space-y-2">
                                                    <li>Applied Machine Learning and Deep Learning techniques to analyze and model real-world datasets.</li>
                                                    <li>Built and evaluated Sentiment Analysis models on text data using Python and TensorFlow/Keras.</li>
                                                    <li>Performed data preprocessing, feature engineering, and model performance evaluation to improve accuracy.</li>
                                                    <li>Collaborated with the Data Science team to gain hands-on experience in deploying and interpreting data-driven solutions.</li>
                                                </ul>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-bold text-primary">CIB Bank Intern</h3>
                                                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded">07/2025 - 08/2025</span>
                                                </div>
                                                <p className="text-sec text-sm">Online</p>
                                                <ul className="list-disc list-inside text-sec text-sm leading-relaxed space-y-2">
                                                    <li>Assisted in financial data analysis and reporting to support decision-making processes.</li>
                                                    <li>Worked with financial statements and performance metrics to assess profitability and cost efficiency.</li>
                                                    <li>Gained exposure to banking operations, risk management, and financial modeling concepts.</li>
                                                    <li>Collaborated with the finance team to streamline data workflows and enhance analytical accuracy.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <aside className="space-y-12">
                                    {/* Skills Section */}
                                    <section className="space-y-6">
                                        <h2 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-[0.3em] text-blue-500">Stack</h2>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {availableStack.length > 0 ? availableStack.map((skill) => (
                                                <motion.div
                                                    key={skill.id}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    className="px-3.5 py-1.5 bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/[0.03] dark:border-white/[0.05] rounded-2xl shadow-sm cursor-default transition-all hover:bg-white/60 dark:hover:bg-black/40 hover:border-blue-500/20"
                                                >
                                                    <span className="text-[12px] font-bold text-sec whitespace-nowrap">{skill.name}</span>
                                                </motion.div>
                                            )) : (
                                                ["React", "Next.js", "TypeScript", "Firebase", "Node.js"].map(skill => (
                                                    <div
                                                        key={skill}
                                                        className="px-3.5 py-1.5 bg-white/20 dark:bg-black/10 backdrop-blur-sm border border-black/[0.03] dark:border-white/[0.05] rounded-2xl opacity-50"
                                                    >
                                                        <span className="text-[12px] font-bold text-sec">{skill}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    {/* Presence */}
                                    <section className="space-y-6">
                                        <h2 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-[0.3em] text-blue-500">Connect</h2>
                                        <div className="flex flex-col gap-3 pt-2">
                                            {socialLinks.filter(link => !link.name.toLowerCase().includes('instagram')).map((link) => (
                                                <a
                                                    key={link.name}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => trackClick(link.name)}
                                                    className="flex items-center gap-3 text-xs md:text-sm font-bold text-sec hover:text-blue-500 transition-all group"
                                                >
                                                    <span className="p-2 bg-black/5 dark:bg-white/5 rounded-lg group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/20 transition-colors">
                                                        {getSocialIcon(link.name)}
                                                    </span>
                                                    {link.name}
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                </aside>
                            </div>

                            {/* Footer */}
                            <footer className="pt-12 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">English (Prof.)</span>
                                    <div className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10" />
                                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Arabic (Native)</span>
                                </div>
                                <p className="text-[9px] font-bold text-muted uppercase tracking-widest leading-loose text-center">
                                    Engineered with precision using React & Firebase<br />
                                    © {new Date().getFullYear()} Mohammed Ahmed
                                </p>
                            </footer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
        ,
        document.body
    );
};

export default MCV;
