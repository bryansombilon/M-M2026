import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock as ClockIcon, 
  Calendar as CalendarIcon, 
  MapPin, 
  User, 
  ExternalLink, 
  AlertCircle,
  Layout as LayoutIcon,
  Navigation,
  Activity,
  Zap,
  X,
  Info,
  Phone
} from 'lucide-react';
import { EVENT_SCHEDULE, type Session } from './constants';

// --- Components ---

const formatTime12h = (time24: string) => {
  if (!time24 || time24 === '--:--' || !time24.includes(':')) return time24;
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${h12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

function SessionDetailModal({ session, onClose }: { session: Session, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-purple-950/90 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-purple-900/40 border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(167,139,250,0.15)] flex flex-col max-h-[90vh]"
      >
        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-400 text-[10px] uppercase font-black tracking-widest bg-purple-500/10 w-fit px-3 py-1 rounded-full border border-purple-500/20">
                <Info className="w-3 h-3" />
                <span>Session Intel</span>
              </div>
              <h2 className="text-3xl font-heading font-black text-white leading-tight">{session.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-purple-500/20 rounded-xl transition-colors text-purple-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="modern-card p-4 space-y-1">
              <span className="label-mono opacity-60">Time Slot</span>
              <p className="text-white font-heading font-bold">{formatTime12h(session.startTime)} — {formatTime12h(session.endTime)}</p>
            </div>
            <div className="modern-card p-4 space-y-1">
              <span className="label-mono opacity-60">Location</span>
              <p className="text-white font-heading font-bold">{session.location}</p>
            </div>
          </div>

          {session.speaker && (
            <div className="modern-card p-6 space-y-2">
              <div className="flex items-center gap-2 label-mono opacity-60">
                <User className="w-3 h-3" />
                <span>Presenters / Leads</span>
              </div>
              <p className="text-xl font-heading font-bold text-white">{session.speaker}</p>
            </div>
          )}

          {session.details && (
            <div className="space-y-3">
              <span className="label-mono opacity-60">Operational Details</span>
              <p className="text-purple-200 leading-relaxed text-sm bg-purple-500/5 p-6 rounded-2xl border border-purple-500/10 italic">
                "{session.details}"
              </p>
            </div>
          )}

          {session.contact && (
            <div className="flex items-center gap-4 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Phone className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-black tracking-widest text-indigo-400 block">Support Contacts</span>
                <span className="text-white font-bold">{session.contact}</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 bg-purple-950/50 border-t border-purple-500/20 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            Acknowledge
          </button>
        </div>
      </motion.div>
    </div>
  );
}


function TimeDisplay({ label, timezone }: { label: string, timezone: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString('en-GB', { 
    timeZone: timezone, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });
  
  const dateStr = time.toLocaleDateString('en-GB', {
    timeZone: timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="modern-card p-3 sm:p-4 flex flex-col items-center justify-center min-w-[110px] sm:min-w-[180px] lg:min-w-[220px] relative overflow-hidden group border-none">
      <div className="accent-glow group-hover:opacity-20 transition-opacity"></div>
      <span className="label-mono mb-1 text-[9px] sm:text-[10px] tracking-[0.2em] font-black opacity-50">{label}</span>
      <span className="text-xl sm:text-3xl lg:text-4xl font-bold font-heading tabular-nums text-white leading-none whitespace-nowrap">{timeStr}</span>
      <span className="text-[9px] sm:text-[10px] text-purple-400 font-mono mt-1 uppercase tracking-[0.3em] font-black">{dateStr}</span>
    </div>
  );
}

function GlobalCountdown({ targetDate }: { targetDate: Date }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return (
      <div className="modern-card px-4 py-2 flex items-center justify-center min-w-[200px] bg-purple-500/10 border-purple-500/20">
        <span className="label-mono text-[10px] text-purple-300 tracking-[0.2em] font-black uppercase">LIVE MISSION</span>
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  return (
    <div className="modern-card px-4 py-2 flex flex-col items-center justify-center min-w-[220px] relative group border-purple-400/10 hover:border-purple-400/30">
      <span className="label-mono text-[9px] text-purple-500 tracking-[0.3em] font-black mb-1">T-MINUS START</span>
      <div className="flex gap-2 items-baseline">
        <span className="text-xl sm:text-2xl font-bold font-heading tabular-nums text-white tracking-tight">{days}d {hours}h {mins}m</span>
        <span className="text-sm font-mono text-purple-400 tabular-nums w-6">{secs}s</span>
      </div>
    </div>
  );
}
function SessionProgress({ current, next, now }: { current: Session | null, next: Session | null, now: Date }) {
  const progress = useMemo(() => {
    if (!current) return 0;
    
    const getZhSeconds = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 3600 + m * 60;
    };

    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Zurich',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    const parts = fmt.formatToParts(now);
    const zhH = parseInt(parts.find(p => p.type === 'hour')!.value);
    const zhM = parseInt(parts.find(p => p.type === 'minute')!.value);
    const zhS = parseInt(parts.find(p => p.type === 'second')!.value);
    const currentZhSeconds = zhH * 3600 + zhM * 60 + zhS;

    const startSeconds = getZhSeconds(current.startTime);
    const endSeconds = getZhSeconds(current.endTime);
    
    const total = endSeconds - startSeconds;
    const elapsed = currentZhSeconds - startSeconds;
    
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }, [current, now]);

  const timeToNext = useMemo(() => {
    if (!next) return '--:--:--';
    
    const [h, m] = next.startTime.split(':').map(Number);
    const targetTotalSeconds = h * 3600 + m * 60;

    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Zurich',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    const parts = fmt.formatToParts(now);
    const zhH = parseInt(parts.find(p => p.type === 'hour')!.value);
    const zhM = parseInt(parts.find(p => p.type === 'minute')!.value);
    const zhS = parseInt(parts.find(p => p.type === 'second')!.value);
    const currentZhSeconds = zhH * 3600 + zhM * 60 + zhS;

    const diffSeconds = targetTotalSeconds - currentZhSeconds;
    if (diffSeconds < 0) return 'READY';
    
    const hours = Math.floor(diffSeconds / 3600);
    const mins = Math.floor((diffSeconds % 3600) / 60);
    const secs = diffSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [next, now]);

  const timeToEnd = useMemo(() => {
    if (!current) return null;
    const [h, m] = current.endTime.split(':').map(Number);
    const targetTotalSeconds = h * 3600 + m * 60;

    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Zurich',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    const parts = fmt.formatToParts(now);
    const zhH = parseInt(parts.find(p => p.type === 'hour')!.value);
    const zhM = parseInt(parts.find(p => p.type === 'minute')!.value);
    const zhS = parseInt(parts.find(p => p.type === 'second')!.value);
    const currentZhSeconds = zhH * 3600 + zhM * 60 + zhS;

    const diffSeconds = targetTotalSeconds - currentZhSeconds;
    if (diffSeconds < 0) return '00:00:00';
    
    const hours = Math.floor(diffSeconds / 3600);
    const mins = Math.floor((diffSeconds % 3600) / 60);
    const secs = diffSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [current, now]);

  return (
    <div className="p-4 sm:p-6 h-full relative overflow-hidden flex flex-col justify-center">
      {!current && next ? (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in duration-500 rounded-3xl m-2">
          <Zap className="w-8 h-8 text-purple-400 mb-4" />
          <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 mb-1 uppercase">Next Active Sequence</span>
          <div className="text-5xl sm:text-7xl font-heading font-black text-white tabular-nums mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            {timeToNext}
          </div>
          <div className="bg-purple-900/40 border border-white/5 px-4 py-2 rounded-xl flex flex-col items-center gap-1">
             <h3 className="text-sm sm:text-lg font-black text-white tracking-tight uppercase text-center">{next.title}</h3>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center text-center gap-6 sm:gap-10">
        <div className="space-y-4 w-full">
          <div className="flex flex-col items-center gap-3 sm:gap-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white uppercase leading-[0.95] max-w-4xl">
              {current?.title || 'MISSION STANDBY'}
            </h1>
            <div className="flex justify-center flex-wrap items-center gap-3 sm:gap-8 text-purple-300 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-500" />
                <span>{current?.location || 'SECTOR ZERO'}</span>
              </div>
              {current?.speaker && (
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-purple-500" />
                  <span className="truncate max-w-[150px] sm:max-w-none">{current.speaker}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {current && (
          <div className="w-full flex justify-center">
            <div className="flex flex-col items-center w-full max-w-3xl relative">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-700 mb-2">Time to Completion</span>
              <span className="text-7xl sm:text-9xl lg:text-[10rem] font-heading font-black text-white tabular-nums leading-none tracking-tighter drop-shadow-[0_0_40px_rgba(147,112,219,0.2)]">
                {timeToEnd}
              </span>
              
              <div className="w-full h-1 bg-purple-900/50 mt-6 sm:mt-10 rounded-full overflow-hidden relative">
                 <motion.div 
                   className="h-full bg-purple-500"
                   initial={{ width: "100%" }}
                   animate={{ width: `${100 - progress}%` }}
                   transition={{ duration: 1, ease: "linear" }}
                 />
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12 mt-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[10px] font-mono text-purple-600 uppercase tracking-widest font-bold">Start Trace</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-heading">{formatTime12h(current?.startTime || '--:--')}</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-purple-600 uppercase tracking-widest font-bold">Progress Rate</span>
            <span className="text-2xl sm:text-4xl font-black text-purple-500 font-heading tabular-nums mb-1">{Math.round(progress)}%</span>
            <div className="w-full h-0.5 bg-purple-900/50 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-500"
                  animate={{ width: `${progress}%` }}
                />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <span className="text-[10px] font-mono text-purple-600 uppercase tracking-widest font-bold">End Trace</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-heading">{formatTime12h(current?.endTime || '--:--')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [realNow, setRealNow] = useState(new Date());
  const [isSimulating, setIsSimulating] = useState(false);
  const [simDate, setSimDate] = useState('2026-04-22');
  const [simTimeInput, setSimTimeInput] = useState('16:00');
  
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [scheduledDay, setScheduledDay] = useState(() => {
    const d = new Date();
    if (d.getDate() === 22) return 1;
    if (d.getDate() === 24) return 3;
    return 2;
  });

  useEffect(() => {
    const timer = setInterval(() => setRealNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate the simulated "Zurich Now"
  const now = useMemo(() => {
    if (!isSimulating) return realNow;
    
    // Create a date assuming the input is Zurich time
    // We treat the inputs as local to the simulation context
    const [year, month, day] = simDate.split('-').map(Number);
    const [hour, min] = simTimeInput.split(':').map(Number);
    
    // Create date in Zurich context
    const d = new Date();
    d.setFullYear(year, month - 1, day);
    d.setHours(hour, min, realNow.getSeconds()); // Keep seconds ticking from real time
    return d;
  }, [realNow, isSimulating, simDate, simTimeInput]);

  // Sync scheduled view to simulation day
  useEffect(() => {
    if (isSimulating) {
      if (now.getDate() === 22) setScheduledDay(1);
      else if (now.getDate() === 23) setScheduledDay(2);
      else if (now.getDate() === 24) setScheduledDay(3);
    }
  }, [isSimulating, now]);

  const currentSession = useMemo(() => {
    // We compare strings using the time formatted for Zurich
    const timeStr = now.toLocaleTimeString('en-GB', { 
      timeZone: 'Europe/Zurich', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    
    // Get the Zurich day
    const zurichDay = parseInt(now.toLocaleDateString('en-GB', { 
      timeZone: 'Europe/Zurich', 
      day: 'numeric' 
    }));
    
    const day = zurichDay === 22 ? 1 : zurichDay === 23 ? 2 : zurichDay === 24 ? 3 : 0;
    if (day === 0) return null;
    return EVENT_SCHEDULE.find(s => s.day === day && timeStr >= s.startTime && timeStr <= s.endTime) || null;
  }, [now]);

  const upcomingSessions = useMemo(() => {
    const timeStr = now.toLocaleTimeString('en-GB', { 
      timeZone: 'Europe/Zurich', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
    
    const zurichDay = parseInt(now.toLocaleDateString('en-GB', { 
      timeZone: 'Europe/Zurich', 
      day: 'numeric' 
    }));
    
    const day = zurichDay === 22 ? 1 : zurichDay === 23 ? 2 : zurichDay === 24 ? 3 : (zurichDay < 22 ? 0 : 4);
    return EVENT_SCHEDULE
      .filter(s => (s.day > day) || (s.day === day && s.startTime > timeStr))
      .sort((a, b) => a.day !== b.day ? a.day - b.day : a.startTime.localeCompare(b.startTime));
  }, [now]);

  const dailySchedule = useMemo(() => {
    return EVENT_SCHEDULE.filter(s => s.day === scheduledDay);
  }, [scheduledDay]);

  return (
    <div className="h-screen bg-purple-950 flex flex-col font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="p-1 sm:p-2 border-b border-white/5 bg-purple-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 mr-2 sm:mr-4">
                <Activity className="w-3.5 h-3.5 text-purple-500" />
                <h1 className="text-xs sm:text-sm font-heading font-black text-white tracking-tighter uppercase whitespace-nowrap">MAKERS & MOVERS <span className="text-purple-600 italic">26</span></h1>
            </div>
            <TimeDisplay label="ZRH" timezone="Europe/Zurich" />
            <TimeDisplay label="MNL" timezone="Asia/Manila" />
            <GlobalCountdown targetDate={new Date(2026, 3, 22, 16, 0, 0)} />
          </div>

          <div className="flex items-center gap-2">
            <div className={`hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl border ${isSimulating ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/5 border-white/5'}`}>
              <span className="text-[8px] font-black uppercase tracking-widest text-purple-600">Trace Mode</span>
              <button 
                onClick={() => setIsSimulating(!isSimulating)}
                className={`w-6 h-3 rounded-full relative transition-colors ${isSimulating ? 'bg-amber-500' : 'bg-white/10'}`}
              >
                <motion.div 
                  animate={{ x: isSimulating ? 12 : 2 }}
                  className="absolute top-0.5 w-2 h-2 bg-white rounded-full"
                />
              </button>
              {isSimulating && (
                <div className="flex gap-1.5 border-l border-white/10 pl-3">
                  <input type="date" value={simDate} onChange={(e) => setSimDate(e.target.value)} className="bg-transparent text-[9px] text-white focus:outline-none" />
                  <input type="time" value={simTimeInput} onChange={(e) => setSimTimeInput(e.target.value)} className="bg-transparent text-[9px] text-white focus:outline-none" />
                </div>
              )}
            </div>
            
            <a href="https://admin.sli.do/event/pPp4vbXYWznjkWXm43MScN/polls" target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-purple-600 text-white text-[9px] font-black uppercase rounded-lg">Slido</a>
            <a href="https://admin.myconnector.ro/" target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white/5 text-white text-[9px] font-black uppercase rounded-lg border border-white/10">Platform</a>
          </div>
        </div>
      </header>

      <main className="flex-1 p-2 sm:p-4 max-w-[1920px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 overflow-hidden">
        {/* Left: Schedule Feed */}
        <div className="md:col-span-3 h-full flex flex-col overflow-hidden">
          <div className="bg-white/2 backdrop-blur-sm border border-white/5 rounded-3xl flex-1 flex flex-col p-4 sm:p-5 overflow-hidden">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-800">Sequence Log</span>
              <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                {[1, 2, 3].map(d => (
                  <button key={d} onClick={() => setScheduledDay(d)} className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${scheduledDay === d ? 'bg-purple-600 text-white' : 'text-purple-700'}`}>D{d}</button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-1.5 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {dailySchedule.map((session, index) => {
                  const isCurrent = currentSession?.id === session.id;
                  return (
                    <motion.div 
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className={`p-3 rounded-2xl transition-all cursor-pointer border ${isCurrent ? 'bg-purple-500/10 border-purple-500/30' : 'bg-transparent border-transparent hover:bg-white/2 hover:border-white/5'}`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[9px] font-black ${isCurrent ? 'text-purple-400' : 'text-purple-900 group-hover:text-purple-700'}`}>{formatTime12h(session.startTime)}</span>
                        <h3 className={`text-[12px] font-black tracking-tight ${isCurrent ? 'text-white' : 'text-purple-200'}`}>{session.title.toUpperCase()}</h3>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center/Right: Detailed Monitors */}
        <div className="md:col-span-9 flex flex-col overflow-hidden h-full">
          <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
            <SessionProgress current={currentSession} next={upcomingSessions[0] || null} now={now} />
          </div>
        </div>
      </main>

      <footer className="p-3 border-t border-white/5 bg-black">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-[11px] text-purple-600 font-bold uppercase tracking-[0.5em]">
          <div className="flex items-center gap-2">
             <span className="text-white/40">ALCOTT GLOBAL</span>
             <span>MISSION CONTROL 2026</span>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-purple-500"></div>
              <span>SYSTEM: STABLE</span>
            </div>
            <span className="text-purple-900">v3.2.0-ext-dark</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedSession && (
          <SessionDetailModal 
            session={selectedSession} 
            onClose={() => setSelectedSession(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
