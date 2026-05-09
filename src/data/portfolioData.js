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
      title: "Automated Landslide Detection System",
      description: "A real-time computer vision pipeline utilizing YOLOv8 and Via Sicura frameworks to detect and classify early indicators of landslides from drone footage. Engineered for low-latency edge deployment.",
      tags: ["YOLOv8", "Python", "OpenCV", "Via Sicura"],
      github: "https://github.com/anindosaha16",
      live: "#",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900"
    },
    {
      id: 2,
      title: "AI-Powered Job Recommendation Engine",
      description: "A Graph Neural Network-based recommendation system that models applicant-to-job fit across heterogeneous data graphs, outperforming traditional collaborative filtering baselines by 30%.",
      tags: ["PyTorch Geometric", "GNN", "FastAPI", "React"],
      github: "https://github.com/anindosaha16",
      live: "#",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=900"
    },
    {
      id: 3,
      title: "Medical Imaging Anomaly Detector",
      description: "An optimized EfficientNetB3 architecture tailored for identifying anomalies in high-resolution MRI scans, achieving a 12% improvement in inference speed with minimal accuracy tradeoff.",
      tags: ["EfficientNet", "TensorFlow", "DICOM", "Docker"],
      github: "https://github.com/anindosaha16",
      live: "#",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=900"
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
