export const PORTFOLIO_DATA = {
  bio: {
    paragraphs: [
      "I am a passionate AI Researcher and Full-Stack Engineer driven by the desire to solve complex problems through elegant code and innovative architectures.",
      "My work sits at the intersection of robust machine learning research and scalable web development, ensuring that powerful models don't just stay in notebooks—they reach end-users through seamless interfaces."
    ]
  },
  skills: {
    row1: [
      { name: "Python", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/black", invertDark: true },
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "C++", iconUrl: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "PyTorch", iconUrl: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
      { name: "YOLOv8", iconUrl: "https://cdn.simpleicons.org/ultralytics/0055FF" },
    ],
    row2: [
      { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "OpenCV", iconUrl: "https://cdn.simpleicons.org/opencv/5C3EE8" },
      { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Supabase", iconUrl: "https://cdn.simpleicons.org/supabase/3ECF8E" },
      { name: "Docker", iconUrl: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Git", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
      { name: "AWS", iconUrl: "https://skillicons.dev/icons?i=aws" },
      { name: "Framer Motion", iconUrl: "https://cdn.simpleicons.org/framer/black", invertDark: true },
    ]
  },
  projects: [
    {
      id: 1,
      title: "Med-Llama-RAG",
      description: "Engineered a medical report analysis system by fine-tuning Llama-3.2-1B via QLORA on a 4,000-sample PubMedQA dataset, integrating a RAG pipeline for secure querying. [cite: 13]",
      tags: ["Python", "Llama 3B", "QLORA", "RAG"], // [cite: 12]
      github: "https://github.com/aunindya-saha/Med-Llama-RAG", // [cite: 12]
      live: "#",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900" // Placeholder image for medical AI
    },
    {
      id: 2,
      title: "CampusNet App",
      description: "Developed a cross-platform application connecting MIST students, architecting 15+ interactive UI screens for real-time messaging and community feeds. [cite: 15]",
      tags: ["Flutter", "Dart", "Firebase"], // [cite: 14]
      github: "https://github.com/Deesun-Abar-Ke/CampusNet", // [cite: 14]
      live: "#",
      image: "https://images.unsplash.com/photo-1511649475669-e288648b2339?auto=format&fit=crop&q=80&w=900" // Placeholder image for mobile app
    },
    {
      id: 3,
      title: "Haat-Bazar",
      description: "Built a full-stack e-commerce platform for agricultural trading, integrating 5 core modules including an AI chatbot, real-time inventory tracking, and secure role-based access. [cite: 17]",
      tags: ["React.js", "Node.js", "MongoDB", "AI"], // [cite: 16]
      github: "https://github.com/Deesun-Abar-Ke/HaatBazar", // [cite: 16]
      live: "#",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=900" // Placeholder image for agriculture/e-commerce
    },
    {
      id: 4,
      title: "MIST KickOff",
      description: "Created a desktop application for football club management, automating PDF generation to reduce manual team formation and reporting time by 87.5% (from 40 to 5 minutes). [cite: 20]",
      tags: ["Java", "JavaFX", "MySQL"], // [cite: 18]
      github: "https://github.com/NahulRahman/MIST", // [cite: 18]
      live: "#",
      image: "https://images.unsplash.com/photo-1621998014874-a6edfb5f9bc7?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder image for football/management
    },
    {
      id: 5,
      title: "House of Alchemists (LMS Portal)",
      description: "Engineered a comprehensive business application for educational management featuring distinct, secure role-based portals for teachers (exam creation, batch management) and students (resource access, assessments).",
      tags: ["React.js", "Node.js", "Express", "Postgres"],
      github: "https://github.com/aunindya-saha/house-of-alchemists-frontend",
      live: "#",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=900" // Placeholder image for education/LMS
    }
  ],
  research: [
    {
      id: 1,
      title: "EfficientNetB3 Architecture for High-Resolution Medical Imaging",
      conference: "ICCIT 2025",
      type: "Published",
      year: "2025",
      description: "An optimized implementation of EfficientNetB3 tailored for identifying anomalies in high-resolution MRI scans, achieving a 12% improvement in inference speed with minimal accuracy tradeoff.",
      link: "https://ieeexplore.ieee.org/document/11491802",
      image: "/HPO%20Algo.png"
    },
    {
      id: 2,
      title: "Automated Job Recommendation Pipelines using Graph Neural Networks",
      conference: "ICCIT 2025",
      type: "Published",
      year: "2025",
      description: "Proposed a novel GNN-based recommendation system that models applicant-to-job fit across heterogeneous graphs, outperforming traditional collaborative filtering baselines.",
      link: "https://ieeexplore.ieee.org/document/11491820",
      image: "/JobRecommend.png"
    }
  ],
  achievements: [
    {
      id: 1,
      title: "Professional Case Study, Procon 2023",
      role: "CHAMPION",
      date: "2023",
      description: "Proposed multi-dimensional solution to prevent malpractice and immoral use on Social Media platform. Among them Algorithmic Bias Strategies to identify fake accounts and bot identification, Benford algorithm implementation, and robust security system awareness are the major ones.",
      icon: "💻",
      accent: "from-purple-500 to-blue-500",
      border: "border-purple-500/30",
      glow: "shadow-purple-500/10",
      image: "/ieee_case_champ.jpeg"
    },
    {
      id: 2,
      title: "Casecraft AutoRealm ",
      role: "Second Runner-Up",
      date: "2024",
      description: "In this competition we were give a case file to address security issues in a vehicle manufactured by a Bangladeshi company. Additionally, we introduced a mobile app prototype based on Machine Learning to enhance safety measures and presented a comprehensive business plan outlining strategies to compete in today's dynamic business environment.",
      icon: "🏆",
      accent: "from-amber-500 to-orange-500",
      border: "border-amber-500/30",
      glow: "shadow-amber-500/10",
      image: "/case_craft.jpeg"
    },
    {
      id: 3,
      title: "National Round, TechnoXian Bangladesh National Championship",
      role: "Top 10 Finalist",
      date: "2024",
      description: "This competition was aimed at making robotics more relatable and accessible to a wider audience. Out of 200 participating teams, only 7 advanced to the final round held at AlUB on 8 March 2024.",
      icon: "⚡",
      accent: "from-cyan-500 to-teal-500",
      border: "border-cyan-500/30",
      glow: "shadow-cyan-500/10",
      image: "/Techno_Final.jpeg"
    }
  ]
};
