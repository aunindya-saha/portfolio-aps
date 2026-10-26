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
      { name: "TensorFlow", iconUrl: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
      { name: "Scikit-learn", iconUrl: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
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
      { name: "Hugging Face", iconUrl: "https://cdn.simpleicons.org/huggingface/FFD21E" },
      { name: "FastAPI", iconUrl: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "Flask", iconUrl: "https://cdn.simpleicons.org/flask/black", invertDark: true },
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Vercel", iconUrl: "https://cdn.simpleicons.org/vercel/black", invertDark: true },
      { name: "Linux", iconUrl: "https://cdn.simpleicons.org/linux/FCC624" },
    ]
  },
  projects: [
    {
      id: 1,
      featured: true,
      title: "Med-Llama-RAG",
      description: "Engineered a medical report analysis system by fine-tuning Llama-3.2-1B via QLORA on a 4,000-sample PubMedQA dataset, integrating a RAG pipeline for secure querying.",
      tags: ["Python", "Llama 3B", "QLORA", "RAG"], // [cite: 12]
      github: "https://github.com/aunindya-saha/Med-Llama-RAG", // [cite: 12]
      live: "#",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900" // Placeholder image for medical AI
    },
    {
      id: 2,
      title: "CampusNet App",
      description: "Developed a cross-platform application connecting MIST students, architecting 15+ interactive UI screens for real-time messaging and community feeds.",
      tags: ["Flutter", "Dart", "Firebase"], // [cite: 14]
      github: "https://github.com/Deesun-Abar-Ke/CampusNet", // [cite: 14]
      live: "#",
      image: "https://images.unsplash.com/photo-1511649475669-e288648b2339?auto=format&fit=crop&q=80&w=900" // Placeholder image for mobile app
    },
    {
      id: 3,
      title: "Haat-Bazar",
      description: "Built a full-stack e-commerce platform for agricultural trading, integrating 5 core modules including an AI chatbot, real-time inventory tracking, and secure role-based access.",
      tags: ["React.js", "Node.js", "MongoDB", "AI"], // [cite: 16]
      github: "https://github.com/Deesun-Abar-Ke/HaatBazar", // [cite: 16]
      live: "#",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=900" // Placeholder image for agriculture/e-commerce
    },
    {
      id: 4,
      title: "MIST KickOff",
      description: "Created a desktop application for football club management, automating PDF generation to reduce manual team formation and reporting time by 87.5% (from 40 to 5 minutes).",
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
    },
    {
      id: 6,
      featured: true,
      title: "Explainable Crop Recommendation System",
      description: "Trained Random Forest and XGBoost models (with SMOTE and SHAP explainability) on soil-climate data, and deployed a full-stack Vercel web app (FastAPI, React) where users adjust nutrient sliders to receive instant crop suggestions.",
      tags: ["Python", "XGBoost", "SHAP", "FastAPI", "React.js"],
      github: "https://github.com/aunindya-saha/crop-prediction",
      live: "https://crop-prediction-fxb2qedba-aunindya-sahas-projects.vercel.app/",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=900"
    },
    {
      id: 7,
      featured: true,
      title: "Dual-Agent Email Assistant",
      description: "Designed an email drafting pipeline using two distinct LLMs conditioned on user intent and tone, paired with an automated LLM-as-a-Judge workflow (e.g., Llama-3.3-70B) that scores outputs on clarity and goal completion.",
      tags: ["Python", "LLMs", "LLM-as-a-Judge", "Prompt Engineering"],
      github: "https://github.com/aunindya-saha/email-assistant",
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&q=80&w=900"
    },
    {
      id: 8,
      featured: true,
      title: "JBC Agentica",
      description: "Full-stack conversational AI app built during an industrial traineeship at JB Connect Ltd. in an agile workflow, with automated AWS CI/CD deployment and testing pipelines via Docker.",
      tags: ["React.js", "Flask", "Docker", "AWS", "CI/CD"],
      github: "https://github.com/aunindya-saha/JBC-Agentica",
      live: "https://jbc-agentica.vercel.app/",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=900"
    }
  ],
  research: [
    {
      id: 1,
      title: "Comparative Analysis of Hyperparameter Optimization Algorithms for EfficientNetB3 in White Blood Cell Classification",
      conference: "IEEE ICCIT 2025",
      type: "Published",
      year: "2025",
      description: "Benchmarked six hyperparameter optimization methods to evaluate model stability, representation skew, and compute tradeoffs under severe class imbalance.",
      link: "https://doi.org/10.1109/ICCIT68739.2025.11491802",
      image: "/HPO%20Algo.png"
    },
    {
      id: 2,
      title: "From Keywords to Context: A Comparative Analysis of Semantic (SBERT) vs Traditional Keyword-Based (Machine Learning) Matching for Job Recommendation",
      conference: "IEEE ICCIT 2025",
      type: "Published",
      year: "2025",
      description: "Built an NLP and data analytics framework comparing Sentence-BERT against traditional keyword baselines to eliminate superficial keyword bias and match applicant profiles by semantic context.",
      link: "https://doi.org/10.1109/ICCIT68739.2025.11491820",
      image: "/JobRecommend.png"
    }
  ],
  ongoingResearch: [
    {
      id: 1,
      title: "The Impact of Generative AI on Cognitive Dependency and Learning Behaviors Among Students in Bangladesh",
      type: "Ongoing",
      status: "Survey Study",
      description: "Conducting a survey and identifying the behavioral impact of generative AI on tertiary-level students of Bangladesh.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "A Leakage-Aware Framework for Interpreting ML Models in Childhood Mental Health",
      type: "Ongoing",
      status: "Model Auditing",
      description: "Auditing 40,000+ NSCH records by stripping post-diagnosis confounders, evaluating Random Forest and Logistic Regression models via risk calibration to enable reliable pediatric ADHD screening.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "SMART-Agri: Voice-Enabled, RAG-Driven Advisory System via Satellite Telemetry",
      type: "Ongoing",
      status: "System Building",
      description: "Connecting NASA POWER satellite telemetry ensembles with a hybrid retrieval pipeline (ChromaDB, SBERT) and a local Qwen-2.5-7B SLM to deliver real-time voice and text farming advice on Telegram.",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "Automated Geospatial Mapping & Flood Risk Analysis via Computer Vision",
      type: "Ongoing",
      status: "Computer Vision",
      description: "Classifying building roof materials (concrete vs. thatch/tin) from aerial drone images using a custom YOLO detector, pairing structural footprints with QGIS elevation maps to trace flood hazard paths.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800"
    }
  ],
  achievements: [
    {
      id: 1,
      featured: true,
      title: "Professional Case Study, Procon 2023",
      role: "CHAMPION",
      date: "2023",
      description: "Proposed multi-dimensional solution to prevent malpractice and immoral use on Social Media platform. Among them Algorithmic Bias Strategies to identify fake accounts and bot identification, Benford algorithm implementation, and robust security system awareness are the major ones.",
      icon: "💻",
      accent: "from-purple-500 to-blue-500",
      border: "border-purple-500/30",
      glow: "shadow-purple-500/10",
      link: "https://drive.google.com/file/d/1yfIJGOm5BiqxmCR1u0mnt2HqCUKufdG3/view?usp=sharing",
      linkLabel: "View Certificate",
      image: "/ieee_case_champ.jpeg"
    },
    {
      id: 2,
      featured: true,
      title: "Casecraft AutoRealm ",
      role: "Second Runner-Up",
      date: "2024",
      description: "In this competition we were give a case file to address security issues in a vehicle manufactured by a Bangladeshi company. Additionally, we introduced a mobile app prototype based on Machine Learning to enhance safety measures and presented a comprehensive business plan outlining strategies to compete in today's dynamic business environment.",
      icon: "🏆",
      accent: "from-amber-500 to-orange-500",
      border: "border-amber-500/30",
      glow: "shadow-amber-500/10",
      link: "https://drive.google.com/file/d/15iaG0rDoAYE4oOjzyqOWbeiz_wCyPXnE/view?usp=sharing",
      linkLabel: "View Credential",
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
    },
    {
      id: 4,
      featured: true,
      title: "3MT SciBlitz 2.0 by IEEE CUET (Thesis Presentation)",
      role: "Finalist (Top 10)",
      date: "2026",
      description: "Presented the B.Sc. thesis on LLM-driven versus traditional hyperparameter optimization for imbalanced medical image classification in the Three Minute Thesis competition organized by IEEE CUET.",
      icon: "🎤",
      accent: "from-pink-500 to-rose-500",
      border: "border-pink-500/30",
      glow: "shadow-pink-500/10",
      link: "https://drive.google.com/file/d/1i95GR1UJxgvHWnZzCCuodg457KwLj-7p/view?usp=sharing",
      linkLabel: "View Credential",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      title: "Nexus of Wit Case Competition",
      role: "Finalist (Top 10)",
      date: "2025",
      description: "Reached the final round, ranking among the top 10 teams in the Nexus of Wit case competition.",
      icon: "🧠",
      accent: "from-indigo-500 to-violet-500",
      border: "border-indigo-500/30",
      glow: "shadow-indigo-500/10",
      link: "https://drive.google.com/file/d/1inltiglja3qVxbmkAFkCKsAj4XLo_3nK/view?usp=sharing",
      linkLabel: "View Credential",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      featured: true,
      title: "IEEE Debate Competition, National Round",
      role: "1st Runner-Up",
      date: "2023",
      description: "Secured the first runner-up position in the national round of the IEEE Debate Competition.",
      icon: "🗣️",
      accent: "from-emerald-500 to-green-500",
      border: "border-emerald-500/30",
      glow: "shadow-emerald-500/10",
      link: "https://drive.google.com/file/d/1Oii_Z-B6t4o30AD7ZYg5jOBSTQNSxVk1/view?usp=sharing",
      linkLabel: "View Certificate",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 7,
      title: "Independence Day Programming Contest",
      role: "11th Place (Out of 60 Teams)",
      date: "Mar 2023",
      description: "Ranked 11th out of 60 competing teams in the Independence Day Programming Contest.",
      icon: "⌨️",
      accent: "from-sky-500 to-blue-500",
      border: "border-sky-500/30",
      glow: "shadow-sky-500/10",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
    }
  ]
};
