// Customization hub:
// Replace email, LinkedIn, GitHub, CV path, project links, publication/blog links,
// and the optional profile image path here when the real assets are ready.

export const profile = {
  name: "Neşenaz Yalçın",
  shortName: "Neşenaz",
  location: "Istanbul, Turkey",
  email: "nesenaz.yalcin@example.com",
  linkedin: "https://www.linkedin.com/in/nesenaz-yalcin",
  github: "https://github.com/nesenazyalcin",
  cvPath: "/cv/nesenaz-yalcin-cv.pdf",
  profileImage: "/profile.jpg",
  heroEyebrow: "AI / Data Science / Software / Research",
  headline: "Intelligent systems, rendered with elegance and resolve.",
  intro:
    "I work across AI, data science, software engineering, and research, building systems that stay thoughtful when reality gets messy, constrained, or consequential.",
  signature:
    "A globally minded technologist shaped by research, industry, and resilience. I am interested in systems that do more than impress on paper. They should endure, clarify, and matter."
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Mission", href: "#mission" },
  { label: "Capabilities", href: "#skills" },
  { label: "Trajectory", href: "#trajectory" },
  { label: "Contact", href: "#contact" }
];

export const heroHighlights = [
  {
    label: "Current lens",
    value: "AI and systems that remain useful under real constraints"
  },
  {
    label: "Academic base",
    value: "Computer Science + Industrial Engineering at Sabancı University"
  },
  {
    label: "Global path",
    value: "Turkey, Italy, and China across research, exchange, and industry"
  }
];

export const aboutSignals = [
  {
    title: "Systems, not fragments",
    body: "My training taught me to look past isolated features and toward the behavior of the whole system: data, decision flow, tradeoffs, constraints, and people."
  },
  {
    title: "Research with traction",
    body: "I enjoy the movement from theory into structure: evaluation metrics, experiments, working interfaces, automation, and production-minded reasoning."
  },
  {
    title: "Analytical and expressive",
    body: "Teaching, collaboration, and international experience shaped a style that is technically rigorous without becoming rigid or narrow."
  }
];

export const experiences = [
  {
    role: "Data Science Intern",
    organization: "Hepsiburada",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Worked on the quality of e-commerce discovery through search relevance and ranking evaluation.",
    bullets: [
      "Benchmarked BM25 retrieval, explored ranking feature optimization, and studied query clustering behavior.",
      "Used NDCG@k and CR@k to reason about retrieval quality and decision-making in search systems."
    ],
    tags: ["Search Relevance", "Ranking", "BM25", "NDCG@k", "Python"]
  },
  {
    role: "Senior Project Student",
    organization: "Siemens",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Explored resource-aware orchestration for industrial edge devices using compact language models.",
    bullets: [
      "Designed a concept for mapping operator intent into protocol-driven actions through small and quantized models.",
      "Worked around device constraints, MQTT-style communication, and the reliability demands of industrial environments."
    ],
    tags: ["Industrial AI", "Edge Systems", "LLMs", "MQTT", "Quantization"]
  },
  {
    role: "Learning Assistant",
    organization: "Sabancı University",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Supported students in DSA 210 Data Science through technical explanation and analytical guidance.",
    bullets: [
      "Helped students translate statistical and data science concepts into practical understanding.",
      "Strengthened the communication side of technical work through teaching, feedback, and mentoring."
    ],
    tags: ["Teaching", "Data Science", "Communication"]
  },
  {
    role: "R&D Intern",
    organization: "Bekaert",
    period: "Recent",
    location: "Shanghai, China",
    impact: "Built data extraction and reporting workflows while contributing to ML-based defect classification efforts.",
    bullets: [
      "Created extraction pipelines to make engineering data more structured and easier to analyze.",
      "Worked with machine learning approaches in an industrial R&D context where practical accuracy mattered."
    ],
    tags: ["R&D", "ML", "Automation", "Reporting"]
  },
  {
    role: "Data Science Intern",
    organization: "Getirfinans",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Automated extraction and comparison of financial rates through scripting and web data workflows.",
    bullets: [
      "Built Python-based processes for scraping, comparing, and organizing rate data from multiple sources.",
      "Reduced repetitive manual work through lightweight automation with practical business value."
    ],
    tags: ["Python", "Automation", "Web Scraping", "Finance"]
  },
  {
    role: "Research Assistant",
    organization: "Sabancı University",
    period: "Multiple semesters",
    location: "Istanbul, Turkey",
    impact: "Contributed to disaster relief logistics research and earthquake-related data analysis.",
    bullets: [
      "Worked on research questions around coordination, logistics, and data-informed planning in disaster settings.",
      "Supported analytical workflows tied to resilience, uncertainty, and real operational constraints."
    ],
    tags: ["Research", "Logistics", "Resilience", "Analytics"]
  }
];

export const projects = [
  {
    title: "Resource-Efficient AI Action Orchestration Platform",
    theme: "Industrial Edge AI",
    summary:
      "A senior project exploring how compact language models can interpret operator intent and trigger protocol-driven actions for constrained industrial edge systems.",
    contribution:
      "I designed the orchestration logic around quantized models, action protocols, MQTT-style messaging, and the realities of limited compute.",
    matters:
      "The project asks what intelligent systems look like when elegance has to coexist with resource limits, reliability, and industrial use.",
    tags: ["LLMs", "Quantization", "MQTT", "Edge Devices", "Industrial AI"],
    link: "#"
  },
  {
    title: "E-Commerce Search Relevance / Ranking Optimization",
    theme: "Search & Retrieval",
    summary:
      "A relevance-focused body of work around retrieval benchmarking, ranking feature analysis, and query-level evaluation for e-commerce search.",
    contribution:
      "I worked with BM25 baselines, clustering logic, and ranking metrics to understand where search quality breaks and how it improves.",
    matters:
      "Good ranking quietly shapes trust, discovery, and conversion. It is one of the most consequential invisible systems in digital products.",
    tags: ["BM25", "NDCG@k", "CR@k", "Ranking", "Python"],
    link: "#"
  },
  {
    title: "Disaster Relief Logistics Research",
    theme: "Resilience Systems",
    summary:
      "Research support around earthquake-related data, relief logistics, coordination, and decision-making under uncertainty.",
    contribution:
      "I contributed analytical work across logistics-oriented datasets and research workflows over multiple semesters.",
    matters:
      "It sits at the intersection of operational complexity and human urgency, where better systems can have real weight.",
    tags: ["Research", "Optimization", "Earthquake Data", "Logistics"],
    link: "#"
  },
  {
    title: "Full-Stack E-Commerce Platform",
    theme: "Software Engineering",
    summary:
      "A full-stack commerce platform built across interface, backend, authentication, and persistent data layers.",
    contribution:
      "I worked across the entire stack, shaping user flow, application logic, and the underlying system structure.",
    matters:
      "It demonstrates product-minded engineering beyond analysis work: shipping software that people can actually use.",
    tags: ["React", "Spring Boot", "JWT", "PostgreSQL"],
    link: "#"
  },
  {
    title: "Real-Time Messaging Application",
    theme: "Realtime Interaction",
    summary:
      "A messaging system built around live interaction, responsive interface state, and communication-driven user flows.",
    contribution:
      "I implemented the application structure for realtime behavior and interface responsiveness.",
    matters:
      "Realtime products demand clarity about state, latency, and the emotional texture of interaction.",
    tags: ["React", "Realtime", "MongoDB", "API Design"],
    link: "#"
  },
  {
    title: "Airport Terminal Simulation & Optimization",
    theme: "Operations & Simulation",
    summary:
      "A simulation project focused on terminal behavior, system bottlenecks, and operational performance under flow constraints.",
    contribution:
      "I modeled movement patterns, evaluated system pressure points, and reasoned about optimization opportunities.",
    matters:
      "It reflects the industrial engineering side of my profile: making complex operations more legible and efficient.",
    tags: ["Arena", "Gurobi", "Simulation", "Optimization"],
    link: "#"
  }
];

export const skillGroups = [
  {
    label: "Programming",
    skills: ["Python", "Java", "C++", "SQL", "R"]
  },
  {
    label: "Web & Backend",
    skills: ["React", "Django", "Spring Boot", "JWT"]
  },
  {
    label: "Data & ML",
    skills: ["Machine Learning", "Data Science", "Statistical Modelling", "Ranking Evaluation"]
  },
  {
    label: "Databases",
    skills: ["MongoDB", "PostgreSQL"]
  },
  {
    label: "Tools & Platforms",
    skills: ["Docker", "Git", "Excel"]
  },
  {
    label: "Optimization & Automation",
    skills: ["Arena", "Gurobi", "Web Scraping", "Reporting Pipelines"]
  }
];

export const achievements = [
  {
    title: "Promise for Tomorrow Program",
    detail: "First Place",
    note: "Recognition for forward-looking problem solving and high-potential technical leadership."
  },
  {
    title: "IELTS",
    detail: "8.5 / 9.0",
    note: "A strong communication profile for international collaboration and opportunity."
  },
  {
    title: "Academic Foundation",
    detail: "Double Major",
    note: "Computer Science and Industrial Engineering, combining technical depth with systems thinking."
  },
  {
    title: "International Exposure",
    detail: "Turkey · Italy · China",
    note: "Academic and industry experience across different environments, cultures, and working styles."
  }
];

export const education = [
  {
    institution: "Sabancı University",
    degree: "B.S. in Computer Science & Industrial Engineering",
    location: "Istanbul, Turkey",
    detail:
      "Double-major training across algorithms, software systems, data science, optimization, and decision-oriented engineering."
  },
  {
    institution: "University of Bologna",
    degree: "Erasmus Study Exchange Program",
    location: "Bologna, Italy",
    detail:
      "International academic experience inside one of Europe’s historic university environments."
  }
];
