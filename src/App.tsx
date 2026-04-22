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

          <div className="grid grid-cols-2 gap-4">
            <div className="modern-card p-4 space-y-1">
              <span className="label-mono opacity-60">Time Slot</span>
              <p className="text-white font-heading font-bold">{session.startTime} — {session.endTime}</p>
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
    hour12: false 
  });
  
  const dateStr = time.toLocaleDateString('en-GB', {
    timeZone: timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="modern-card p-6 flex flex-col items-center justify-center min-w-[240px] relative overflow-hidden group">
      <div className="accent-glow group-hover:opacity-30 transition-opacity"></div>
      <span className="label-mono mb-3 text-[12px] tracking-[0.3em] font-black">{label}</span>
      <span className="text-5xl font-bold font-heading tracking-widest tabular-nums text-white leading-none">{timeStr}</span>
      <span className="text-[12px] text-purple-400 font-mono mt-3 uppercase tracking-[0.4em] font-bold">{dateStr}</span>
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
      <div className="modern-card p-6 flex flex-col items-center justify-center min-w-[320px] border-purple-500/30">
        <span className="label-mono mb-3 text-[12px] text-purple-300 tracking-[0.3em] font-black uppercase">Mission Status</span>
        <span className="text-4xl font-heading font-black text-white glow-text-purple tracking-[0.2em]">COMMENCED</span>
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  return (
    <div className="modern-card p-6 flex flex-col items-center justify-center min-w-[320px] relative group border-purple-400/20">
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-purple-500/20">
        <motion.div 
          className="h-full bg-purple-400"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <span className="label-mono mb-3 text-[12px] text-purple-300 tracking-[0.3em] font-black">T-MINUS DAY 1 START</span>
      <div className="flex gap-4 items-baseline">
        <span className="text-5xl font-bold font-heading tabular-nums text-white tracking-widest">{days}d {hours}h {mins}m</span>
        <span className="text-2xl font-mono text-purple-400 tabular-nums w-12">{secs}s</span>
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
    <div className="modern-card p-8 h-full relative overflow-hidden flex flex-col justify-center">
      <div className="accent-glow opacity-5"></div>
      
      {!current && next ? (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl z-10 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
          <Zap className="w-10 h-10 text-purple-400 animate-pulse mb-6" />
          <span className="text-[12px] font-black tracking-[0.5em] text-purple-400 mb-2 uppercase">Next Sequence Countdown</span>
          <div className="text-7xl font-heading font-black text-white tracking-widest tabular-nums mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            {timeToNext}
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex flex-col items-center gap-1">
             <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest">Incoming Mission</span>
             <h3 className="text-xl font-black text-white uppercase tracking-tight">{next.title}</h3>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col items-center text-center gap-8">
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/40 px-4 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#a855f7]"></div>
              <span className="text-[12px] font-black uppercase tracking-[0.3em] text-purple-300">Live Mission Trace</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-heading font-black tracking-normal text-white uppercase leading-none">
              {current?.title || 'System Standby'}
            </h1>
            <div className="flex justify-center flex-wrap items-center gap-6 text-purple-300 text-[12px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>{current?.location || 'BASE'}</span>
              </div>
              {current?.speaker && (
                <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  <User className="w-5 h-5 text-purple-500" />
                  <span>{current.speaker}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {current && (
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center px-16 py-8 bg-purple-950/40 border border-purple-400/60 rounded-[3rem] shadow-[0_0_60px_rgba(147,112,219,0.3)] animate-pulse-soft relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-4 opacity-100">
                <ClockIcon className="w-6 h-6 text-purple-400" />
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-purple-400">Ends In Countdown</span>
              </div>
              <span className="text-8xl font-heading font-black text-white tabular-nums leading-none tracking-widest glow-text-purple px-10">
                {timeToEnd}
              </span>
              <div className="w-full h-2 bg-black/60 mt-8 rounded-full overflow-hidden p-[2px] border border-white/10 shadow-inner">
                 <motion.div 
                   className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-[length:200%_100%] rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                   initial={{ width: "100%" }}
                   animate={{ 
                     width: "0%",
                     backgroundPosition: ["0% 0%", "100% 0%"]
                   }}
                   transition={{ 
                     width: { duration: 0 },
                     backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                   }}
                   style={{ width: `${100 - progress}%` }}
                 />
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-4xl space-y-6 mt-4">
          <div className="flex justify-between items-center px-4">
            <div className="flex flex-col items-start gap-1">
              <span className="text-[11px] font-mono text-purple-500 uppercase tracking-[0.5em] font-black">Departure</span>
              <span className="text-2xl font-heading font-black text-white tracking-[0.1em]">{current?.startTime || '--:--'}</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 bg-purple-500/10 px-8 py-3 rounded-2xl border border-purple-500/20">
              <span className="text-4xl font-heading font-black text-purple-400 leading-none tracking-normal drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                {Math.round(progress)}%
              </span>
              <span className="text-[10px] font-mono text-purple-600 uppercase tracking-[0.4em] font-black">Completion</span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] font-mono text-purple-500 uppercase tracking-[0.5em] font-black">Arrival</span>
              <span className="text-2xl font-heading font-black text-white tracking-[0.1em]">{current?.endTime || '--:--'}</span>
            </div>
          </div>
          
          <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/10 p-[2px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-800 via-purple-500 to-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 50 }}
            />
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

      <header className="p-3 border-b border-white/5 bg-purple-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
          <div className="flex gap-2 items-center">
            <TimeDisplay label="ZURICH (CET)" timezone="Europe/Zurich" />
            <TimeDisplay label="MANILA (PHT)" timezone="Asia/Manila" />
            <GlobalCountdown targetDate={new Date(2026, 3, 22, 16, 0, 0)} />
            
            {/* Simulation Controls */}
            <div className={`flex flex-col gap-1 p-2 rounded-xl border transition-all ${isSimulating ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-purple-900/20 border-white/5 hover:border-purple-500/20'}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-purple-400">Sim Warp</span>
                <button 
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`w-7 h-3.5 rounded-full relative transition-colors ${isSimulating ? 'bg-amber-500' : 'bg-purple-800'}`}
                >
                  <motion.div 
                    animate={{ x: isSimulating ? 14 : 2 }}
                    className="absolute top-0.5 w-2.5 h-2.5 bg-white rounded-full"
                  />
                </button>
              </div>
              {isSimulating && (
                <div className="flex gap-1.5">
                  <input 
                    type="date" 
                    value={simDate}
                    onChange={(e) => setSimDate(e.target.value)}
                    className="bg-black/40 border border-amber-500/30 rounded px-1.5 py-0.5 text-[9px] text-white focus:outline-none"
                  />
                  <input 
                    type="time" 
                    value={simTimeInput}
                    onChange={(e) => setSimTimeInput(e.target.value)}
                    className="bg-black/40 border border-amber-500/30 rounded px-1.5 py-0.5 text-[9px] text-white focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 bg-purple-900/50 px-3 py-1 rounded-full border border-white/5 mb-1">
              <Activity className="w-3 h-3 text-purple-400 animate-pulse" />
              <span className="text-[9px] text-purple-200 uppercase font-black tracking-[0.2em]">MISSION CONTROL</span>
            </div>
            <h1 className="text-lg font-heading font-black text-white tracking-tight leading-none">MAKERS & MOVERS <span className="text-purple-500 italic">2026</span></h1>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="https://admin.sli.do/event/pPp4vbXYWznjkWXm43MScN/polls" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9px] font-black uppercase rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.1)] flex items-center gap-1.5 group"
            >
              Slido <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a 
              href="https://admin.myconnector.ro/" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-purple-900 hover:bg-purple-800 text-purple-300 text-[9px] font-black uppercase rounded-lg transition-all border border-white/5"
            >
              Platform
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Left: Schedule Feed */}
        <div className="lg:col-span-4 h-full flex flex-col overflow-hidden">
          <div className="modern-card flex-1 flex flex-col p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 items-center">
                <LayoutIcon className="w-4 h-4 text-purple-400" />
                <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-white/80">Sequence</h2>
              </div>
              <div className="flex gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/5 shadow-inner">
                {[1, 2, 3].map(d => (
                  <button 
                    key={d}
                    onClick={() => setScheduledDay(d)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all tracking-[0.1em] ${scheduledDay === d ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-purple-600 hover:text-purple-400'}`}
                  >
                    D{d}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {dailySchedule.map((session, index) => {
                  const isCurrent = currentSession?.id === session.id;
                  const isPast = !isCurrent && scheduledDay === (now.getDate() === 22 ? 1 : now.getDate() === 23 ? 2 : now.getDate() === 24 ? 3 : 0) && session.endTime < now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
                  
                  return (
                    <motion.div 
                      key={session.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => setSelectedSession(session)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${isCurrent ? 'bg-purple-500/20 border-purple-400/50 shadow-lg shadow-purple-500/10' : 'bg-purple-900/10 border-white/5 hover:border-purple-500/20'} ${isPast ? 'opacity-30' : ''}`}
                    >
                      <div className="flex flex-col gap-2">
                        <span className={`label-mono text-[10px] font-black tracking-[0.2em] ${isCurrent ? 'text-purple-400' : 'text-purple-700'}`}>{session.startTime} — {session.endTime}</span>
                        <h3 className={`text-[13px] font-black leading-tight tracking-wide ${isCurrent ? 'text-white' : 'text-purple-200'}`}>{session.title.toUpperCase()}</h3>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center/Right: Detailed Monitors */}
        <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden h-full">
          <div className="flex-1 min-h-0">
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
