// Single source of truth for the site. Everything here comes from the CV;
// edit this file to update the site.

export const profile = {
  name: "Neşenaz Yalçın",
  summary:
    "Computer Science & Industrial Engineering, Sabancı University. Information retrieval, edge AI, humanitarian logistics.",
  fields: ["Information retrieval", "edge AI", "humanitarian logistics"],
  location: "Istanbul, Turkey",
  email: "nesenaz007@gmail.com",
  linkedin: "https://www.linkedin.com/in/nesenaz-yalcin/",
  // Replace with the real profile URL; until then the link resolves to the 404 page.
  github: "/404",
  cv: "/cv/nesenaz-yalcin-cv.pdf"
};

export type SectionId =
  | "education"
  | "publications"
  | "research"
  | "industry"
  | "teaching"
  | "projects"
  | "awards"
  | "skills"
  | "service";

export const sections: { id: SectionId; label: string }[] = [
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "research", label: "Research" },
  { id: "industry", label: "Industry" },
  { id: "teaching", label: "Teaching" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "skills", label: "Skills" },
  { id: "service", label: "Service" }
];

export type Link = { label: string; href: string };

export type Entry = {
  id: string;
  section: SectionId;
  title: string;
  org?: string;
  period?: string;
  location?: string;
  bullets: string[];
  tags?: string[];
  links?: Link[];
  // Publications only
  authors?: string;
  venue?: string;
};

export const entries: Entry[] = [
  // Education
  {
    id: "sabanci-cs",
    section: "education",
    title: "B.S. in Computer Science and Engineering",
    org: "Sabancı University",
    period: "Oct 2022 – Jun 2026",
    location: "Istanbul, Turkey",
    bullets: [
      "GPA 3.65 / 4.0",
      "Coursework: Software Engineering, Data Structures, Data Science, Artificial Intelligence, Natural Language Processing, Mobile Application Development."
    ]
  },
  {
    id: "sabanci-ie",
    section: "education",
    title: "B.S. in Industrial Engineering",
    org: "Sabancı University",
    period: "Oct 2022 – Jan 2027",
    location: "Istanbul, Turkey",
    bullets: [
      "GPA 3.65 / 4.0",
      "Coursework: Operations Research I, II & III, Simulation, Statistical Modelling, Decision Economics, Decision Analysis, Digital Transformation."
    ]
  },
  {
    id: "skku",
    section: "education",
    title: "Global Exchange Program",
    org: "Sungkyunkwan University",
    period: "Aug 2026 – Dec 2026",
    location: "Seoul, South Korea",
    bullets: []
  },
  {
    id: "bologna",
    section: "education",
    title: "Erasmus+ Exchange Program",
    org: "Alma Mater Studiorum Università di Bologna",
    period: "Feb 2025 – Jun 2025",
    location: "Bologna, Italy",
    bullets: []
  },

  // Publications
  {
    id: "icmla-2026",
    section: "publications",
    title: "Beyond Skewness: Confidence-Guided Rank Fusion for Text Retrieval",
    authors: "N. Yalçın, E. Teper, M. Keskin, M. Öztürk Umut, Y. H. Şahin",
    venue: "International Conference on Machine Learning and Applications (ICMLA 2026). Accepted.",
    bullets: [
      "Extends SkewFuse to heterogeneous text retrieval with per-query score normalization and Top-K Gap, Z-Score, Entropy and Hybrid confidence estimators, evaluated on ArguAna, NFCorpus and SciFact."
    ],
    tags: ["Rank fusion", "BM25", "SPLADE", "Dense retrieval", "BEIR"],
    links: [
      { label: "Paper", href: "/papers/icmla2026-rank-fusion.pdf" },
      { label: "Acceptance", href: "https://www.icmla-conference.org/icmla26/maintrackshortpapers.html" }
    ]
  },
  {
    id: "siu-2026",
    section: "publications",
    title: "Edge AI Integration Architecture for the Internet of Things",
    authors: "D. Alkanalka, M. Seçen, N. Yalçın, H. E. Yıldız, E. Çimenoğlu, T. Helvacıoğlu, D. Keküllüoğlu",
    venue: "34th Signal Processing and Communications Applications Conference (SIU 2026), IEEE.",
    bullets: [],
    tags: ["Edge AI", "IoT"],
    links: [{ label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/abstract/document/11636549" }]
  },

  // Research experience
  {
    id: "twente",
    section: "research",
    title: "Research Intern (Erasmus+ Traineeship)",
    org: "University of Twente",
    period: "Jun 2026 – Aug 2026",
    location: "Enschede, Netherlands",
    bullets: [
      "Reproduced three published AI/ML papers on 5G/O-RAN network security and handover prediction from their written methodology alone, then diagnosed discrepancies against the authors' released code and models.",
      "Synthesized the results into a nine-point Minimum Disclosure Set for ML paper reproducibility, published to the team's documentation site."
    ],
    tags: ["Reproducibility", "5G", "O-RAN", "Network security"]
  },
  {
    id: "siemens",
    section: "research",
    title: "Senior Project Student",
    org: "Siemens",
    period: "Sep 2025 – Jun 2026",
    location: "Istanbul, Turkey",
    bullets: [
      "Built a resource-efficient, secure Action Orchestration Agent for industrial edge automation using small quantized language models (SLMs) to map natural-language operator commands to protocol-driven MQTT actions locally."
    ],
    tags: ["SLM", "Quantization", "MQTT", "Edge AI"]
  },
  {
    id: "suhope",
    section: "research",
    title: "Undergraduate Research Assistant",
    org: "Sabancı University, SUHOPE",
    period: "Feb 2025 – Jun 2026",
    location: "Istanbul, Turkey",
    bullets: [
      "Contributed to research projects at the Sustainable Health and Humanitarian Operations Research Lab, working with PhD students and faculty on humanitarian logistics and disaster response."
    ],
    tags: ["Humanitarian logistics", "Disaster response"]
  },
  {
    id: "pure",
    section: "research",
    title: "Research Assistant, Program for Undergraduate Research (PURE)",
    org: "Sabancı University",
    period: "Feb 2024 – Feb 2025",
    location: "Istanbul, Turkey",
    bullets: [
      "Researched disaster relief logistics over three semesters under the supervision of Prof. Raha Akhavan Tabatabaei and Altuğ Tanaltay."
    ],
    tags: ["Disaster relief", "Logistics"]
  },

  // Industry experience
  {
    id: "hepsiburada",
    section: "industry",
    title: "Data Science Intern",
    org: "Hepsiburada",
    period: "Jan 2026 – Jun 2026",
    location: "Istanbul, Turkey",
    bullets: [
      "Developed a query labeling framework using LLMs and applied machine learning to classify search queries as broad, specific or ambiguous.",
      "Prototyped agent-based systems to automate experimentation for new search features.",
      "Optimized ranking feature weights using NDCG@k and CR@k, targeting search-driven sales."
    ],
    tags: ["Search", "Ranking", "LLM", "NDCG"]
  },
  {
    id: "bekaert",
    section: "industry",
    title: "R&D Intern",
    org: "Bekaert",
    period: "Aug 2025",
    location: "Shanghai, China",
    bullets: [
      "Designed and implemented data extraction and reporting pipelines from .zs2 files for mechanical lab tests, and applied machine learning to classify tensile test outcomes as acceptable or defective."
    ],
    tags: ["Data pipelines", "Classification"]
  },
  {
    id: "getirfinans",
    section: "industry",
    title: "Data Science Intern",
    org: "Getirfinans",
    period: "Jun 2025 – Jul 2025",
    location: "Istanbul, Turkey",
    bullets: [
      "Automated the extraction and comparison of interest and deposit rates with asynchronous Python and Playwright web scraping pipelines."
    ],
    tags: ["Python", "Playwright", "Web scraping"]
  },

  // Teaching
  {
    id: "dsa210",
    section: "teaching",
    title: "Learning Assistant, DSA 210 Introduction to Data Science",
    org: "Sabancı University",
    period: "Feb 2026 – Jun 2026",
    location: "Istanbul, Turkey",
    bullets: [
      "Led weekly office hours and one-on-one meetings, guiding students' course projects from data collection and analysis to final presentation."
    ],
    tags: ["Data science", "Mentoring"]
  },

  // Projects
  {
    id: "slm-orchestration",
    section: "projects",
    title: "Resource-Efficient AI Action Orchestration Platform for Industrial Edge Devices",
    bullets: [
      "Benchmarked FunctionGemma-270M, Granite-350M and Gemma 3-1B under zero-shot, few-shot and fine-tuned settings for translating natural-language operator commands into MQTT tool calls, on a synthetic dataset of 3,700+ commands.",
      "Developed a method-based intent model that separates action type from device identity, so it scales across sensor configurations.",
      "Fine-tuned Granite-350M: exact-match test accuracy rose from 17.0% to 99.5%, with 100% tool-call accuracy and 96.8% correct rejection of out-of-scope commands, matching Gemma 3-1B with roughly one third of the parameters and fitting 4–8 GB VRAM edge hardware."
    ],
    tags: ["Fine-tuning", "SLM", "Tool calling", "MQTT", "PyTorch", "Transformers"]
  },
  {
    id: "pure-brands",
    section: "projects",
    title: "Disaster Relief Logistics: Assessing Multinational Brands' Responses",
    bullets: [
      "Analyzed earthquake-related tweets in Python with classification, correlation and regression; disaster-related posts drew higher engagement.",
      "Identified sector-specific response patterns, from donations and supply deliveries to free communication and logistics support, and evaluated brands' crisis communication."
    ],
    tags: ["Python", "Regression", "Social media"],
    links: [{ label: "Report", href: "/research/pure-brand-responses-earthquake.pdf" }]
  },
  {
    id: "pure-news",
    section: "projects",
    title: "Improving Coordination in Disaster Relief Donations via News Cycle Analysis",
    bullets: [
      "After the 2023 Kahramanmaraş earthquake, almost all news outlets relied on two AFAD need lists for eleven affected cities, missing how regional needs shifted over time.",
      "The top five communicated needs changed week by week: food and water in the first days, shelter and hygiene products by the fourth week, while over-donation of clothing created supply–demand mismatches.",
      "Compared media-reported needs with donor survey data: largely overlapping, with gaps in child-specific and sleeping supplies."
    ],
    tags: ["News analysis", "Donations", "Survey data"],
    links: [{ label: "Report", href: "/research/pure-earthquake-needs-news-coverage.pdf" }]
  },
  {
    id: "pure-csr",
    section: "projects",
    title: "Corporate Social Responsibility Communication in Disaster Relief",
    bullets: [
      "Collected and annotated thousands of social media posts from 60 local and international companies after the 2023 Kahramanmaraş earthquake.",
      "Classified content as informational, transformational or interactional; emotionally resonant posts with visual media drew the highest engagement."
    ],
    tags: ["Annotation", "Classification", "CSR"],
    links: [{ label: "Report", href: "/research/pure-csr-communication-earthquake.pdf" }]
  },
  {
    id: "airport-sim",
    section: "projects",
    title: "Airport Terminal Simulation & Optimization",
    bullets: [
      "Built a discrete-event simulation model in Arena to analyze passenger flow and optimize resource allocation.",
      "Validated the model with Chi-Square, Kolmogorov–Smirnov and paired t-tests."
    ],
    tags: ["Arena", "Simulation", "Statistics"]
  },
  {
    id: "messaging",
    section: "projects",
    title: "Real-Time Messaging Application",
    bullets: [
      "Built messaging and friend management with Java, Spring Boot, MongoDB, Docker and JWT authentication, covering registration, sessions and message exchange."
    ],
    tags: ["Java", "Spring Boot", "MongoDB", "Docker", "JWT"]
  },

  // Awards
  {
    id: "fulbright",
    section: "awards",
    title: "Fulbright Principal Candidate, 2026–2027",
    bullets: [
      "Selected as a principal nominee by the Turkish Fulbright Commission for the Fulbright Foreign Student Program, for graduate study in the United States."
    ]
  },
  {
    id: "deans-list",
    section: "awards",
    title: "Dean's High Honor List, Sabancı University",
    bullets: ["Fall 2022–23, Fall 2023–24, Spring 2023–24, Fall 2024–25, Fall 2025–26."]
  },
  {
    id: "promise",
    section: "awards",
    title: "1st Place, Promise for Tomorrow Program",
    bullets: [
      "Startup idea competition organized by Sisterslab, an NGO promoting gender equality in STEM, and Hepsiburada."
    ]
  },
  {
    id: "ielts",
    section: "awards",
    title: "IELTS 8.5 / 9.0",
    bullets: ["Listening 9.0, Reading 9.0, Writing 7.5, Speaking 8.0."],
    links: [{ label: "Certificate", href: "/docs/ielts-2025.pdf" }]
  }
];

export const skills: { label: string; items: string[] }[] = [
  { label: "Programming & tools", items: ["Python", "C++", "Java", "R", "SQL", "MongoDB", "Git", "Docker", "MQTT"] },
  {
    label: "Machine learning",
    items: ["scikit-learn", "TensorFlow", "PyTorch", "NLTK", "Transformers", "BERT", "GPT"]
  },
  { label: "Web", items: ["React", "Spring Boot", "JWT", "PostgreSQL"] },
  { label: "Optimization & simulation", items: ["Arena", "Gurobi"] },
  { label: "Languages", items: ["Turkish (native)", "English (C2)"] }
];

export const webNote = "Also built a full-stack e-commerce platform with React, Spring Boot, JWT and PostgreSQL.";

export const service =
  "Teaches mathematics to middle-school students from underserved regions with the School Support Association; took part in a civic engagement project supporting refugees, low-income families and women; volunteered with Haytap and local groups caring for injured and displaced animals after the 2023 Kahramanmaraş earthquake.";
