import React, { useState, useEffect } from 'react';
import {
  CheckCircle, Loader2, FileText, Users, Search, Mail, Phone, Globe, Shield, Target, Database
} from 'lucide-react';


const Step2Loading = () => {

  const [completedTasks, setCompletedTasks] = useState(new Set<string>());
  const [activeTasks, setActiveTasks] = useState(new Set<string>());
  const [counters, setCounters] = useState({
    contacts: 0,
    legalPrecedents: 0,
    templates: 0,
    sources: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionProgress, setSectionProgress] = useState({
    complaints: [
      { title: 'For The Company', progress: 0, icon: Target, color: 'from-blue-500 to-blue-600' },
      { title: 'For The Press', progress: 0, icon: Globe, color: 'from-purple-500 to-purple-600' },
      { title: 'For Regulators', progress: 0, icon: Shield, color: 'from-green-500 to-green-600' }
    ],
    contacts: [
      { title: 'Company Executives', progress: 0, icon: Users, color: 'from-red-500 to-red-600', count: 0 },
      { title: 'Press Contacts', progress: 0, icon: Mail, color: 'from-indigo-500 to-indigo-600', count: 0 },
      { title: 'Regulatory Bodies', progress: 0, icon: Phone, color: 'from-teal-500 to-teal-600', count: 0 }
    ]
  });

  const phases = [
    {
      title: "Analyzing Your Complaint",
      tasks: [
        { id: 'severity', text: 'Analyzing complaint severity...', duration: 2000 },
        { id: 'category', text: 'Categorizing issue type...', duration: 1500 },
        { id: 'legal', text: 'Researching legal precedents...', duration: 2500 },
        { id: 'impact', text: 'Calculating financial impact...', duration: 1800 }
      ]
    },
    {
      title: "Drafting Formal Complaints",
      tasks: [
        { id: 'company-draft', text: 'Drafting corporate communication...', duration: 3000 },
        { id: 'press-draft', text: 'Creating press-ready version...', duration: 2500 },
        { id: 'regulatory-draft', text: 'Formatting regulatory submission...', duration: 2800 },
        { id: 'tone-analysis', text: 'Optimizing tone and language...', duration: 2000 }
      ]
    },
    {
      title: "Finding The Right Contacts",
      tasks: [
        { id: 'company-search', text: 'Scanning company databases...', duration: 2200 },
        { id: 'executive-search', text: 'Identifying decision makers...', duration: 2800 },
        { id: 'press-contacts', text: 'Locating relevant journalists...', duration: 2500 },
        { id: 'regulatory-contacts', text: 'Finding regulatory contacts...', duration: 2000 }
      ]
    },
    {
      title: "Building Contact Hierarchy",
      tasks: [
        { id: 'hierarchy', text: 'Organizing contact hierarchy...', duration: 2000 },
        { id: 'verification', text: 'Verifying contact information...', duration: 2500 },
        { id: 'timing', text: 'Calculating optimal timing...', duration: 1800 },
        { id: 'strategy', text: 'Finalizing escalation strategy...', duration: 2200 }
      ]
    }
  ];

  useEffect(() => {
    setIsLoaded(true);

    const startProcessing = () => {
      phases.forEach((phase, phaseIndex) => {
        phase.tasks.forEach((task, taskIndex) => {
          const delay = phaseIndex * 4000 + taskIndex * 800;

          setTimeout(() => {
            setActiveTasks(prev => new Set(prev).add(task.id));

            // Simulate counters
            if (task.id.includes('search') || task.id.includes('contacts')) {
              const interval = setInterval(() => {
                setCounters(prev => ({
                  ...prev,
                  contacts: Math.min(prev.contacts + Math.floor(Math.random() * 3) + 1, 47)
                }));
              }, 200);
              setTimeout(() => clearInterval(interval), task.duration);
            }

            if (task.id.includes('legal')) {
              const interval = setInterval(() => {
                setCounters(prev => ({
                  ...prev,
                  legalPrecedents: Math.min(prev.legalPrecedents + 1, 23)
                }));
              }, 400);
              setTimeout(() => clearInterval(interval), task.duration);
            }

            setTimeout(() => {
              setActiveTasks(prev => {
                const newSet = new Set(prev);
                newSet.delete(task.id);
                return newSet;
              });
              setCompletedTasks(prev => new Set(prev).add(task.id));
            }, task.duration);
          }, delay);
        });
      });

      setTimeout(updateSectionProgress, 1000);
    };

    const updateSectionProgress = () => {
      // Complaints
      sectionProgress.complaints.forEach((section, index) => {
        const interval = setInterval(() => {
          setSectionProgress(prev => ({
            ...prev,
            complaints: prev.complaints.map((s, i) =>
              i === index ? { ...s, progress: Math.min(s.progress + Math.random() * 5, 100) } : s
            )
          }));
        }, 300 + index * 100);
        setTimeout(() => clearInterval(interval), 8000 + index * 1000);
      });

      // Contacts
      setTimeout(() => {
        sectionProgress.contacts.forEach((section, index) => {
          const interval = setInterval(() => {
            setSectionProgress(prev => ({
              ...prev,
              contacts: prev.contacts.map((s, i) =>
                i === index ? {
                  ...s,
                  progress: Math.min(s.progress + Math.random() * 4, 100),
                  count: Math.min((s.count ?? 0) + Math.floor(Math.random() * 2), 15 + index * 5)
                } : s
              )
            }));
          }, 400 + index * 150);
          setTimeout(() => clearInterval(interval), 6000 + index * 800);
        });
      }, 4000);
    };

    startProcessing();
  }, []);

  const StatusIndicator: React.FC<{ taskId: string; children: React.ReactNode }> = ({ taskId, children }) => {
    const isActive = activeTasks.has(taskId);
    const isCompleted = completedTasks.has(taskId);
    return (
      <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
        isActive ? 'bg-blue-500/20 border border-blue-500/30' :
        isCompleted ? 'bg-green-500/20 border border-green-500/30' :
        'bg-white/5 border border-white/10'
      }`}>
        {isActive ? <Loader2 className="w-4 h-4 text-blue-400 animate-spin" /> :
         isCompleted ? <CheckCircle className="w-4 h-4 text-green-400" /> :
         <div className="w-4 h-4 rounded-full bg-white/20" />}
        <span className={`text-sm ${isActive ? 'text-blue-300' : isCompleted ? 'text-green-300' : 'text-white/60'}`}>
          {children}
        </span>
      </div>
    );
  };

  const SectionCard: React.FC<{
    title: string;
    progress: number;
    icon: React.FC<{ className?: string }>;
    color: string;
    count?: number;
  }> = ({ title, progress, icon: Icon, color, count }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(progress);

    useEffect(() => setDisplayProgress(progress), [progress]);

    return (
      <div
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => { setIsHovered(true); setDisplayProgress(100); }}
        onMouseLeave={() => { setIsHovered(false); setDisplayProgress(progress); }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center ${isHovered ? 'scale-110' : ''}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          {count !== undefined && (
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-white/60">contacts</div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Progress</span>
            <span className="text-white font-medium">{Math.round(displayProgress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
     <main className="relative z-10 px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Title Section */}
          <div className={`text-center mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                AI Magic
              </span>
              {' '}In Progress
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our advanced AI is working behind the scenes to create the perfect complaint strategy for your case.
            </p>
          </div>

          {/* Stats Counter */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{counters.contacts}</div>
              <div className="text-white/60 text-sm">Contacts Found</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{counters.legalPrecedents}</div>
              <div className="text-white/60 text-sm">Legal Precedents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">3</div>
              <div className="text-white/60 text-sm">Draft Versions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-400">97%</div>
              <div className="text-white/60 text-sm">Success Rate</div>
            </div>
          </div>

          {/* Main Processing Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Drafting Formal Complaints */}
            <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Drafting Formal Complaints</h2>
              </div>
              
              <div className="space-y-4">
                {sectionProgress.complaints.map((section, index) => (
                  <SectionCard key={index} {...section} />
                ))}
              </div>
            </div>

            {/* Finding Right Contacts */}
            <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Finding The Right Contacts</h2>
              </div>
              
              <div className="space-y-4">
                {sectionProgress.contacts.map((section, index) => (
                  <SectionCard key={index} {...section} />
                ))}
              </div>
            </div>
          </div>

          {/* Processing Tasks */}
          <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Processing Tasks</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phases.flatMap(phase => phase.tasks).map((task, index) => (
                <StatusIndicator key={task.id} taskId={task.id}>
                  {task.text}
                </StatusIndicator>
              ))}
            </div>
          </div>

          {/* Completion Message */}
          <div className={`text-center mt-8 transition-all duration-1000 delay-1000 ${completedTasks.size > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md border border-green-500/30 rounded-2xl p-6 max-w-2xl mx-auto">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Processing Complete!</h3>
              <p className="text-green-300/90 text-sm">
                Your complaint has been optimized and is ready for deployment across all channels.
              </p>
            </div>
          </div>
        </div>
      </main>
  );
};

export default Step2Loading;
