export const education = [
  {
    title: 'Manipal Institute of Technology',
    sub: 'BTech, CS Engineering — AI & ML specialisation, Digital Marketing minor',
    date: '2022 – 2026',
  },
  {
    title: 'KPMG — Technology Consulting Intern',
    sub: 'Hyderabad, India',
    date: 'Jan – Jul 2026',
  },
  {
    title: 'Centre for Railway Information Systems — Software Developer Intern',
    sub: 'New Delhi, India',
    date: 'Jun – Jul 2025',
  },
  {
    title: 'Trouvé B.V. — AIML Intern',
    sub: 'Rotterdam, Netherlands',
    date: 'May – Jul 2024',
  },
]

export const journeyStories = [
  {
    id: 'boxing',
    kicker: 'In the ring',
    title: 'Captain, MIT Boxing Team.',
    body:
      'Gold medal at the InterMahe Inter-Collegiate Boxing Championship, plus two consecutive InterMahe team wins as captain. The ring sharpened my reflexes and my nerve.',
    images: [
      'photos/boxing/boxing-1.webp',
      'photos/boxing/boxing-2.webp',
      'photos/boxing/boxing-3.webp',
      'photos/boxing/boxing-4.webp',
      'photos/boxing/boxing-5.webp',
    ],
    image: 'photos/boxing/boxing-3.webp',
    alt: "Sarvagya holding a gold medal after a boxing championship",
    badge: 'boxing',
    badgeBg: 'var(--rope)',
    badgeColor: '#FBFBF7',
    bg: 'var(--olive)',
    titleColor: '#FBFBF7',
    kickerColor: '#D7CDF7',
    bodyColor: 'rgba(251, 251, 247, 0.88)',
    reverse: false,
  },
  {
    id: 'mountain',
    kicker: 'On the mountain',
    title: 'Summited Kang Yatse II, 20,600ft.',
    body:
      "Long approach days and unpredictable weather taught me to plan for the version of the project that goes wrong.",
    media: [
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/ridge-ascent-1.webp',
        alt: 'Climbers crossing a snowy ridge on Kang Yatse II',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/summit-pose-1.webp',
        alt: 'A climber posing near the summit with a snow-covered peak behind',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/valley-pose-1.webp',
        alt: 'Sarvagya standing against a broad Himalayan valley',
      },
      {
        type: 'video',
        src: 'photos/journey/kang-yatse-2/kang-yatse-2-ascent.mp4',
        poster: 'photos/journey/kang-yatse-2/ridge-ascent-1.webp',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/ridge-team-1.webp',
        alt: 'A climbing team moving together along a narrow ridge',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/tent-camp-1.webp',
        alt: 'View from inside a tent looking out to the camp and valley',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/ebc-trail-1.webp',
        alt: 'A Himalayan trail winding through a rocky valley',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/stars-camp-1.webp',
        alt: 'The Milky Way above a mountain campsite at night',
      },
      {
        type: 'image',
        src: 'photos/journey/kang-yatse-2/summit-banner-1.webp',
        alt: 'The Kang Yatse II summit banner held by a climbing team',
      },
    ],
    image: 'photos/journey/kang-yatse-2/summit-banner-1.webp',
    alt: 'The Kang Yatse II summit banner held by a climbing team',
    badge: '20,600ft',
    badgeBg: '#C7DEC5',
    badgeColor: 'var(--olive)',
    bg: 'var(--tan)',
    titleColor: 'var(--ink)',
    kickerColor: 'var(--rope)',
    bodyColor: 'var(--ink-soft)',
    reverse: true,
  },
  {
    id: 'nepal',
    kicker: 'Dec 2025 – Jan 2026',
    title: 'The Three Passes, Nepal.',
    body:
      'Twenty days on foot to Everest Base Camp taught me the value of rhythm over rush. Progress is mostly pacing, patience, and staying useful when conditions shift.',
    media: [
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-cover.webp',
        alt: 'A mountaineer descending a snowy ridge on the EBC route',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-1.webp',
        alt: 'Everest Base Camp trekking moment in the mountains',
      },
      {
        type: 'video',
        src: 'photos/journey/ebc/ebc-clip-1.mp4',
        poster: 'photos/journey/ebc/ebc-cover.webp',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-2.webp',
        alt: 'High-altitude Himalayan view from the Everest Base Camp route',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-3.webp',
        alt: 'A portrait from the Everest Base Camp trek',
      },
      {
        type: 'video',
        src: 'photos/journey/ebc/ebc-clip-2.mp4',
        poster: 'photos/journey/ebc/ebc-2.webp',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-4.webp',
        alt: 'Camp-side Himalayan terrain during the trek',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-5.webp',
        alt: 'A trekking trail through rugged mountain terrain',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-6.webp',
        alt: 'A high-altitude landscape on the Everest Base Camp route',
      },
      {
        type: 'image',
        src: 'photos/journey/ebc/ebc-7.webp',
        alt: 'Night sky above a Himalayan campsite',
      },
    ],
    image: 'photos/journey/ebc/ebc-cover.webp',
    alt: 'A mountaineer descending a snowy ridge on the EBC route',
    badge: 'EBC',
    badgeBg: '#F5E1AB',
    badgeColor: 'var(--olive)',
    bg: 'var(--pink)',
    titleColor: '#FBFBF7',
    kickerColor: '#F5E2C1',
    bodyColor: 'rgba(251, 251, 247, 0.9)',
    reverse: false,
  },
  {
    id: 'research-day',
    kicker: 'Team',
    title: 'Three builders, one momentum.',
    body:
      'Our three-person college team kept showing up: entrepreneurship summits sharpened the pitch, hackathons tightened the build, and the Research Day win became the moment it all clicked into place.',
    media: [
      {
        type: 'image',
        src: 'photos/journey/team/team-1.webp',
        alt: 'A team presenting at a college entrepreneurship event',
      },
      {
        type: 'image',
        src: 'photos/journey/team/team-2.webp',
        alt: 'Three teammates seated together after an event',
      },
      {
        type: 'image',
        src: 'photos/journey/team/team-3.webp',
        alt: 'Team members at an entrepreneurship and research showcase',
      },
      {
        type: 'image',
        src: 'photos/journey/team/team-4.webp',
        alt: 'Team members with a project certificate at a MAHE event',
      },
      {
        type: 'image',
        src: 'photos/journey/team/team-5.webp',
        alt: 'Team discussing the project at an outdoor stall',
      },
    ],
    image: 'photos/journey/team/team-1.webp',
    alt: 'A team presenting at a college entrepreneurship event',
    badge: '3 person team',
    badgeBg: '#C7DEC5',
    badgeColor: 'var(--ink)',
    bg: '#7D73B9',
    titleColor: '#FBFBF7',
    kickerColor: '#D7CDF7',
    bodyColor: 'rgba(251, 251, 247, 0.92)',
    reverse: true,
  },
  {
    id: 'nimas-dirang',
    kicker: 'BMC',
    title: 'Basic Mountaineering Course at NIMAS Dirang.',
    body:
      'Completed the BMC with defence forces personnel in Arunachal Pradesh, including Gorichen glacier movement, ice craft, rock craft, and lectures. Certified mountaineer since 2024.',
    media: [
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-1.webp',
        alt: 'Basic Mountaineering Course training moment at NIMAS Dirang',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-2.webp',
        alt: 'BMC mountain training group on the course',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-3.webp',
        alt: 'Portrait from the mountaineering course in Arunachal Pradesh',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-4.webp',
        alt: 'Roped climbers on a snowy ridge during BMC training',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-5.webp',
        alt: 'A team climbing in mountaineering conditions',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-6.webp',
        alt: 'BMC training on rocky mountain terrain',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-7.webp',
        alt: 'A mountaineering exercise in progress',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-8.webp',
        alt: 'Group training during the BMC at NIMAS Dirang',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-9.webp',
        alt: 'Trekking and ropework during the course',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-10.webp',
        alt: 'Campsite view during the Basic Mountaineering Course',
      },
      {
        type: 'image',
        src: 'photos/journey/bmc/bmc-11.webp',
        alt: 'Final BMC training scene with mountains in the background',
      },
    ],
    image: 'photos/journey/bmc/bmc-1.webp',
    alt: 'Basic Mountaineering Course training moment at NIMAS Dirang',
    badge: 'Dirang',
    badgeBg: '#D7CDF7',
    badgeColor: 'var(--ink)',
    bg: '#E63200',
    titleColor: '#FBFBF7',
    kickerColor: '#D7CDF7',
    bodyColor: 'rgba(251, 251, 247, 0.9)',
    reverse: true,
  },
  {
    id: 'nss',
    kicker: 'NSS',
    title: 'Team Leader, National Service Scheme.',
    body:
      "Led an NSS team through old age home and orphanage visits, blood donation drives, beach cleanups, and civic awareness drives, working closely with the Udupi District Magistrate's office to get them off the ground.",
    media: [
      {
        type: 'image',
        src: 'photos/journey/nss/dm-office-visit-1.webp',
        alt: "The NSS team with officials at the Udupi District Magistrate's office",
      },
      {
        type: 'image',
        src: 'photos/journey/nss/team-meeting-1.webp',
        alt: 'The NSS team planning a drive around a conference table',
      },
      {
        type: 'image',
        src: 'photos/journey/nss/beach-cleanup-1.webp',
        alt: 'Sarvagya carrying a bag of collected trash during a beach cleanup drive',
      },
      {
        type: 'image',
        src: 'photos/journey/nss/plantation-drive-1.webp',
        alt: 'Sarvagya digging soil during a civic plantation drive',
      },
      {
        type: 'image',
        src: 'photos/journey/nss/community-visit-1.webp',
        alt: 'Sarvagya handing out supplies during a community home visit',
      },
      {
        type: 'image',
        src: 'photos/journey/nss/community-visit-2.webp',
        alt: 'The NSS team taking a group photo with children during a community visit',
      },
    ],
    image: 'photos/journey/nss/dm-office-visit-1.webp',
    alt: "The NSS team with officials at the Udupi District Magistrate's office",
    badge: 'NSS',
    badgeBg: '#7D73B9',
    badgeColor: '#FBFBF7',
    bg: '#C9DBBF',
    titleColor: 'var(--ink)',
    kickerColor: '#6B5FA3',
    bodyColor: 'var(--ink-soft)',
    reverse: false,
  },
]

export const skills = [
  {
    title: 'Languages',
    body: 'Python, TypeScript, Java, C, Dart, SQL, HTML/CSS',
  },
  {
    title: 'Frameworks & Tools',
    body: 'Next.js, FastAPI, React, Flutter, Prisma, PyTorch, TensorFlow, Supabase, Git',
  },
  {
    title: 'AI & Data',
    body: 'Claude API, RAG, Qdrant, Apache Spark, Kafka, Hadoop',
  },
  {
    title: 'Achievements',
    body: '1st Place, Apple Developers Club Hackathon · Gold Medal, InterMahe Boxing · Only Indian rep, Zeewolde Triathlon',
  },
]

// Dated milestones for the home page card deck, in order.
export const timeline = [
  { when: 'Nov 2023', title: 'Gold at InterMahe', color: 'pink', body: 'Inter-collegiate boxing gold. I also captained MIT’s team to the team title in consecutive years.' },
  { when: 'May 2024', title: 'NIMAS Dirang', color: 'green', body: 'Basic Mountaineering Course in Arunachal Pradesh, alongside defence forces personnel. Graded ‘Alpha’.' },
  { when: 'Jun 2024', title: 'Zeewolde triathlon', color: 'blue', body: 'An endurance triathlon in the Netherlands, as the only Indian in the field.' },
  { when: 'Jul 2025', title: 'Kang Yatse II', color: 'orange', body: '20,600 ft in Hemis National Park, Ladakh. On top at about half past six on 6 July.' },
  { when: 'Dec 2025', title: 'The Three Passes', color: 'wine', body: 'Three weeks through the Khumbu: Kongma La, Cho La, Renjo La, and Kala Patthar at 5,644 m.' },
]
