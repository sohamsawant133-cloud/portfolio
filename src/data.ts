export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  bentoStyle: string; // Tailwind classes for bento grid
}

export interface Hobby {
  title: string;
  icon: string;
  description: string;
  badge: string;
  gradient: string;
  tools: string[];
}

import { Skill, RoadmapItem } from './types';

export const PERSONAL_INFO = {
  name: 'Soham Sawant',
  title: 'Computer Science Diploma Student',
  institution: 'DKTE YCP',
  semester: '5th Semester',
  aboutText: [
    "I am Soham Sawant, a highly motivated Computer Science student currently pursuing my Diploma in Computer Engineering at DKTE YCP. I have built a strong logical foundation and practical coding skills across multiple core systems.",
    "Driven by the thrill of problem-solving, my technical journey includes building solid programming practices in C, C++, Java, and Python, coupled with a deep grasp of Database Management Systems (DBMS) and structural Web Design (HTML).",
    "I am constantly testing new horizons, eager to collaborate on developer projects, and always looking to learn and grow in the rapidly changing world of software engineering."
  ],
  yearsDiploma: '2024 - 2027',
  yearsPrimary: '2013 - 2024'
};

export const SKILLS: Skill[] = [
  {
    name: 'C Programming',
    category: 'System Programming',
    proficiency: 85,
    icon: 'Code',
    description: 'Structural foundation, memory allocation, and pointers manipulation.',
    color: 'from-violet-500 to-purple-600'
  },
  {
    name: 'C++',
    category: 'Object Oriented',
    proficiency: 80,
    icon: 'Terminal',
    description: 'Polymorphism, templates, and robust software architecture.',
    color: 'from-fuchsia-500 to-indigo-600'
  },
  {
    name: 'Java',
    category: 'Enterprise App',
    proficiency: 78,
    icon: 'Coffee',
    description: 'JVM architecture, object hierarchies, and backend logic systems.',
    color: 'from-purple-500 to-deeppurple-600'
  },
  {
    name: 'Python',
    category: 'Scripting & AI',
    proficiency: 82,
    icon: 'Box',
    description: 'Automation scripts, algorithm prototyping, and AI/ML exploration.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'DBMS',
    category: 'Databases',
    proficiency: 75,
    icon: 'Database',
    description: 'Relational data models, complex SQL queries, and normalization.',
    color: 'from-purple-600 to-violet-700'
  },
  {
    name: 'HTML',
    category: 'Frontend Layout',
    proficiency: 90,
    icon: 'FileCode',
    description: 'Semantic markup, accessible structures, and responsive alignments.',
    color: 'from-violet-400 to-fuchsia-600'
  }
];

export const ROADMAP: RoadmapItem[] = [
  {
    id: 'primary',
    title: 'Primary Education',
    institution: 'Aadarsh Vidya Mandir',
    period: '2013 - 2024',
    status: 'Completed',
    description: 'Established basic mathematical foundations, peer cooperation, and core systematic logical reasoning.',
    details: [
      'Gained solid foundational skills in mathematics and problem solving.',
      'Active participant in regional scientific and mathematical exhibitions.',
      'Developed early passion for computers, technology, and algorithmic thinking.'
    ],
    isActive: false
  },
  {
    id: 'diploma',
    title: 'Diploma in Computer Engineering',
    institution: 'DKTE YCP',
    period: '2024 - 2027',
    status: 'Currently Pursuing - 5th Semester',
    description: 'Acquiring theoretical computer engineering practices, systems programming, and databases.',
    details: [
      'Currently studying in the 5th Semester of Diploma.',
      'Deepening knowledge in Operating Systems, Mobile Development, and advanced software practices.',
      'Developing structured algorithms and database constraints.'
    ],
    isActive: true
  }
];

export const HOBBIES: Hobby[] = [
  {
    title: 'Exploring AI',
    icon: 'BrainCircuit',
    description: 'Studying modern LLMs, autonomous pipelines, and keeping pace with daily industry breakthroughs.',
    badge: 'Tech-Forward',
    gradient: 'from-pink-900/60 to-purple-900/60',
    tools: ['ChatGPT', 'Claude', 'Gemini']
  },
  {
    title: 'Cricket',
    icon: 'Activity',
    description: 'Active recreational play. Builds physical agility, coordination, and team-focused cooperation.',
    badge: 'Athletic',
    gradient: 'from-purple-900/60 to-violet-800/60',
    tools: ['Teamwork', 'Strategy', 'Agility']
  },
  {
    title: 'Music',
    icon: 'Music',
    description: 'Listening and exploring acoustic and lo-fi tracks. A calming retreat to fuel focused coding streaks.',
    badge: 'Creative',
    gradient: 'from-violet-900/60 to-indigo-900/60',
    tools: ['Spotify', 'Acoustic', 'Lo-Fi']
  },
  {
    title: 'Gaming',
    icon: 'Gamepad2',
    description: 'Engaging with real-time strategic modules that sharpen split-second tactical reasoning.',
    badge: 'Analytical',
    gradient: 'from-fuchsia-900/60 to-purple-900/60',
    tools: ['Steam', 'Valorent', 'GTA', 'Strategy']
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "AI Personal Assistant",
    description: "An advanced conversational assistant powered by modern LLMs. Features include real-time voice processing, contextual memory, and a dynamic 3D user interface.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    techStack: ["Next.js", "TypeScript", "OpenAI", "Three.js"],
    githubLink: "#",
    liveLink: "#",
    bentoStyle: "md:col-span-3 min-h-[400px] md:min-h-[500px]"
  }
];
