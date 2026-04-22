export interface Session {
  id: string;
  day: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  speaker?: string;
  location: string;
  details?: string;
  contact?: string;
  alerts?: string[];
}

const getDriveUrl = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`;

export const EVENT_SCHEDULE: Session[] = [
  // Day 1: April 22
  {
    id: 'd1-1',
    day: 1,
    date: 'April 22, 2026',
    startTime: '16:00',
    endTime: '18:00',
    title: 'Welcome Gathering',
    speaker: 'Andrei Palamariu, Fei Yu',
    location: 'Canvas Bar',
    contact: 'Andrei Palamariu, Fei Yu',
    details: 'Informal opening gathering in a relaxed setting at the Dolder Grand Canvas Bar. Designed for early connections, peer conversations, and easing into the event before the formal program begins.'
  },
  {
    id: 'd1-2',
    day: 1,
    date: 'April 22, 2026',
    startTime: '18:00',
    endTime: '18:30',
    title: 'Participants Registration',
    location: 'Reception Area',
    details: 'Arrival and distribution of event materials.'
  },
  {
    id: 'd1-3',
    day: 1,
    date: 'April 22, 2026',
    startTime: '18:30',
    endTime: '19:00',
    title: 'Official Opening of Makers & Movers 2026',
    location: 'Gallery Lounges',
    details: 'Formal inauguration of the mission.'
  },
  {
    id: 'd1-4',
    day: 1,
    date: 'April 22, 2026',
    startTime: '19:00',
    endTime: '22:00',
    title: 'Networking Cocktail Dinner',
    location: 'Gallery Lounges',
    details: 'Sponsor: Auger. High-level networking dinner.'
  },

  // Day 2: April 23
  {
    id: 'd2-run',
    day: 2,
    date: 'April 23, 2026',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Trail Running → Run & Reset',
    location: 'Spa Reception',
    contact: 'Ove Brand',
    details: 'Approx. 4.2 km round trip, approx. 131 m elevation gain. Attire: Running clothes.'
  },
  {
    id: 'd2-gym',
    day: 2,
    date: 'April 23, 2026',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Gym Session → Strength & Focus',
    location: 'Spa Reception',
    contact: 'Birgit Stoll',
    details: 'Guided group training session focused on energy, movement, and meeting others. Attire: Gym sports clothes.'
  },
  {
    id: 'd2-dry-run',
    day: 2,
    date: 'April 23, 2026',
    startTime: '07:30',
    endTime: '08:00',
    title: 'Dry Run with Remote Speaker Max Chu',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-mc-dry-run',
    day: 2,
    date: 'April 23, 2026',
    startTime: '08:00',
    endTime: '08:30',
    title: 'MC & Radu mic up & Dry Run',
    speaker: 'Deborah Dull, Radu Palamariu',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-checkin',
    day: 2,
    date: 'April 23, 2026',
    startTime: '08:30',
    endTime: '09:00',
    title: 'Checking in for Day 2',
    location: 'Ground Floor - Gallery Foyer'
  },
  {
    id: 'd2-1',
    day: 2,
    date: 'April 23, 2026',
    startTime: '09:00',
    endTime: '09:07',
    title: 'Connecting Leaders, Creating Impact',
    speaker: 'Deborah Dull',
    location: 'Ground Floor - Gallery',
    details: 'Opening speech by MC Deborah Dull. High-level overview of the day.'
  },
  {
    id: 'd2-intro-radu',
    day: 2,
    date: 'April 23, 2026',
    startTime: '09:07',
    endTime: '09:10',
    title: 'Introduction to Radu keynote',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-2-speaker',
    day: 2,
    date: 'April 23, 2026',
    startTime: '09:10',
    endTime: '09:30',
    title: 'KEYNOTE: Why Technology Is Ready, BUT Leadership Is Not!',
    speaker: 'Radu Palamariu',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-intro-cliff',
    day: 2,
    date: 'April 23, 2026',
    startTime: '09:30',
    endTime: '09:35',
    title: 'Thank you Radu / introduce Cliff',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-cliff',
    day: 2,
    date: 'April 23, 2026',
    startTime: '09:35',
    endTime: '10:00',
    title: 'KEYNOTE: Accelerating Agents at Scale',
    speaker: 'Cliff Henson',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-intro-panel-1',
    day: 2,
    date: 'April 23, 2026',
    startTime: '10:00',
    endTime: '10:05',
    title: 'Panel introduction',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-panel-1',
    day: 2,
    date: 'April 23, 2026',
    startTime: '10:05',
    endTime: '10:45',
    title: 'PANEL: From Chief Supply Chain Officer to CEO',
    speaker: 'Massimo Andolina, Marc Engel, Pier Luigi Sigismondi',
    location: 'Ground Floor - Gallery',
    details: 'Panelists: Massimo Andolina, Marc Engel, Pier Luigi Sigismondi. Moderator: Radu Palamariu.'
  },
  {
    id: 'd2-thanks-panel-1',
    day: 2,
    date: 'April 23, 2026',
    startTime: '10:45',
    endTime: '10:47',
    title: 'Thank you to panelists / coffee break announcement',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-coffee',
    day: 2,
    date: 'April 23, 2026',
    startTime: '10:47',
    endTime: '11:00',
    title: 'Coffee Break',
    location: 'Ground Floor - Gallery Foyer'
  },
  {
    id: 'd2-intro-max',
    day: 2,
    date: 'April 23, 2026',
    startTime: '11:00',
    endTime: '11:05',
    title: 'Welcome back / introduce Max remote keynote',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-max-chu',
    day: 2,
    date: 'April 23, 2026',
    startTime: '11:05',
    endTime: '11:30',
    title: 'KEYNOTE: Excellence in Digital Transformation',
    speaker: 'Max Chu',
    location: 'Ground Floor - Gallery',
    details: "Excellence in Digital Transformation: Foxconn's Three Core Systems for Supply Chain Agility and ESG."
  },
  {
    id: 'd2-intro-vikram',
    day: 2,
    date: 'April 23, 2026',
    startTime: '11:30',
    endTime: '11:35',
    title: 'Thank you Max / introduce Vikram',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-vikram',
    day: 2,
    date: 'April 23, 2026',
    startTime: '11:35',
    endTime: '12:00',
    title: 'KEYNOTE: Danone’s Supply Chain as a Growth Accelerator',
    speaker: 'Vikram Agarwal',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-intro-panel-2',
    day: 2,
    date: 'April 23, 2026',
    startTime: '12:00',
    endTime: '12:05',
    title: 'Panel introduction',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-panel-2',
    day: 2,
    date: 'April 23, 2026',
    startTime: '12:05',
    endTime: '12:45',
    title: 'PANEL: Networks Designed for Resilience',
    speaker: 'Mourad Tamoud, Feiyu Xu, Luciano Sieber',
    location: 'Ground Floor - Gallery',
    details: 'Panelists: Mourad Tamoud, Feiyu Xu, Luciano Sieber. Moderator: Radu Palamariu.'
  },
  {
    id: 'd2-thanks-panel-2',
    day: 2,
    date: 'April 23, 2026',
    startTime: '12:45',
    endTime: '12:47',
    title: 'Thank you to panelists / lunch logistics',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-lunch',
    day: 2,
    date: 'April 23, 2026',
    startTime: '12:47',
    endTime: '13:30',
    title: 'Lunch Break with Networking',
    location: 'Level 1 - Gallery Lounges 1, 2, 3'
  },
  {
    id: 'd2-jim',
    day: 2,
    date: 'April 23, 2026',
    startTime: '13:35',
    endTime: '14:10',
    title: 'FIRESIDE CHAT: The Next Industrial Era',
    speaker: 'Jim Hagemann Snabe',
    location: 'Ground Floor - Gallery',
    details: 'Leading Through AI, Geopolitics, and Global Transformation. Moderator: Radu Palamariu.'
  },
  {
    id: 'd2-thanks-jim',
    day: 2,
    date: 'April 23, 2026',
    startTime: '21:10',
    endTime: '14:15',
    title: 'Thank you Jim / introduce Damien',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-damien',
    day: 2,
    date: 'April 23, 2026',
    startTime: '14:15',
    endTime: '14:40',
    title: 'KEYNOTE: How Customer Centricity Powers Booming Fragrances',
    speaker: 'Damien Decouvelaere',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-net-logistics',
    day: 2,
    date: 'April 23, 2026',
    startTime: '14:40',
    endTime: '14:45',
    title: 'Networking logistics / room-change instructions',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-net-1-on-1',
    day: 2,
    date: 'April 23, 2026',
    startTime: '14:45',
    endTime: '16:15',
    title: '1-on-1 Networking (1.5h)',
    location: 'Level 1 - Gallery Lounges 1, 2, 3'
  },
  {
    id: 'd2-coffee-2',
    day: 2,
    date: 'April 23, 2026',
    startTime: '16:15',
    endTime: '16:45',
    title: 'Coffee Break',
    location: 'Level 1 - Gallery Lounges 1, 2, 3'
  },
  {
    id: 'd2-intro-harald',
    day: 2,
    date: 'April 23, 2026',
    startTime: '16:45',
    endTime: '16:50',
    title: 'Welcome back / introduce Harald Kujat',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-harald',
    day: 2,
    date: 'April 23, 2026',
    startTime: '16:50',
    endTime: '17:25',
    title: 'FIRESIDE CHAT: The New Global Order',
    speaker: 'Harald Kujat',
    location: 'Ground Floor - Gallery',
    details: 'The New Global Order: Geopolitics, Security, and the Future of Global Trade. Moderator: Radu Palamariu.'
  },
  {
    id: 'd2-rt-logistics',
    day: 2,
    date: 'April 23, 2026',
    startTime: '17:25',
    endTime: '17:30',
    title: 'Roundtable logistics / upcoming dinner networking',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-roundtables',
    day: 2,
    date: 'April 23, 2026',
    startTime: '17:30',
    endTime: '18:10',
    title: 'Roundtable Discussions',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-closing',
    day: 2,
    date: 'April 23, 2026',
    startTime: '18:10',
    endTime: '18:18',
    title: 'Closing Remarks with Slides – The Next Industrial Era',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-wrapup',
    day: 2,
    date: 'April 23, 2026',
    startTime: '18:18',
    endTime: '18:20',
    title: 'Wrap Up',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-group-photo',
    day: 2,
    date: 'April 23, 2026',
    startTime: '18:20',
    endTime: '18:30',
    title: 'Group Photo',
    location: 'Ground Floor - Gallery'
  },
  {
    id: 'd2-final-dinner',
    day: 2,
    date: 'April 23, 2026',
    startTime: '18:30',
    endTime: '21:30',
    title: 'Cocktail Dinner & Networking',
    location: 'Level 1 - Gallery Lounges 1, 2, 3'
  },

  // Day 3: April 24
  {
    id: 'd3-hike-7',
    day: 3,
    date: 'April 24, 2026',
    startTime: '07:00',
    endTime: '09:00',
    title: 'Guided Hiking → Walk & Connect',
    location: 'Spa Reception',
    contact: 'Alexandra Sokolska',
    details: 'Guided hike for relaxed conversation, fresh air, and views around The Dolder Grand. Attire: Walking clothes, comfortable shoes.'
  },
  {
    id: 'd3-bike-7',
    day: 3,
    date: 'April 24, 2026',
    startTime: '07:00',
    endTime: '09:00',
    title: 'Mountain eBike → Ride & Explore',
    location: 'Concierge',
    contact: 'Ove Brand',
    details: 'Scenic forest trails and panoramic views by eBike; positioned as informal and energizing. Attire: Sport clothes.'
  },
  {
    id: 'd3-yoga-7',
    day: 3,
    date: 'April 24, 2026',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Yoga & Meditation → Calm & Center',
    location: 'Spa Reception',
    contact: 'Nathalie Nobs',
    details: 'Guided session with light movement, breathwork, and stillness for focus and calm.'
  },
  {
    id: 'd3-bath-7',
    day: 3,
    date: 'April 24, 2026',
    startTime: '07:00',
    endTime: '08:00',
    title: 'Forest Bathing → Nature & Clarity',
    location: 'Spa Reception',
    contact: 'Birgit Stoll',
    details: 'Gentle movement, breathing, and quiet reflection in nature; intended for mental reset and connection.'
  },
  {
    id: 'd3-hike-10',
    day: 3,
    date: 'April 24, 2026',
    startTime: '10:00',
    endTime: '12:00',
    title: 'Guided Hiking → Walk & Connect',
    location: 'Spa Reception',
    contact: 'Alexandra Sokolska',
    details: 'Guided hike for relaxed conversation, fresh air, and views around The Dolder Grand. Attire: Walking clothes, comfortable shoes.'
  },
  {
    id: 'd3-bath-10',
    day: 3,
    date: 'April 24, 2026',
    startTime: '10:00',
    endTime: '11:00',
    title: 'Forest Bathing → Nature & Clarity',
    location: 'Spa Reception',
    contact: 'Birgit Stoll',
    details: 'Nature-based mindfulness and reflection session.'
  },
  {
    id: 'd3-spa-10',
    day: 3,
    date: 'April 24, 2026',
    startTime: '10:00',
    endTime: '13:00',
    title: 'Spa → Relax & Recharge',
    location: 'Spa Reception',
    contact: 'Claudia Marta',
    details: 'Access to panoramic pools, steam rooms, saunas, and relaxation spaces in the 4,000-sqm spa and fitness area. Attire: Swimwear.'
  }
];
