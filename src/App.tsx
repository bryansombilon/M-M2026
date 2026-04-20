import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock as ClockIcon, 
  Calendar as CalendarIcon, 
  MapPin, 
  User, 
  ExternalLink, 
  AlertCircle,
  Monitor,
  Layout as LayoutIcon,
  Navigation,
  Activity,
  Zap,
  X,
  Info,
  Phone
} from 'lucide-react';
import { EVENT_SCHEDULE, type Session, type LEDMedia } from './constants';

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

function LEDDetailModal({ media, onClose }: { media: LEDMedia, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono"
      >
        <div className="bg-white/[0.03] p-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] text-white uppercase font-bold tracking-widest">Signal Source Details</span>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Asset Label</span>
            <div className="text-sm text-white bg-black/40 p-3 rounded-lg border border-white/5">{media.label}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Content Type</span>
            <div className="text-sm text-purple-400 bg-black/40 p-3 rounded-lg border border-white/5">{media.type.toUpperCase()}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-zinc-500 uppercase font-bold">Primary Endpoint</span>
            <div className="text-[10px] text-blue-400 bg-black/40 p-3 rounded-lg border border-white/5 break-all leading-relaxed uppercase">
              {media.url}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/[0.02] flex justify-end gap-2 border-t border-white/5">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-white/10 rounded font-bold text-[10px] text-white hover:bg-white/5 transition-colors uppercase"
          >
            Close Signal Trace
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
    <div className="modern-card p-3 flex flex-col items-center justify-center min-w-[160px] relative overflow-hidden group">
      <div className="accent-glow group-hover:opacity-30 transition-opacity"></div>
      <span className="label-mono mb-1 text-[8px]">{label}</span>
      <span className="text-2xl font-bold font-heading tracking-tighter tabular-nums text-white leading-none">{timeStr}</span>
      <span className="text-[9px] text-purple-400 font-mono mt-1 uppercase tracking-widest">{dateStr}</span>
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
      <div className="modern-card p-3 flex flex-col items-center justify-center min-w-[200px] border-purple-500/30">
        <span className="label-mono mb-1 text-[8px] text-purple-300">Mission Status</span>
        <span className="text-xl font-heading font-black text-white glow-text-purple">COMMENCED</span>
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  return (
    <div className="modern-card p-3 flex flex-col items-center justify-center min-w-[200px] relative group border-purple-400/20">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-purple-500/20">
        <motion.div 
          className="h-full bg-purple-400"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <span className="label-mono mb-1 text-[8px] text-purple-300">T-MINUS DAY 1 START</span>
      <div className="flex gap-1.5 items-baseline">
        <span className="text-2xl font-bold font-heading tabular-nums text-white">{days}d {hours}h {mins}m</span>
        <span className="text-sm font-mono text-purple-400 tabular-nums w-6">{secs}s</span>
      </div>
    </div>
  );
}

function LEDDisplay({ media, label, sharedTick, onClick }: { media: LEDMedia[], label: string, sharedTick: number, onClick?: (item: LEDMedia) => void }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const index = media.length > 0 ? sharedTick % media.length : 0;
  const current = media[index];

  useEffect(() => {
    setIsLoaded(false);
  }, [current?.url]);

  return (
    <div 
      onClick={() => current && onClick?.(current)}
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-purple-950/50 ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-purple-400/50 transition-all' : ''}`}
    >
      <div className="absolute top-1 left-2 text-[8px] text-purple-500 font-mono z-20 font-bold opacity-60">
        {label} {media.length > 1 && `(${index + 1}/${media.length})`}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.url || 'empty'}
          initial={{ opacity: 0, scale: 1.05, filter: 'brightness(1.5) blur(4px)' }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: 1, filter: 'brightness(1) blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'brightness(0.5) blur(2px)' }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {current ? (
            current.type === 'video' ? (
              <div className="w-full h-full bg-black relative">
                <iframe 
                  src={current.url} 
                  className="w-full h-full border-0 pointer-events-none scale-[1.3] relative z-0"
                  allow="autoplay"
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            ) : (
              <img 
                src={current.url} 
                alt={current.label} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onLoad={() => setIsLoaded(true)}
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-purple-800/30 gap-1 bg-black/80">
              <Zap className="w-4 h-4 text-purple-900 animate-pulse" />
              <span className="text-[7px] text-purple-800 font-black uppercase tracking-widest">No Content</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!isLoaded && current && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
            <span className="text-[7px] text-purple-400 font-mono tracking-widest uppercase">Buffering Source...</span>
          </div>
        </div>
      )}
      
      {/* Scanline / Texture Overlay for consistent look */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-10"></div>
      
      <div className="absolute bottom-0 inset-x-0 bg-purple-950/80 backdrop-blur-md p-1.5 z-30 border-t border-purple-500/20">
        <div className="text-[8px] text-purple-400 font-mono uppercase tracking-widest text-center truncate font-bold">
          {current ? `SOURCE: ${current.label}` : 'STANDBY MODE'}
        </div>
      </div>
    </div>
  );
}

function LEDPreview({ session, onMediaClick }: { session: Session | null, onMediaClick?: (item: LEDMedia) => void }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [session?.id]); // Reset sync on session change

  return (
    <div className="modern-card p-4 h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Monitor className="w-3 h-3 text-purple-400" />
          <h2 className="text-[9px] font-bold uppercase tracking-widest text-white/70">Stage LED Simulation</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-mono text-purple-500">SYNC_LOCK</span>
          <div className="w-1 h-1 rounded-full bg-purple-400"></div>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-end gap-2 w-full bg-black/40 rounded-xl p-4 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/5 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Left Wing */}
        <div className="relative h-[80%] aspect-[2/3] ring-1 ring-white/10 rounded-md overflow-hidden bg-black">
          <LEDDisplay media={session?.led.left || []} label="LW" sharedTick={tick} onClick={onMediaClick} />
        </div>
        
        {/* Center */}
        <div className="relative h-[70%] aspect-[5.76/2.34] ring-1 ring-white/10 rounded-md overflow-hidden bg-black">
          <LEDDisplay media={session?.led.center || []} label="CENTER" sharedTick={tick} onClick={onMediaClick} />
        </div>
        
        {/* Right Wing */}
        <div className="relative h-[80%] aspect-[2/3] ring-1 ring-white/10 rounded-md overflow-hidden bg-black">
          <LEDDisplay media={session?.led.right || []} label="RW" sharedTick={tick} onClick={onMediaClick} />
        </div>
      </div>
    </div>
  );
}


function SessionProgress({ current, next }: { current: Session | null, next: Session | null }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = useMemo(() => {
    if (!current) return 0;
    const [startH, startM] = current.startTime.split(':').map(Number);
    const [endH, endM] = current.endTime.split(':').map(Number);
    
    const startDate = new Date(now);
    startDate.setHours(startH, startM, 0);
    const endDate = new Date(now);
    endDate.setHours(endH, endM, 0);
    
    const total = endDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }, [current, now]);

  const timeToNext = useMemo(() => {
    if (!next) return '--:--';
    const [h, m] = next.startTime.split(':').map(Number);
    const target = new Date(now);
    target.setHours(h, m, 0);
    
    const diff = target.getTime() - now.getTime();
    if (diff < 0) return 'READY';
    
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    
    return `${hours > 0 ? hours + 'h ' : ''}${mins}m ${secs}s`;
  }, [next, now]);

  const timeToEnd = useMemo(() => {
    if (!current) return null;
    const [h, m] = current.endTime.split(':').map(Number);
    const target = new Date(now);
    target.setHours(h, m, 0);
    
    const diff = target.getTime() - now.getTime();
    if (diff < 0) return '00:00:00';
    
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [current, now]);

  return (
    <div className="modern-card p-5 h-full relative overflow-hidden flex flex-col justify-between">
      <div className="accent-glow opacity-5"></div>
      
      {!current && next ? (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-4 text-center">
          <Zap className="w-6 h-6 text-purple-400 animate-pulse mb-3" />
          <span className="label-mono text-[8px] text-purple-400 mb-1">Sequence Pending</span>
          <div className="text-4xl font-heading font-black text-white tracking-tighter tabular-nums mb-2">
            {timeToNext}
          </div>
          <h3 className="text-sm font-bold text-white/90 truncate max-w-full px-4">{next.title}</h3>
        </div>
      ) : null}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-purple-300 whitespace-nowrap">Live Mission</span>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <h1 className="text-xl font-heading font-bold tracking-tight text-white leading-tight mb-1">
                {current?.title || 'System Standby'}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-purple-300 text-[9px] font-medium uppercase tracking-widest">
                <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                  <MapPin className="w-3 h-3 text-purple-500" />
                  <span className="truncate max-w-[120px]">{current?.location || 'BASE'}</span>
                </div>
                {current?.speaker && (
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                    <User className="w-3 h-3 text-purple-500" />
                    <span className="truncate max-w-[120px]">{current.speaker}</span>
                  </div>
                )}
              </div>
            </div>
            
            {current && (
              <div className="flex flex-col items-center px-6 py-3 bg-purple-950/40 border border-purple-400/60 rounded-2xl shadow-[0_0_40px_rgba(147,112,219,0.25)] animate-pulse-soft relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
                <div className="flex items-center gap-2 mb-1.5 opacity-80">
                  <ClockIcon className="w-3 h-3 text-purple-400" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-purple-400">Mission Clock</span>
                </div>
                <span className="text-4xl font-heading font-black text-white tabular-nums leading-none tracking-tighter glow-text-purple px-2">
                  {timeToEnd}
                </span>
                <div className="w-full h-1 bg-black/60 mt-3 rounded-full overflow-hidden p-[1px] border border-white/5">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                     initial={{ width: "100%" }}
                     animate={{ width: "0%" }}
                   />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end text-right shrink-0">
          <span className="text-[8px] uppercase tracking-widest text-purple-500 font-bold mb-0.5">
            {current ? 'Ends In' : 'Time to Next'}
          </span>
          <div className="text-2xl font-heading font-bold text-purple-500 tabular-nums leading-none">
            {current ? timeToEnd : timeToNext}
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 shrink-0">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-purple-500 uppercase tracking-widest font-bold">Start</span>
            <span className="text-sm font-heading font-bold text-white/90">{current?.startTime || '--:--'}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-heading font-black text-purple-400 leading-none">{Math.round(progress)}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono text-purple-500 uppercase tracking-widest font-bold">End {current && <span className="text-[7px] text-purple-600 ml-1">({timeToEnd})</span>}</span>
            <span className="text-sm font-heading font-bold text-white/90">{current?.endTime || '--:--'}</span>
          </div>
        </div>
        
        <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 p-[1.5px] shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 25, stiffness: 50 }}
          />
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
  const [selectedLEDMedia, setSelectedLEDMedia] = useState<LEDMedia | null>(null);
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

      <main className="flex-1 p-4 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Left: Schedule Feed */}
        <div className="lg:col-span-3 h-full flex flex-col overflow-hidden">
          <div className="modern-card flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 items-center">
                <LayoutIcon className="w-3.5 h-3.5 text-purple-400" />
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-white/70">Sequence</h2>
              </div>
              <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                {[1, 2, 3].map(d => (
                  <button 
                    key={d}
                    onClick={() => setScheduledDay(d)}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all ${scheduledDay === d ? 'bg-purple-600 text-white' : 'text-purple-500 hover:text-purple-300'}`}
                  >
                    D{d}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
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
                      className={`p-3 rounded-lg border transition-all cursor-pointer relative group ${isCurrent ? 'bg-purple-500/10 border-purple-400/30' : 'bg-purple-900/10 border-white/5 hover:border-purple-500/10'} ${isPast ? 'opacity-30' : ''}`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className={`label-mono text-[8px] ${isCurrent ? 'text-purple-400' : 'text-purple-600'}`}>{session.startTime} — {session.endTime}</span>
                        <h3 className={`text-[11px] font-bold leading-tight ${isCurrent ? 'text-white' : 'text-purple-200'}`}>{session.title}</h3>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center/Right: Detailed Monitors */}
        <div className="lg:col-span-9 flex flex-col gap-4 overflow-hidden h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 shrink-0">
            <div className="lg:col-span-3">
              <SessionProgress current={currentSession} next={upcomingSessions[0] || null} />
            </div>
            
            <div className="flex flex-col gap-4 h-full">
              <div className="modern-card p-4 flex flex-col justify-center items-center gap-1 relative group flex-1">
                <div className="accent-glow group-hover:opacity-10 transition-opacity"></div>
                <span className="label-mono text-[8px]">Deployment Day</span>
                <div className="text-5xl font-heading font-black text-white glow-text-purple">
                  0{currentSession?.day || scheduledDay}
                </div>
                <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-purple-500/10 rounded-full border border-white/5">
                  <Activity className="w-2.5 h-2.5 text-purple-400 animate-pulse" />
                  <span className="text-[9px] text-purple-200 font-bold uppercase tracking-widest leading-none">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <LEDPreview session={selectedSession || currentSession} onMediaClick={(item) => setSelectedLEDMedia(item)} />
          </div>
        </div>
      </main>

      <footer className="p-2 border-t border-white/5 bg-black">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-[8px] text-purple-600 font-bold uppercase tracking-[0.3em]">
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
        {selectedLEDMedia && (
          <LEDDetailModal 
            media={selectedLEDMedia} 
            onClose={() => setSelectedLEDMedia(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
