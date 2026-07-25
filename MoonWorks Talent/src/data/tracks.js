// Static data for the 7 confirmed internship tracks
// Grouped into 5 sectors as proposed in myplan.md Section 7.2

export const sectors = [
  {
    id: 'tech',
    name: 'Technology & Development',
    icon: '💻',
    color: 'var(--teal)',
    description: 'Build real-world web applications and gain hands-on coding experience.',
    tracks: [
      {
        id: 'web-dev',
        slug: 'website-development',
        title: 'Website Development Intern',
        description: 'Work on live web projects using modern frameworks. Learn HTML, CSS, JavaScript, React, and Node.js through practical, mentor-guided tasks.',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Git & GitHub'],
        duration: '2, 4, or 6 months',
      },
    ],
  },
  {
    id: 'design',
    name: 'Design & Creative',
    icon: '🎨',
    color: 'var(--amber)',
    description: 'Create stunning visual assets and build a professional design portfolio.',
    tracks: [
      {
        id: 'graphic-design',
        slug: 'graphic-design',
        title: 'Graphic Designer Intern',
        description: 'Design social media creatives, brand assets, and marketing materials using industry-standard tools. Build a portfolio of real client work.',
        skills: ['Figma', 'Adobe Photoshop', 'Canva', 'Brand Design', 'Social Media Graphics'],
        duration: '2, 4, or 6 months',
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    icon: '📈',
    color: '#7C3AED',
    description: 'Learn digital marketing strategies that drive real engagement and growth.',
    tracks: [
      {
        id: 'social-media',
        slug: 'social-media-marketing',
        title: 'Social Media Marketing Intern',
        description: 'Plan, create, and schedule content across platforms. Learn analytics, engagement strategies, and how to grow a brand\'s social presence.',
        skills: ['Content Strategy', 'Social Media Management', 'Google Analytics', 'Copywriting'],
        duration: '2, 4, or 6 months',
      },
      {
        id: 'email-marketing',
        slug: 'email-marketing',
        title: 'Email Marketing Intern',
        description: 'Design and execute email campaigns. Learn segmentation, A/B testing, and conversion optimization using professional email marketing tools.',
        skills: ['Mailchimp', 'Email Copywriting', 'Campaign Analytics', 'A/B Testing'],
        duration: '2, 4, or 6 months',
      },
    ],
  },
  {
    id: 'hr',
    name: 'People & HR',
    icon: '🤝',
    color: '#EC4899',
    description: 'Develop people management and talent acquisition skills.',
    tracks: [
      {
        id: 'hr',
        slug: 'hr',
        title: 'HR Intern',
        description: 'Support recruitment, onboarding, and team management processes. Gain real experience in talent acquisition, screening, and HR operations.',
        skills: ['Talent Acquisition', 'Screening', 'Onboarding', 'HR Communication'],
        duration: '2, 4, or 6 months',
      },
    ],
  },
  {
    id: 'operations',
    name: 'Business Operations',
    icon: '⚙️',
    color: '#0EA5E9',
    description: 'Learn how businesses run behind the scenes — coordination, planning, and execution.',
    tracks: [
      {
        id: 'admin',
        slug: 'administration',
        title: 'Administration Intern',
        description: 'Handle day-to-day organizational tasks, documentation, and coordination. Learn professional communication and administrative workflows.',
        skills: ['Documentation', 'Coordination', 'Google Workspace', 'Professional Communication'],
        duration: '2, 4, or 6 months',
      },
      {
        id: 'operations',
        slug: 'operations',
        title: 'Operations Intern',
        description: 'Support project planning, task tracking, and process optimization. Gain experience in how startups manage workflows and deliver results.',
        skills: ['Project Management', 'Process Optimization', 'Task Tracking', 'Reporting'],
        duration: '2, 4, or 6 months',
      },
    ],
  },
];

// Flat list of all tracks for dropdowns, etc.
export const allTracks = sectors.flatMap((sector) =>
  sector.tracks.map((track) => ({
    ...track,
    sectorName: sector.name,
    sectorIcon: sector.icon,
  }))
);
