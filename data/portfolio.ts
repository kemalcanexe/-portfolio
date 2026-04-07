// Customization hub:
// Replace email, LinkedIn, GitHub, CV path, project links, publication/blog links,
// and profile image path here when the real assets are ready.

export const profile = {
  name: "Neşenaz Yalçın",
  location: "Istanbul, Turkey",
  email: "nesenaz.yalcin@example.com",
  linkedin: "https://www.linkedin.com/in/nesenaz-yalcin",
  github: "https://github.com/nesenazyalcin",
  cvPath: "/cv/nesenaz-yalcin-cv.pdf",
  profileImage: "/profile.jpg",
  headline: "Designing Intelligent Systems for Complex Realities",
  intro:
    "Computer Science and Industrial Engineering student at Sabancı University, working across AI, data science, software engineering, and research to build systems that perform under real-world constraints."
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Mission", href: "#mission" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

export const aboutSignals = [
  {
    title: "Systems thinker",
    body: "Trained across computer science and industrial engineering, with a natural focus on decision systems, optimization, constraints, and measurable outcomes."
  },
  {
    title: "Research-to-engineering builder",
    body: "Comfortable moving from literature and experiments into usable software, data pipelines, evaluation metrics, and production-facing reasoning."
  },
  {
    title: "Globally trained technologist",
    body: "Academic and work experiences across Turkey, Italy, and China shaped a practical, internationally fluent way of collaborating."
  }
];

export const experiences = [
  {
    role: "Data Science Intern",
    organization: "Hepsiburada",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Search relevance and ranking evaluation for e-commerce discovery.",
    bullets: [
      "Worked on BM25 benchmarking, ranking feature optimization, and query clustering for search relevance workflows.",
      "Used metrics such as NDCG@k and CR@k to reason about ranking quality and retrieval performance."
    ],
    tags: ["Search", "Ranking", "NDCG@k", "Python", "Data Science"]
  },
  {
    role: "Senior Project Student",
    organization: "Siemens",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Resource-efficient AI orchestration for industrial edge devices.",
    bullets: [
      "Explored small and quantized language models for protocol-driven industrial edge actions.",
      "Designed around constrained-device realities, MQTT-style communication, and reliable system behavior."
    ],
    tags: ["Industrial AI", "Edge", "LLMs", "MQTT", "Systems"]
  },
  {
    role: "Learning Assistant",
    organization: "Sabancı University",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Teaching support for DSA 210 Data Science.",
    bullets: [
      "Supported students in data science concepts, analytical thinking, and applied problem solving.",
      "Strengthened communication across technical explanation, feedback, and classroom support."
    ],
    tags: ["Teaching", "Data Science", "Communication"]
  },
  {
    role: "R&D Intern",
    organization: "Bekaert",
    period: "Recent",
    location: "Shanghai, China",
    impact: "Data extraction pipelines and ML-based defect classification.",
    bullets: [
      "Built extraction and reporting workflows to make engineering data easier to analyze.",
      "Worked on machine learning approaches for defect classification in an industrial R&D context."
    ],
    tags: ["R&D", "ML", "Automation", "Reporting"]
  },
  {
    role: "Data Science Intern",
    organization: "Getirfinans",
    period: "Recent",
    location: "Istanbul, Turkey",
    impact: "Financial-rate automation with Python and scraping workflows.",
    bullets: [
      "Automated extraction and comparison of financial rates from structured and web-based sources.",
      "Improved recurring data checks with Python scripting, scraping, and practical automation tooling."
    ],
    tags: ["Python", "Scraping", "Automation", "Finance"]
  },
  {
    role: "Research Assistant",
    organization: "Sabancı University",
    period: "Multiple semesters",
    location: "Istanbul, Turkey",
    impact: "Disaster relief logistics and earthquake-related data analysis.",
    bullets: [
      "Contributed to research on disaster relief logistics, coordination, and data-informed response planning.",
      "Worked with analytical models and earthquake-related datasets in a real-world resilience context."
    ],
    tags: ["Research", "Logistics", "Resilience", "Analytics"]
  }
];

export const projects = [
  {
    title: "Resource-Efficient AI Action Orchestration Platform",
    theme: "Industrial Edge AI",
    summary:
      "A senior project exploring how compact language models can map operator intent into protocol-driven actions for constrained industrial edge systems.",
    contribution:
      "Designed the orchestration concept around small and quantized models, action protocols, MQTT-style messaging, and reliability under device constraints.",
    matters:
      "It connects AI capability to industrial systems where latency, resources, and safety matter more than spectacle.",
    tags: ["LLMs", "Quantization", "MQTT", "Edge Devices", "Industrial AI"],
    link: "#"
  },
  {
    title: "E-Commerce Search Relevance / Ranking Optimization",
    theme: "Search & Retrieval",
    summary:
      "Benchmarking and analysis work focused on improving e-commerce search relevance with ranking features and query-level evaluation.",
    contribution:
      "Worked with BM25 baselines, query clustering, retrieval metrics, and ranking diagnostics.",
    matters:
      "Search quality directly shapes customer discovery, conversion, and trust in high-scale commerce environments.",
    tags: ["BM25", "NDCG@k", "CR@k", "Ranking", "Python"],
    link: "#"
  },
  {
    title: "Disaster Relief Logistics Research",
    theme: "Resilience Systems",
    summary:
      "Research support around earthquake-related data, relief logistics, coordination, and decision-making under uncertainty.",
    contribution:
      "Analyzed logistics-oriented data and contributed to research workflows over multiple semesters.",
    matters:
      "The work sits where analytical systems meet urgent human and operational constraints.",
    tags: ["Research", "Optimization", "Earthquake Data", "Logistics"],
    link: "#"
  },
  {
    title: "Full-Stack E-Commerce Platform",
    theme: "Software Engineering",
    summary:
      "A full-stack commerce application with product flows, backend APIs, authentication concepts, and database-backed state.",
    contribution:
      "Built across frontend, backend, and persistence layers with attention to usable product flows.",
    matters:
      "It demonstrates end-to-end engineering fluency beyond notebooks and isolated scripts.",
    tags: ["React", "Spring Boot", "JWT", "PostgreSQL"],
    link: "#"
  },
  {
    title: "Real-Time Messaging Application",
    theme: "Realtime Systems",
    summary:
      "A messaging experience designed around responsive UI state, user flows, and live communication patterns.",
    contribution:
      "Implemented application logic and interface structure for real-time interaction.",
    matters:
      "Realtime products require a disciplined sense of state, latency, and user trust.",
    tags: ["React", "Realtime", "MongoDB", "API Design"],
    link: "#"
  },
  {
    title: "Airport Terminal Simulation & Optimization",
    theme: "Simulation & Operations",
    summary:
      "A simulation and optimization project focused on terminal behavior, bottlenecks, and operational decision-making.",
    contribution:
      "Modeled system flow, evaluated capacity constraints, and reasoned about improvement opportunities.",
    matters:
      "It reflects the industrial engineering side of building better systems from messy operational reality.",
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
    note: "Recognition for forward-looking problem solving and impact-oriented thinking."
  },
  {
    title: "IELTS",
    detail: "8.5 / 9.0",
    note: "Strong international communication profile."
  },
  {
    title: "Academic Profile",
    detail: "CS + Industrial Engineering",
    note: "A dual foundation in software, analytics, systems, and operations."
  },
  {
    title: "Global Exposure",
    detail: "Turkey, Italy, China",
    note: "Study and work experience across international academic and industry contexts."
  }
];

export const education = [
  {
    institution: "Sabancı University",
    degree: "B.S. in Computer Science & Industrial Engineering",
    location: "Istanbul, Turkey",
    detail:
      "Double major training across algorithms, software systems, data science, optimization, and decision-oriented engineering."
  },
  {
    institution: "University of Bologna",
    degree: "Erasmus Study Exchange Program",
    location: "Bologna, Italy",
    detail:
      "International academic experience at one of Europe’s historic research universities."
  }
];
