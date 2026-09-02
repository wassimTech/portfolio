import { Locale } from "@/types/cv";
import { personalInfo } from "@/data/cv";

export interface ChatIntentResult {
  response: string;
  suggestions: string[];
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks if the normalized text contains any of the target words/phrases as whole words
 */
function hasWord(text: string, patterns: string[]): boolean {
  const words = text.split(" ");
  for (const pattern of patterns) {
    const normPattern = normalizeText(pattern);
    if (normPattern.includes(" ")) {
      if (text.includes(normPattern)) return true;
    } else {
      if (words.includes(normPattern)) return true;
    }
  }
  return false;
}

export function generateLocalChatResponse(
  userMessage: string,
  locale: Locale = "fr"
): ChatIntentResult {
  const query = normalizeText(userMessage);
  const isEn = locale === "en";

  // 1. Greetings & Salutations (Hello / Bonjour / Salut)
  if (
    hasWord(query, [
      "hello",
      "hi",
      "hey",
      "bonjour",
      "salut",
      "coucou",
      "bonsoir",
      "yo",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `Hello! 👋 I am **Wassim AHMED's AI Resume Assistant**.\n\n` +
          `I can help you explore his **5+ years of engineering experience**, key projects (Cloudflare, AI Workflow, React Native), and technical stack.\n\n` +
          `What would you like to know?`,
        suggestions: [
          "What are his key AI and Cloudflare projects?",
          "Tell me about his role as Team Leader",
          "What is his full tech stack?",
          "How can I contact Wassim?",
        ],
      };
    }

    return {
      response:
        `Bonjour ! 👋 Je suis l'**Assistant IA du CV de Wassim AHMED**.\n\n` +
        `Je suis à votre disposition pour vous renseigner sur ses **5+ années d'expérience**, ses projets majeurs (Cloudflare, Plateforme IA, React Native) et ses compétences techniques.\n\n` +
        `Que souhaitez-vous découvrir ?`,
      suggestions: [
        "Quels sont ses projets IA et Cloudflare ?",
        "Parle-moi de ses rôles de Team Leader",
        "Quelle est sa stack technique complète ?",
        "Comment contacter Wassim ?",
      ],
    };
  }

  // 2. Identity & Capabilities (Who are you / Qui es-tu)
  if (
    hasWord(query, [
      "qui es tu",
      "qui est tu",
      "qui vous etes",
      "t es qui",
      "who are you",
      "who are u",
      "what are you",
      "c est quoi ton role",
      "ton role",
      "man anta",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `I am an interactive AI assistant dedicated to **Wassim AHMED's professional portfolio**.\n\n` +
          `I am trained on his verified background: engineering degree (ENIS), 5+ years building full-stack platforms, leading mobile teams (ZorLife, Bloom), and deploying Cloudflare serverless architectures.\n\n` +
          `Feel free to ask about any project, skill, or collaboration opportunity!`,
        suggestions: [
          "What are his main achievements at TEKAB.DEV?",
          "What mobile apps has he published?",
          "What are his contact details?",
        ],
      };
    }

    return {
      response:
        `Je suis l'assistant IA interactif dédié au **portfolio professionnel de Wassim AHMED**.\n\n` +
        `J'ai été conçu pour répondre précisément à toutes vos questions sur son parcours : son diplôme d'ingénieur à l'ENIS, ses 5+ ans d'expérience, son leadership sur des projets mobiles (ZorLife, Bloom) et ses architectures Cloudflare / Next.js.\n\n` +
        `N'hésitez pas à me poser des questions sur ses réalisations ou sa disponibilité !`,
      suggestions: [
        "Quelles sont ses réalisations chez TEKAB.DEV ?",
        "Quelles applications mobiles a-t-il publiées ?",
        "Quelles sont ses coordonnées de contact ?",
      ],
    };
  }

  // 3. Politeness / Gratitude / Goodbye
  if (
    hasWord(query, [
      "merci",
      "merci beaucoup",
      "thanks",
      "thank you",
      "thx",
      "au revoir",
      "bye",
      "goodbye",
      "a bientot",
      "shukran",
    ])
  ) {
    if (isEn) {
      return {
        response: `You're very welcome! Feel free to explore the interactive project showcase or download Wassim's CV. Have a wonderful day!`,
        suggestions: [
          "Download official Resume",
          "Explore Featured Projects",
          "Contact Wassim",
        ],
      };
    }

    return {
      response: `Avec grand plaisir ! N'hésitez pas à explorer la section des projets ou à télécharger le CV complet de Wassim. Bonne visite !`,
      suggestions: [
        "Télécharger le CV officiel",
        "Explorer les projets détaillés",
        "Contacter Wassim",
      ],
    };
  }

  // 4. Contact / Info / Availability / Location
  if (
    hasWord(query, [
      "contact",
      "contacter",
      "email",
      "mail",
      "telephone",
      "phone",
      "tel",
      "numero",
      "adresse",
      "location",
      "localisation",
      "ville",
      "ou habite",
      "disponible",
      "disponibilite",
      "available",
      "availability",
      "hire",
      "recruter",
      "embaucher",
      "linkedin",
      "github",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `You can directly reach out to **Wassim AHMED** via:\n\n` +
          `- **Email**: [${personalInfo.email}](mailto:${personalInfo.email})\n` +
          `- **Phone**: \`${personalInfo.phone}\`\n` +
          `- **Location**: ${personalInfo.location.en}\n` +
          `- **LinkedIn**: [linkedin.com/in/-wassim-ahmed-](${personalInfo.linkedin})\n` +
          `- **GitHub**: [github.com/wassimTech](${personalInfo.github})\n\n` +
          `Wassim is open to full stack, cloud architecture, and technical leadership opportunities.`,
        suggestions: [
          "What are his key AI and Cloudflare projects?",
          "Tell me about his experience at TEKAB.DEV",
          "What is his engineering education?",
        ],
      };
    }

    return {
      response:
        `Vous pouvez contacter directement **Wassim AHMED** via :\n\n` +
        `- **Email** : [${personalInfo.email}](mailto:${personalInfo.email})\n` +
        `- **Téléphone** : \`${personalInfo.phone}\`\n` +
        `- **Localisation** : ${personalInfo.location.fr}\n` +
        `- **LinkedIn** : [linkedin.com/in/-wassim-ahmed-](${personalInfo.linkedin})\n` +
        `- **GitHub** : [github.com/wassimTech](${personalInfo.github})\n\n` +
        `Wassim est actuellement disponible pour des missions d'architecture Cloud, rôles Fullstack Senior ou Team Lead.`,
      suggestions: [
        "Quels sont ses projets IA et Cloudflare ?",
        "Parle-moi de son expérience chez TEKAB.DEV",
        "Quelle est sa formation d'ingénieur ?",
      ],
    };
  }

  // 5. AI / Agent / Workflow / Devfactory-cli
  if (
    hasWord(query, [
      "ia",
      "ai",
      "agent",
      "agents",
      "workflow",
      "devfactory",
      "cli",
      "npm",
      "tekab",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `Wassim developed the **Collaborative Workflow & AI Agent Management Platform** at TEKAB.DEV (2021 - 2026):\n\n` +
          `- **Interactive Chatbot & AI Agents**: Integrated AI agents (Vercel AI SDK, OpenAI/Claude) to automatically generate functional specifications and task backlogs.\n` +
          `- **Custom Agents Catalog**: Platform allowing users to configure, publish, and clone custom AI agents and skills.\n` +
          `- **devfactory-cli**: Built and published a command-line tool on NPM allowing developers to install and run agents locally from their terminal.\n` +
          `- **Serverless Architecture**: Engineered APIs with **Hono.js** and **Cloudflare Workers**, modeled database with **Prisma**, and configured storage on **Cloudflare R2** with **Next.js** frontend.`,
        suggestions: [
          "Tell me about the URJOB AI recruitment platform",
          "What was his role on ZorLife and Bloom?",
          "What are his Cloudflare and serverless skills?",
        ],
      };
    }

    return {
      response:
        `Wassim a conçu et développé la **Plateforme de gestion de projet et de workflow collaboratif assistée par IA** chez TEKAB.DEV (2021 - 2026) :\n\n` +
        `- **Chatbot & Agents IA** : Intégration d'agents IA (Vercel AI SDK, OpenAI, Claude) pour générer automatiquement les spécifications fonctionnelles et le backlog.\n` +
        `- **Catalogue d'agents** : Système permettant aux développeurs de configurer, publier et cloner des agents IA personnalisés.\n` +
        `- **devfactory-cli (NPM)** : Développement et publication sur le registre NPM d'un outil CLI pour installer et exécuter des agents en local.\n` +
        `- **Architecture Serverless** : APIs avec **Hono.js** sur **Cloudflare Workers**, modélisation **Prisma**, stockage **Cloudflare R2** et frontend **Next.js** (Tailwind CSS, Shadcn UI).`,
      suggestions: [
        "Parle-moi de la plateforme de recrutement URJOB",
        "Quel était son rôle sur ZorLife et Bloom ?",
        "Quelles sont ses compétences Cloudflare et Hono.js ?",
      ],
    };
  }

  // 6. URJOB Project
  if (
    hasWord(query, [
      "urjob",
      "recrutement",
      "recruitment",
      "matching",
      "cvs",
      "candidats",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `**URJOB** is an AI-assisted recruitment platform built for recruiters and consultants:\n\n` +
          `- **AI Matching**: Automated parsing of resumes and job descriptions using intelligent matching algorithms.\n` +
          `- **Full Stack Architecture**: High-performance **NestJS** backend APIs with caching and query optimization, PostgreSQL database with **Prisma** and **Supabase**.\n` +
          `- **Frontend Evolution**: Interactive Kanban pipeline, and progressive migration from **Vue.js** to **Next.js** for maximum performance and SEO.\n` +
          `- **DevOps**: Docker containerization, GitLab CI/CD pipelines, and secure storage on **Cloudflare R2**.`,
        suggestions: [
          "Tell me about his mobile projects (ZorLife & Bloom)",
          "What are his backend and NestJS skills?",
          "How does he handle Cloudflare storage?",
        ],
      };
    }

    return {
      response:
        `**URJOB** est une plateforme de recrutement assistée par IA destinée aux recruteurs et consultants :\n\n` +
        `- **Matching IA** : Analyse automatique des CVs et des offres d'emploi via des algorithmes de scoring et d'évaluation IA.\n` +
        `- **Architecture Full Stack** : Backend **NestJS** ultra-performant avec mise en cache, base de données PostgreSQL gérée avec **Prisma** et **Supabase**.\n` +
        `- **Évolution Frontend** : Interface Kanban temps réel, et migration progressive de **Vue.js** vers **Next.js** pour booster les performances et le SEO.\n` +
        `- **DevOps & Cloud** : Conteneurisation Docker, pipelines GitLab CI/CD et stockage sécurisé sur **Cloudflare R2**.`,
      suggestions: [
        "Parle-moi de ses projets mobiles (ZorLife & Bloom)",
        "Quelles sont ses compétences NestJS et Prisma ?",
        "Comment contacter Wassim ?",
      ],
    };
  }

  // 7. ZorLife & Bloom / Team Leader / Mobile
  if (
    hasWord(query, [
      "zorlife",
      "bloom",
      "team lead",
      "team leader",
      "leader",
      "leadership",
      "management",
      "manager",
      "mobile",
      "react native",
      "3d",
      "ios",
      "android",
      "filament",
      "app store",
      "play store",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `As **Team Leader**, Wassim spearheaded two major mobile & multi-platform projects:\n\n` +
          `1. **ZorLife (Wellness & Gamification Mobile App)**:\n` +
          `   - **Role**: Team Leader (coordinating 3 developers & 1 3D designer).\n` +
          `   - **Tech**: React Native, Redux, Hono.js, Cloudflare D1 & Workers, Three.js / react-native-filament 3D, Stripe payments, Firebase tracking.\n` +
          `   - **Deployment**: Published to **App Store** and **Google Play** with live OTA updates.\n\n` +
          `2. **Bloom (Photo Keepsakes Mobile App & Admin Dashboard)**:\n` +
          `   - **Role**: Team Leader.\n` +
          `   - **Tech**: React Native (Mobile), Vue.js (Admin Dashboard), NestJS backend, Python image processing, Expo Notifications, Stripe & Chronopost integrations.\n` +
          `   - **Deployment**: Published to stores, automated via Docker & GitLab CI/CD.`,
        suggestions: [
          "What are his Cloudflare Workers & D1 skills?",
          "What frontend frameworks does he master?",
          "Tell me about his education and degrees",
        ],
      };
    }

    return {
      response:
        `En tant que **Team Leader**, Wassim a dirigé avec succès deux projets mobiles et multi-plateformes majeurs :\n\n` +
        `1. **ZorLife (Application Mobile Bien-être & Gamification)** :\n` +
        `   - **Rôle** : Team Leader (coordination de 3 développeurs et 1 designer 3D).\n` +
        `   - **Technologies** : React Native, Redux, Hono.js, Cloudflare D1 & Workers, 3D (Three.js & react-native-filament), paiements Stripe, Firebase tracking.\n` +
        `   - **Déploiement** : Publication sur **App Store** et **Google Play** et gestion des mises à jour temps réel.\n\n` +
        `2. **Bloom (Application Mobile & Dashboard Administrateur)** :\n` +
        `   - **Rôle** : Team Leader.\n` +
        `   - **Technologies** : React Native (Mobile), Vue.js (Dashboard Admin), NestJS, traitement d'images en Python, notifications Expo, Stripe & Chronopost.\n` +
        `   - **Déploiement** : Publication sur les stores et pipelines GitLab CI/CD.`,
      suggestions: [
        "Quelles sont ses compétences Cloudflare et Hono.js ?",
        "Quels frameworks frontend maîtrise-t-il ?",
        "Quelle est sa formation scolaire ?",
      ],
    };
  }

  // 8. Obydo & Webinarplease / Sastec
  if (
    hasWord(query, [
      "obydo",
      "webinarplease",
      "sastec",
      "webrtc",
      "visio",
      "videoconference",
      "invendus",
      "enchere",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `Additional featured web projects delivered by Wassim:\n\n` +
          `- **Obydo (Web App for Unsold Inventory Management)**: Built with Vue.js, Vuex, Vuetify, Pusher (real-time auctions), and Mongopay payments integration.\n` +
          `- **Webinarplease at Sastec (Video Conferencing Platform)**: Developed interactive UI with React & Redux, real-time interactive polls/chat with Firebase, and WebRTC integration for screen-sharing and audio/video streaming.`,
        suggestions: [
          "What was his instructor experience at GoMyCode?",
          "What are his core technical skills?",
          "How to contact Wassim?",
        ],
      };
    }

    return {
      response:
        `Autres projets web notables développés par Wassim :\n\n` +
        `- **Obydo (Application Web de Gestion des Invendus)** : Développé en Vue.js, Vuex, Vuetify, Pusher (enchères en temps réel) et passerelle de paiement Mongopay.\n` +
        `- **Webinarplease chez Sastec (Application de Visioconférence)** : Interface interactive en React & Redux, chat et sondages temps réel avec Firebase, et intégration WebRTC pour le flux audio/vidéo et le partage d'écran.`,
      suggestions: [
        "Quelle a été son expérience d'instructeur chez GoMyCode ?",
        "Quelles sont ses compétences techniques globales ?",
        "Comment contacter Wassim ?",
      ],
    };
  }

  // 9. GoMyCode / Instructor
  if (
    hasWord(query, [
      "gomycode",
      "instructeur",
      "instructor",
      "enseignant",
      "formateur",
      "pedagogie",
      "mentor",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `From January 2019 to May 2021, Wassim served as a **Full-Stack JS Instructor at GoMyCode**:\n\n` +
          `- Designed and delivered hands-on workshops on HTML, CSS, JavaScript, React, Node.js, and Express.\n` +
          `- Mentored students through practical web architecture and problem-solving exercises.\n` +
          `- Evaluated technical skills and provided personalized constructive feedback.`,
        suggestions: [
          "Tell me about his engineering education at ENIS",
          "What are his projects at TEKAB.DEV?",
          "How to contact him?",
        ],
      };
    }

    return {
      response:
        `De Janvier 2019 à Mai 2021, Wassim a été **Instructeur Full-Stack JS chez GoMyCode** :\n\n` +
        `- Conception et animation d'ateliers interactifs sur HTML, CSS, JavaScript, React, Node.js et Express.\n` +
        `- Encadrement et mentorat technique d'apprenants sur des projets concrets.\n` +
        `- Évaluation des compétences et transmission des bonnes pratiques de développement logiciel.`,
      suggestions: [
        "Quelle est sa formation d'ingénieur à l'ENIS ?",
        "Quels sont ses projets chez TEKAB.DEV ?",
        "Comment le contacter ?",
      ],
    };
  }

  // 10. Education / Degrees / ENIS
  if (
    hasWord(query, [
      "formation",
      "diplome",
      "diplomes",
      "degree",
      "degrees",
      "education",
      "enis",
      "ecole",
      "universite",
      "university",
      "bac",
      "baccalaureat",
      "etudes",
      "fss",
      "prepa",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `**Wassim AHMED's Educational Background**:\n\n` +
          `- **Dec. 2018**: **National Engineering Degree** — *École Nationale d'Ingénieurs de Sfax (ENIS)*\n` +
          `- **June 2015**: **Math-Physics Preparatory Cycle** — *Faculté des Sciences de Sfax (FSS)*\n` +
          `- **June 2012**: **Mathematics Baccalaureate** — *Lycée Agareb 2*\n\n` +
          `This rigorous engineering background provides him with strong problem-solving skills, algorithmic mastery, and software architecture expertise.`,
        suggestions: [
          "What are his key technical skills?",
          "What projects has he led?",
          "Download his official Resume",
        ],
      };
    }

    return {
      response:
        `**Parcours Académique & Diplômes de Wassim AHMED** :\n\n` +
        `- **Décembre 2018** : **Diplôme National d'Ingénieur** — *École Nationale d'Ingénieurs de Sfax (ENIS)*\n` +
        `- **Juin 2015** : **Cycle préparatoire aux études d'ingénieurs (Math-Physique)** — *Faculté des Sciences de Sfax*\n` +
        `- **Juin 2012** : **Baccalauréat en Mathématiques** — *Lycée Agareb 2*\n\n` +
        `Cette solide formation d'ingénieur lui confère une grande rigueur méthodologique, une forte capacité d'abstraction et une maîtrise avancée de l'architecture logicielle.`,
      suggestions: [
        "Quelles sont ses compétences techniques majeures ?",
        "Quels sont ses projets en tant que Team Leader ?",
        "Télécharger son CV officiel",
      ],
    };
  }

  // 11. Skills / Technologies / Stack
  if (
    hasWord(query, [
      "stack",
      "competence",
      "competences",
      "skills",
      "techno",
      "technologies",
      "langage",
      "langages",
      "framework",
      "frameworks",
      "react",
      "next",
      "nextjs",
      "vue",
      "vuejs",
      "nest",
      "nestjs",
      "hono",
      "cloudflare",
      "docker",
      "prisma",
      "postgres",
      "postgresql",
      "tailwind",
      "typescript",
    ])
  ) {
    if (isEn) {
      return {
        response:
          `**Wassim AHMED's Tech Stack & Core Competencies**:\n\n` +
          `- **Frontend & Mobile**: Next.js, React, Vue.js, React Native, Tailwind CSS, Shadcn UI, TypeScript, JavaScript, HTML5/CSS3, SCSS, Redux, Pinia, Three.js.\n` +
          `- **Backend & APIs**: NestJS, Hono.js, Node.js, Express, Prisma (ORM), Python, WebRTC, Pusher, Stripe.\n` +
          `- **Cloud & Serverless**: Cloudflare Workers, Cloudflare R2, Cloudflare D1, Supabase, Firebase.\n` +
          `- **DevOps & Data**: Docker, GitLab CI/CD, PostgreSQL, Git, NPM (devfactory-cli), Jira, Monday.\n` +
          `- **Languages**: French (Advanced), English (Advanced), Arabic (Native).`,
        suggestions: [
          "What AI projects has he built with this stack?",
          "Tell me about his role on ZorLife",
          "How can I contact him?",
        ],
      };
    }

    return {
      response:
        `**Stack Technique & Compétences Clés de Wassim AHMED** :\n\n` +
        `- **Frontend & Mobile** : Next.js, React, Vue.js, React Native, Tailwind CSS, Shadcn UI, TypeScript, JavaScript, HTML5/CSS3, SCSS, Redux, Pinia, Three.js.\n` +
        `- **Backend & APIs** : NestJS, Hono.js, Node.js, Express, Prisma (ORM), Python, WebRTC, Pusher, Stripe.\n` +
        `- **Cloud & Serverless** : Cloudflare Workers, Cloudflare R2, Cloudflare D1, Supabase, Firebase.\n` +
        `- **DevOps & Données** : Docker, GitLab CI/CD, PostgreSQL, Git, NPM (devfactory-cli), Jira, Monday.\n` +
        `- **Langues** : Français (Avancé), Anglais (Avancé), Arabe (Maternelle).`,
      suggestions: [
        "Quels projets IA a-t-il réalisés avec cette stack ?",
        "Parle-moi de son expérience de Team Leader sur ZorLife",
        "Comment le contacter ?",
      ],
    };
  }

  // 12. Default / General Overview
  if (isEn) {
    return {
      response:
        `**Wassim AHMED** is a **Senior Full Stack Developer & Engineering Team Leader** with 5+ years of experience specialized in:\n\n` +
        `1. **Modern Web & Cloud Architecture**: Next.js, NestJS, Hono.js, and Cloudflare Edge (Workers, R2, D1).\n` +
        `2. **AI & Collaborative Systems**: Automated specs generation, custom AI agents, and CLI development.\n` +
        `3. **Mobile & Multi-platform**: React Native apps with 3D elements, in-app purchases (Stripe), and app store deployment (ZorLife, Bloom).\n` +
        `4. **Engineering Leadership**: Coordinating cross-functional teams (developers, 3D designers, POs) and ensuring rigorous delivery.\n\n` +
        `Feel free to ask specific questions about any of his projects, technical stack, or background!`,
      suggestions: [
        "What are his key AI and Cloudflare projects?",
        "Tell me about his experience at TEKAB.DEV",
        "What is his engineering education?",
        "How to contact Wassim?",
      ],
    };
  }

  return {
    response:
      `**Wassim AHMED** est un **Développeur Full Stack Senior & Team Leader** avec plus de 5 ans d'expérience, spécialisé dans :\n\n` +
      `1. **Architectures Web & Cloud Modernes** : Next.js, NestJS, Hono.js et l'écosystème Cloudflare Edge (Workers, R2, D1).\n` +
      `2. **Systèmes IA & Workflows Collaboratifs** : Génération automatisée de spécifications, catalogue d'agents IA et publication d'outils CLI sur NPM.\n` +
      `3. **Applications Mobiles & 3D** : React Native avec éléments 3D (Three.js), paiements Stripe et publication sur les stores (ZorLife, Bloom).\n` +
      `4. **Leadership Technique** : Coordination d'équipes pluridisciplinaires, gestion des livraisons et relation client.\n\n` +
      `Posez-moi une question précise sur l'un de ses projets, ses compétences ou son parcours !`,
    suggestions: [
      "Quels sont ses projets IA et Cloudflare ?",
      "Parle-moi de son rôle de Team Leader sur ZorLife",
      "Quelle est sa formation d'ingénieur ?",
      "Comment contacter Wassim ?",
    ],
  };
}
