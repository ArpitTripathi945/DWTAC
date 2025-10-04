import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import {
  Anchor,
  Building,
  Users,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  Award,
  Clock,
  ArrowUp,
  Star,
  Quote,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Calendar,
  GraduationCap,
  MessageSquare,
  Menu,
  X,
  Target,
  Lightbulb
} from "lucide-react";
import logoImage from "src/logo.png";
import qrImage from "src/qr.png";

type Page =
  | "Home"
  | "Explore"
  | "Jobs"
  | "Course-detail"
  | "About Us"
  | "Contact";

interface Course {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  learnings: string[];
  category: string;
  link: string;
  image: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  status: "open" | "closed";
  postedDate: string;
  description: string;
  requirements: string[];
  qualifications: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "OTHM Qualifications",
    description:
      "OTHM Qualifications is an awarding body in England that is governed by Ofqual. We have a number of qualifications that will allow you to go ahead of the competition.",
    detailedDescription: "OTHM qualifications span various levels, from Level 3 to Level 7, covering areas such as business management, health and safety, leadership, education, and professional development. They are carefully structured to provide practical, career-focused learning that aligns with current industry standards, giving learners a competitive advantage in the global job market. By pursuing OTHM qualifications, learners gain international recognition, enhanced employability, and the opportunity to progress to higher education or professional roles. Each qualification is designed to develop both theoretical understanding and practical skills, ensuring learners can confidently apply their knowledge in real-world scenarios. With OTHM, you are not just learning—you are advancing your career and standing out from the competition.",
    learnings: [
      "Globally Recognized Qualifications",
      "Ofqual-Regulated Certification",
      "Competitive Advantage in Career",
      "Professional Development Opportunities"
    ],
    category: "OTHM",
    link: "https://othm.org.uk/",
    image:
      "https://acorn.works/wp-content/uploads/2022/06/knowledge-in-the-workplace-1024x683-1.jpeg"
  },
  {
    id: 2,
    title: "IOSH Course",
    description:
      "The IOSH course is designed for employees at all levels, aiming to strengthen workplace safety culture. It reflects IOSH’s commitment to sustainable working environments.",
    detailedDescription: "The IOSH course is a globally recognized program designed for employees at all levels, from entry-level staff to senior management, to enhance knowledge and awareness of workplace health and safety. The course focuses on promoting a strong safety culture within organizations, helping participants understand their responsibilities and the best practices for preventing accidents and managing risks effectively. Reflecting IOSH’s commitment to creating sustainable and safe working environments, the course combines practical guidance with real-world scenarios, enabling learners to apply safety principles confidently in their day-to-day roles. On completion, participants gain the skills to contribute to safer workplaces, improve organizational compliance, and foster a proactive approach to health and safety.",
    learnings: [
      "Workplace Safety Awareness",
      "Safety Culture Enhancement",
      "Sustainable Working Practices",
      "Applicable for All Employee Levels"
    ],
    category: "Safety",
    link: "https://iosh.com/",
    image:
      "https://trainingmag.com/wp/wp-content/uploads/2023/06/shutterstock_2223960087.jpg",
  },
  {
    id: 3,
    title: "ESC IDHSE",
    description:
      "The International Diploma in Health and Safety Engineering (IDHSE) is the catalyst qualification of the European Safety Council (ESC) endorsed by Qualifi UK.",
    detailedDescription: "The International Diploma in Health and Safety Engineering (IDHSE) is a flagship qualification offered by the European Safety Council (ESC) and officially endorsed by Qualifi UK. This program is designed to equip professionals with advanced knowledge and skills in health and safety engineering, focusing on the identification, assessment, and management of workplace risks. The IDHSE provides a comprehensive understanding of safety principles, regulatory compliance, and engineering controls, enabling participants to design and implement effective safety systems. By completing this diploma, learners enhance their professional credibility, gain international recognition, and are empowered to lead health and safety initiatives in diverse industries.",
    learnings: [
      "Advanced Health and Safety Knowledge",
      "Engineering Safety Practices",
      "ESC-Endorsed Qualification",
      "Qualifi UK Recognition"
    ],
    category: "Engineering",
    link: "https://europeansafetycouncil.uk/",
    image:
      "https://assets.everspringpartners.com/dims4/default/9233adc/2147483647/strip/true/crop/500x300+0+0/resize/1000x600!/format/webp/quality/90/?url=http%3A%2F%2Feverspring-brightspot.s3.us-east-1.amazonaws.com%2F67%2F74%2F80a536084389b254ce493df1dd79%2Fhealthsafetyengineer.jpg",
  },
  {
    id: 4,
    title: "CME Courses",
    description:
      "The UAE’s Continuing Medical Education program is crucial for enhancing skills and abilities among healthcare workers to ensure quality patient care.",
    detailedDescription: "EBSTAC, provide CME course by DHA (Dubai Health Authority) and HAAD have approved (Health Authority-Abu Dhabi). CME hours are available for all of our healthcare courses. The learning modules determine how many CME credits are issued. CME sessions are available all year to help healthcare professionals improve their knowledge and stay up to date on the newest medical advances. By participating in the CME program, healthcare workers can maintain professional excellence, meet regulatory requirements, and deliver safe, effective, and up-to-date medical services, contributing to a stronger and more efficient healthcare system in the UAE.",
    learnings: [
      "DHA & HAAD Approved CME Courses",
      "Earn CME Credits for Healthcare Training",
      "Year-Round Learning Sessions",
      "Updated Medical Knowledge and Practices"
    ],
    category: "Healthcare",
    link: "",
    image:
      "https://veo.co.uk/wp-content/uploads/2021/04/VEO-clinical-learning-header-1024x683.jpeg",
  },
  {
    id: 5,
    title: "Highfield Courses (HABC)",
    description:
      "Highfield is one of the UK’s leading awarding organizations for vocational qualifications, work-based learning, and apprenticeship qualifications.",
    detailedDescription: "Highfield is one of the UK’s foremost awarding organizations, specializing in vocational qualifications, work-based learning programs, and apprenticeship certifications. Recognized for its commitment to quality and practical learning, Highfield provides a wide range of qualifications that equip learners with the skills and knowledge needed to succeed in their chosen careers. Their programs are designed to meet industry standards, enhance employability, and support professional development across various sectors, ensuring learners gain both theoretical understanding and practical expertise that can be directly applied in the workplace.",
    learnings: [
      "UK-Recognized Vocational Qualifications",
      "Work-Based Learning Opportunities",
      "Apprenticeship Certification",
      "Industry-Relevant Skill Development"
    ],
    category: "Vocational",
    link: "https://www.highfieldqualifications.com/",
    image:
      "https://media.assettype.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticle_images%2F2018%2F06%2F28%2Fvocational-training1530128902.jpg?w=900&auto=format%2Ccompress&fit=max",
  },
  {
    id: 6,
    title: "ASHI Approved Courses",
    description:
      "Basic Life Support training, Advanced Cardiovascular Life Support and Pediatric advanced life support are the course for working professionals.",
    detailedDescription: "ASHI-approved courses are specialized training programs designed for working professionals in healthcare and emergency response. These include Basic Life Support (BLS), Advanced Cardiovascular Life Support (ACLS), and Pediatric Advanced Life Support (PALS), each aimed at equipping participants with essential life-saving skills. These courses focus on practical, hands-on training to handle real-life medical emergencies, improve patient outcomes, and ensure that professionals are confident and competent in delivering critical care across adults and children. Completion of ASHI-approved programs enhances both professional credibility and workplace preparedness.",
    learnings: [
      "Basic Life Support (BLS)",
      "Advanced Cardiovascular Life Support (ACLS)",
      "Pediatric Advanced Life Support (PALS)",
      "Emergency Response Skills for Professionals"
    ],
    category: "Healthcare",
    link: "",
    image:
      "https://nursesgroup.co.uk/assets/images/blog/healthcare-assistant-uk.jpg",
  },
  {
    id: 7,
    title: "ISO Lead Auditor Course",
    description:
      "The ISO Lead Auditor training enables you to develop the necessary expertise to perform a Quality Management System (QMS) audit.",
    detailedDescription: "The ISO Lead Auditor training is designed to equip professionals with the knowledge and skills required to effectively plan, conduct, and lead audits of Quality Management Systems (QMS). The course covers auditing principles, ISO standards, risk-based thinking, and reporting techniques, enabling participants to assess organizational compliance and identify areas for improvement. By completing this training, learners gain the competence to perform audits confidently, contribute to continuous quality improvement, and support organizations in achieving and maintaining ISO certification.",
    learnings: [
      "ISO Lead Auditor Skills",
      "Quality Management System (QMS) Auditing",
      "Audit Planning and Execution",
      "Compliance and Risk Assessment"
    ],
    category: "Business",
    link: "",
    image:
      "https://www.eascertification.com/wp-content/uploads/2024/11/ISO-Lead-Auditor-Training-1024x576.jpg",
  },
  {
    id: 8,
    title: "Competency Certification Trainings",
    description:
      "In today’s Competitive business, leaders are appointed based on credentials, knowledge and experience.",
    detailedDescription: "Competency Certification Training is designed to empower professionals with the skills, knowledge, and recognized credentials needed to excel in today’s competitive business environment. In modern workplaces, leadership and key roles are increasingly awarded based on demonstrated competence, practical expertise, and verified qualifications. This training helps participants enhance their professional capabilities, validate their expertise, and gain a competitive edge, enabling them to take on leadership positions and make informed, effective decisions in their organizations.",
    learnings: [
      "Leadership Credentials",
      "Business Knowledge Enhancement",
      "Professional Experience Development",
      "Competitive Advantage in Leadership"
    ],    
    category: "Business",
    link: "",
    image:
      "https://assets.td.org/m/5cb52beea8883bb7/webimage-Are-You-in-the-Education-or-Training-Business.png",
  },
  {
    id: 9,
    title: "Qualifi Qualifications",
    description:
      "Qualifi is recognised as an Awarding Organisation (AO) by the Office of Qualifications and Examinations Regulation (Ofqual).",
    detailedDescription: "Qualifi is a nationally recognized Awarding Organisation (AO) regulated by the Office of Qualifications and Examinations Regulation (Ofqual) in the UK, ensuring that all its qualifications meet strict standards of quality, credibility, and relevance. It offers a broad portfolio of professional, vocational, and academic programs across multiple levels, from foundational to advanced, designed to equip learners with the knowledge and skills demanded by today’s competitive global workforce. Qualifi qualifications are internationally recognized, providing learners with enhanced career prospects, practical expertise, and opportunities for progression into higher education or specialized professional roles. By pursuing Qualifi certifications, individuals gain validated credentials that not only demonstrate competence but also position them ahead in their chosen fields.",
    learnings: [
      "Ofqual Recognized Awarding Organisation",
      "Regulated Qualifications",
      "Credible Certification",
      "Professional Advancement Opportunities"
    ],
    category: "Qualifi",
    link: "https://qualifi.net/qualifications/",
    image:
      "https://d36i36zeavk0em.cloudfront.net/images/Education-Training.jpeg?v=1716280929",
  },
  {
    id: 10,
    title: "Third Party Health and Safety Training",
    description:
      "Our Safety Trainers and Consultants are highly qualified and capable of delivering the courses successfully and effectively worldwide.",
    detailedDescription: "Our Safety Trainers and Consultants are highly experienced, certified professionals with extensive expertise in occupational health and safety. They are adept at delivering courses effectively, ensuring that participants gain a thorough understanding of safety principles, regulations, and best practices. With a proven track record of training professionals across diverse industries and countries, our trainers combine practical knowledge with interactive learning methods, making complex concepts easy to grasp. Their guidance ensures that learners not only complete the courses successfully but are also fully prepared to apply safety practices confidently in real-world workplace environments worldwide.",
    learnings: [
      "Expert Safety Trainers",
      "Global Course Delivery",
      "Effective Learning Experience",
      "High-Quality Training Standards"
    ],
    category: "Safety",
    link: "",
    image:
      "https://www.joinsafeworkforce.com/wp-content/uploads/2018/07/HS-training-2560x1440-1-1440x1080.jpg",
  },
  {
    id: 11,
    title: "NEBOSH IGC Online Course",
    description:
      "NEBOSH IGC is one of the top notch international safety course which is preferred by global employers from all industrial segments.",
    detailedDescription: "The NEBOSH IGC is widely regarded as the world’s most preferred safety qualification among safety professionals. Recently, NEBOSH revised the IGC syllabus in collaboration with OHS specialists and leading organizations. This updated version aligns with the demands of the digital era and makes it easier to understand essential health and safety concepts and practices. The revised syllabus emphasizes key topics that are vital for ensuring workplace safety. It also features a practical assessment, giving learners hands-on experience in real work environments and helping them apply safety principles effectively. By successfully completing the NEBOSH IGC course, individuals can develop a strong occupational health and safety management plan for their organization, ensuring a safe and healthy workplace.",
    learnings: [
      "Health and Safety Principles",
      "Risk Assessment & Hazard Control",
      "Safety Management Systems",
      "Practical Application"
    ],
    category: "Safety",
    link: "",
    image:
      "https://www.alertmedia.com/wp-content/uploads/2022/10/Blog-Safety-Moment-Ideas.jpg",
  },
  {
    id: 12,
    title: "IEMA Certification",
    description:
      "The IEMA Certificate in Environmental Management will give you in-depth understanding of sustainability and environmental concepts.",
    detailedDescription: "The IEMA Certificate in Environmental Management provides participants with a comprehensive understanding of sustainability, environmental management, and best practices for minimizing environmental impact. The course covers key concepts such as resource efficiency, environmental regulations, and sustainable business strategies, enabling learners to integrate environmental considerations into organizational decision-making. By completing this certification, professionals gain the knowledge and skills to promote sustainable practices, support regulatory compliance, and contribute to creating environmentally responsible and resilient organizations.",
    learnings: [
      "Environmental Management Principles",
      "Sustainability Concepts",
      "Practical Environmental Strategies",
      "In-Depth Industry Knowledge"
    ],    
    category: "Safety",
    link: "",
    image:
      "https://www.khweza.net/wp-content/uploads/2017/04/IMG_20180517_143229-e1560816614531-800x600.jpg",
  },
  {
    id: 13,
    title: "Distance Education Programs",
    description:
      "Earn a Degree Online from a Top-Rated University and Boost Your Career. We are providing US, UK, Indian Universities degrees.",
    detailedDescription: "We offer fully recognized degree programs from leading universities in the US, UK, and India, allowing you to gain world-class education from the comfort of your home. Our online degrees are designed to provide flexibility, quality learning, and practical knowledge that can be immediately applied in your professional life. By enrolling, you can enhance your qualifications, expand your career opportunities, and achieve your personal and professional goals without the need to relocate or disrupt your current commitments.",
    learnings: [
      "Online Degree Programs",
      "Top-Rated University Accreditation",
      "Global University Options (US, UK, India)",
      "Career Advancement Opportunities"
    ],
    category: "Degree",
    link: "",
    image:
      "https://www.acc.edu.in/wp-content/uploads/2024/12/Artboard-1.png",
  },
  
];

const jobs: Job[] = [
  {
    id: 1,
    title: "Safety Training Coordinator",
    company: "DWTAC Trainer and Consultant",
    type: "Full-time",
    status: "closed",
    postedDate: "2025-01-10",
    description: "Coordinate and deliver safety training programs for offshore personnel. Ensure compliance with international safety standards and regulations.",
    requirements: [
      "5+ years in offshore safety training",
      "NEBOSH or equivalent safety certification",
      "Experience with OPITO standards",
      "Excellent presentation skills",
      "EU work authorization required"
    ],
    qualifications: [
      "Degree in Occupational Health & Safety or related field",
      "Knowledge of HSE regulations",
      "First Aid and CPR certification",
      "Experience with e-learning platforms"
    ],
  },
  {
    id: 2,
    title: "Subsea Operations Specialist",
    company: "DWTAC Trainer and Consultant",
    type: "Contract",
    status: "closed",
    postedDate: "2025-01-20",
    description: "Provide specialized training on subsea equipment operations and maintenance. Support client projects with technical expertise in deep water operations.",
    requirements: [
      "8+ years in subsea operations",
      "ROV operations certification",
      "Deep water project experience",
      "Norwegian language skills preferred",
      "Valid offshore medical certificate"
    ],
    qualifications: [
      "Marine Engineering or related technical degree",
      "Subsea equipment certification",
      "Project management experience",
      "Knowledge of DNV-GL standards"
    ],
  },
  {
    id: 3,
    title: "Training Program Manager",
    company: "DWTAC Trainer and Consultant",
    type: "Full-time",
    status: "closed",
    postedDate: "2025-04-20",
    description: "Manage training program development and delivery across Asia-Pacific region. Lead cross-functional teams and maintain client relationships.",
    requirements: [
      "7+ years in training management",
      "Oil & gas industry experience",
      "Team leadership experience",
      "Regional travel required",
      "Singapore work permit eligible"
    ],
    qualifications: [
      "Master's degree in Business or Engineering",
      "PMP certification preferred",
      "Multicultural team management experience",
      "Fluency in English and Mandarin"
    ],
  },
  {
    id: 4,
    title: "Digital Learning Developer",
    company: "DWTAC Trainer and Consultant",
    type: "Full-time",
    status: "closed",
    postedDate: "2025-06-18",
    description: "Develop and maintain digital training platforms and e-learning content. Create interactive training modules and support virtual learning initiatives.",
    requirements: [
      "3+ years in e-learning development",
      "Experience with LMS platforms",
      "Knowledge of multimedia production",
      "Strong technical skills",
      "Remote work experience"
    ],
    qualifications: [
      "Bachelor's degree in IT, Education Technology, or related field",
      "Proficiency in authoring tools (Articulate, Captivate, etc.)",
      "Video production and editing skills",
      "Understanding of adult learning principles"
    ],
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    position: "Operations Manager",
    company: "DeepSea Dynamics",
    content:
      "DWTAC's training programs are exceptional. Their deep water drilling course gave our team the confidence and skills needed for our most challenging offshore projects.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    position: "Safety Director",
    company: "Atlantic Energy Corp",
    content:
      "The safety training at DWTAC is world-class. Their practical approach and expert instructors have significantly improved our safety protocols.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    position: "Technical Lead",
    company: "Offshore Solutions Ltd",
    content:
      "DWTAC's subsea equipment training was comprehensive and hands-on. The knowledge gained has been invaluable for our underwater operations.",
    rating: 5,
  },
];

// Floating Bubbles Animation Component
// function FloatingBubbles() {
//   const bubbles = Array.from({ length: 10 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 25 + 15,
//     delay: Math.random() * 8,
//     duration: Math.random() * 15 + 12,
//     left: Math.random() * 100,
//   }));

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
//       {bubbles.map((bubble) => (
//         <motion.div
//           key={bubble.id}
//           className="absolute rounded-full border border-cyan-400/20"
//           style={{
//             width: bubble.size,
//             height: bubble.size,
//             left: `${bubble.left}%`,
//             bottom: "-100px",
//             background: `radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.1))`,
//             backdropFilter: "blur(1px)",
//           }}
//           animate={{
//             y: [-100, -window.innerHeight - 200],
//             x: [0, Math.sin(bubble.id) * 150],
//             opacity: [0, 0.8, 0.8, 0],
//             scale: [0.3, 1, 1, 0.2],
//           }}
//           transition={{
//             duration: bubble.duration,
//             delay: bubble.delay,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// // Animated Wave Background
// function WaveBackground() {
//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//       <motion.div
//         className="absolute inset-0 opacity-5"
//         style={{
//           background: `
//             radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%),
//             radial-gradient(circle at 80% 20%, blue 0%, transparent 50%),
//             radial-gradient(circle at 40% 80%, teal 0%, transparent 50%)
//           `,
//         }}
//         animate={{
//           scale: [1, 1.1, 1],
//           rotate: [0, 2, 0],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Animated gradient waves */}
//       <motion.div
//         className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
//         style={{
//           background: `linear-gradient(180deg, 
//             transparent 0%, 
//             rgba(6, 182, 212, 0.1) 50%, 
//             rgba(59, 130, 246, 0.2) 100%)`,
//         }}
//         animate={{
//           scaleY: [1, 1.2, 1],
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </div>
//   );
// }

// Scroll to Top Button
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () =>
      window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all ${
        isVisible ? "block" : "hidden"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
      }}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
}

function Header({
  currentPage,
  setCurrentPage,
}: {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8 md:space-x-12">
            <motion.div
              className="flex items-center space-x-2"
              onClick={() => setCurrentPage("Home")}
              style={{ cursor: "pointer" }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden">
                <img
                  src={logoImage}
                  alt="DWTAC Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-base md:text-lg text-white">DWTAC</h1>
                <p className="text-xs text-slate-300 hidden sm:block">
                  DeepWater Trainer & Consultant
                </p>
              </div>
            </motion.div>

            <nav className="hidden lg:flex space-x-8">
              {(
                ["Home", "Explore", "Jobs", "About Us", "Contact"] as const
              ).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`capitalize transition-colors relative text-sm ${
                    currentPage === page
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page === "Home"
                    ? "Home"
                    : page.replace("-", " ")}
                  {currentPage === page && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Desktop Contact Information */}
          <div className="hidden lg:flex items-center space-x-6">
            <motion.a
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9151315870</span>
            </motion.a>
            <motion.a
              className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4" />
              <span>Write info@deepwatertac.com</span>
            </motion.a>
          </div>

          {/* Mobile Contact Icons and Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            
            <motion.button
              onClick={toggleMobileMenu}
              className="text-slate-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="pt-4 pb-2 border-t border-slate-700/50 mt-4">
            <nav className="flex flex-col space-y-3">
              {(
                ["Home", "Explore", "Jobs", "About Us", "Contact"] as const
              ).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? "text-cyan-400 bg-slate-800/50"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: page === "Home" ? 0 : 0.1 }}
                >
                  {page === "Home"
                    ? "Home"
                    : page.replace("-", " ")}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
              <motion.a
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-800/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 9151315870</span>
              </motion.a>
              <motion.a
                href="mailto:info@rst-global.com"
                className="flex items-center space-x-3 px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-800/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@deepwatertac.com</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

function Footer({
  setCurrentPage,
}: {
  setCurrentPage: (page: Page) => void;
}) {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src={logoImage}
                  alt="DWTAC Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white text-lg">DWTAC</h3>
                <p className="text-xs text-slate-400">
                  DeepWater Trainer and Consultant
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
            DWTAC is a global training and consultancy leader, 
            delivering high-impact programs for Business, Technology, Healthcare and Engineering, 
            built on UK and US regulatory standards.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com/YourPage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://x.com/deep_train88423"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://instagram.com/YourProfile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Explore", "Jobs", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <motion.button
                      onClick={() =>
                        setCurrentPage(
                          link
                            .toLowerCase()
                            .replace(" ", "-") as Page,
                        )
                      }
                      className="text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Training Categories */}
          <div>
            <h4 className="text-white text-lg mb-4">
              Training Categories
            </h4>
            <ul className="space-y-3">
              {[
                "Business",
                "Healthcare",
                "Engineering",
                "Technology",
              ].map((category) => (
                <li key={category}>
                  <motion.a
                    href="#"
                    className="text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {category}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg mb-4">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  Tower B3, Near Omaxe Hazratganj
                  <br />
                  Lucknow, UP 226002
                  <br />
                  India
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  +91 9151315870
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  info@deepwatertac.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 DWTAC - Deep Water Trainer and Consultant.
            All rights reserved.
          </p>
        </div>
      </div>

      {/* Animated wave at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </footer>
  );
}

function HomePage({
  setCurrentPage,
}: {
  setCurrentPage: (page: Page) => void;
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://www.tranter.com/hubfs/A-projects-engineers.jpg"
            alt="Offshore oil rig"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        <motion.div
          className="relative z-20 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Empowering Industries
            <motion.span
              className="block text-cyan-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Elevating Standards
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            DWTAC is a global training and consultancy leader, 
            delivering high-impact programs for Business, Technology, Healthcare and Engineering, 
            built on UK and US regulatory standards.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => setCurrentPage("Explore")}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-3"
              >
                Start Learning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => setCurrentPage("About Us")}
                className="border-cyan-400 text-cyan-400 text-lg px-8 py-3"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Compact Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              {
                icon: Award,
                number: "ISO:9001",
                label: "Certified",
              },
              { icon: Users, number: "01k+", label: "Trained" },
              {
                icon: Globe,
                number: "05+",
                label: "Countries",
              },
              { icon: Clock, number: "10+", label: "Years" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.6 + index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-400/10">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-slate-700/50 rounded-lg mb-3 group-hover:bg-slate-600/50 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-xl text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-white mb-4">
              Why Choose DWTAC?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Leading the industry with comprehensive training
              programs designed for the modern offshore
              professional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Global Expertise",
                description:
                  "Worldwide training facilities with experience across all major offshore regions and operations.",
              },
              {
                icon: Users,
                title: "Expert Instructors",
                description:
                  "Industry veterans with decades of hands-on experience in offshore operations and safety protocols.",
              },
              {
                icon: Anchor,
                title: "High Quality Training",
                description:
                  "Specialized training for extreme operations, technology, and healthcare techniques.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-slate-700/50 border-slate-600 h-full">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Hear from industry professionals who have
              experienced our world-class training programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Quote className="w-8 h-8 text-cyan-400/30" />
                  </div>
                  <CardHeader>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">
                        {testimonial.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ),
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 italic">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ExplorePage({
  setCurrentPage,
  setSelectedCourse,
}: {
  setCurrentPage: (page: Page) => void;
  setSelectedCourse: (course: Course) => void;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");
  const categories = [
    "All",
    "OTHM",
    "Qualifi",
    "Safety",
    "Engineering",
    "Healthcare",
    "Vocational",
    "Business",
    "Degree"
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter(
          (course) => course.category === selectedCategory,
        );

  return (
    <div className="min-h-screen bg-slate-900 py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-white mb-4">
            Training Courses
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive training programs for offshore and
            deep water operations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={
                  selectedCategory === category
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                    : "border-slate-600 text-slate-300 hover:text-white hover:border-slate-400"
                }
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:shadow-xl transition-all">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    >
                      {course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setSelectedCourse(course)}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        View Details
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage("Contact")
                        }
                        className="w-full border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400"
                      >
                        Price on Request
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobsPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredJobs = (statusFilter === "All" 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter.toLowerCase())).slice().reverse();

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-white mb-4">Career Opportunities</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Join our team of experts and help shape the future of offshore training
          </p>
        </motion.div>

        {/* Status Filter */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["All", "Open", "Closed"].map((status) => (
            <motion.div
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={statusFilter === status ? "default" : "outline"}
                onClick={() => setStatusFilter(status)}
                className={
                  statusFilter === status
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                    : "border-slate-600 text-slate-300 hover:text-white hover:border-slate-400"
                }
              >
                {status}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{job.title}</h3>
                        <Badge
                          variant={job.status === "open" ? "default" : "secondary"}
                          className={
                            job.status === "open"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-cyan-400 mb-1">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        {/* <div className="flex items-center gap-1">
                          <LocationIcon className="w-4 h-4" />
                          {job.location}
                        </div> */}
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        {/* <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div> */}
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleJobExpansion(job.id)}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400"
                    >
                      {expandedJob === job.id ? (
                        <>
                          Less Details <ChevronUp className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          More Details <ChevronDown className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-slate-300 mb-4">{job.description}</p>

                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 pt-6 border-t border-slate-700"
                    >
                      <div>
                        <h4 className="text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-cyan-400" />
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-white mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-cyan-400" />
                          Qualifications
                        </h4>
                        <ul className="space-y-2">
                          {job.qualifications.map((qual, idx) => (
                            <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                              {qual}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {job.status === "open" && (
                        <div className="flex gap-4 pt-4">
                          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                            Apply Now
                          </Button>
                          <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400">
                            Save Job
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No jobs found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CourseDetailPage({
  course,
  setCurrentPage,
}: {
  course: Course | null;
  setCurrentPage: (page: Page) => void;
}) {
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">
            Course not found
          </h1>
          <Button onClick={() => setCurrentPage("Explore")}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            onClick={() => setCurrentPage("Explore")}
            variant="outline"
            className="mb-8 border-slate-600 text-slate-300 hover:text-white"
          >
            ← Back to Courses
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <ImageWithFallback
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  {course.category}
                </Badge>
                
              </div>
              <h1 className="text-3xl text-white">
                {course.title}
              </h1>
              <p className="text-lg text-slate-300">
                {course.description}
              </p>
              <p className="text-lg text-slate-300">
                {course.detailedDescription}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div className="flex justify-between">
                  <span className="text-slate-400">
                    Duration:
                  </span>
                  <span className="text-white">
                    {course.duration}
                  </span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span className="text-slate-400">Level:</span>
                  <span className="text-white">
                    {course.level}
                  </span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Category:
                  </span>
                  <span className="text-white">
                    {course.category}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <span className="text-slate-400">
                    Pricing:
                  </span>
                  <span className="text-lg text-cyan-400">
                    Contact for Details
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  What You'll Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.learnings.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-slate-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                      }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => setCurrentPage("Contact")}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  Contact for More Details
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {course.link && (
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:text-white"
                    onClick={() =>
                      window.open(course.link, "_blank", "noopener,noreferrer")
                    }
                  >
                    Read More
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                )}

              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-20 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-white mb-6">
            About DWTAC
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Leading global provider of specialized onshore and offshore and training solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div>
            
            <p className="text-lg text-slate-300 mb-6">
            DWTAC stands at the forefront of global training and consultancy, 
            delivering high-impact education programs tailored 
            to the most demanding sectors—offshore Business, Technology, Healthcare and Engineering. 
            With a foundation rooted in UK and US regulatory excellence, 
            our frameworks integrate internationally recognized standards .
            </p>
            <p className="text-lg text-slate-300 mb-6">
              As a global onshore and offshore training
              provider, we understand the unique demands of deep
              water environments and the critical importance of
              safety, precision, and expertise in every
              operation.
            </p>
          </div>
          <motion.div
            className="aspect-square overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1646750344173-b895be6d4e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBwbGF0Zm9ybSUyMHN1bnNldHxlbnwxfHx8fDE3NTYyNjk3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Oil platform at sunset"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: "Our Mission",
              description:
                "Empowering industries with world-class training that ensures safety, precision, and operational excellence.",
            },
            {
              icon: Lightbulb,
              title: "Our Vision",
              description:
                "To be the global benchmark in onshore and offshore training, setting standards that elevate industries worldwide.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-slate-800/30 rounded-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl text-white mb-4">
            Industry Recognition
          </h3>
          <p className="text-lg text-slate-300 mb-6">
            DWTAC is recognized by leading oil and gas companies
            worldwide for our commitment to safety, quality, and
            innovation in offshore training solutions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "05+", label: "Countries Served" },
              {
                number: "1k+",
                label: "Trained Professionals",
              },
              { number: "20+", label: "Training Programs" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl text-cyan-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get in touch with our training specialists to
            discuss your training needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Card className="bg-slate-800/50 border-slate-700 max-w-md w-full">
              
              <CardContent className="flex flex-col items-center space-y-6">
              <CardHeader className="text-center">
                <CardTitle className="text-white flex items-center justify-center gap-2 mb-2">
                  <MessageSquare className="w-6 h-6 text-cyan-400" />
                  Chat with Business Associate
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Scan the QR code below to start a direct conversation with our business team
                </CardDescription>
              </CardHeader>
              <div className="rounded overflow-hidden">
                <img
                  src={qrImage}
                  alt="DWTAC Logo"
                  className="w-full h-full object-cover rounded"
                /> 
              </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-slate-300">
                    Use your smartphone camera or QR code reader
                  </p>
                  <p className="text-xs text-slate-400">
                    Available 24/7 for immediate assistance
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    content: [
                      "info@deepwatertac.com",
                    ],
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: [
                      "+91 9151315870",
                    ],
                  },
                  {
                    icon: MapPin,
                    title: "Headquarters",
                    content: [
                      "Tower B3, Near Omaxe Hazratganj",
                      "Lucknow, UP 226002",
                      "India",
                    ],
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                  >
                    <contact.icon className="w-6 h-6 text-cyan-400 mt-1" />
                    <div>
                      <h4 className="text-white mb-1">
                        {contact.title}
                      </h4>
                      {contact.content.map((line, i) => (
                        <p key={i} className="text-slate-300">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Why Use Our Chat Service?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Instant response from our experts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Share documents and requirements easily</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Get personalized training recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Schedule consultations directly</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Home");
  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  // URL routing functions
  const getPageFromURL = (): Page => {
    const path = window.location.pathname;
    const routes: Record<string, Page> = {
      '/': 'Home',
      '/home': 'Home',
      '/explore': 'Explore',
      '/jobs': 'Jobs',
      '/about': 'About Us',
      '/contact': 'Contact',
      '/course-detail': 'Course-detail'
    };
    
    return routes[path] || 'home';
  };

  const updateURL = (page: Page) => {
    const routes: Record<Page, string> = {
      'Home': '/',
      'Explore': '/explore',
      'Jobs': '/jobs',
      'About Us': '/about',
      'Contact': '/contact',
      'Course-detail': '/course-detail'
    };
    
    const url = routes[page] || '/';
    if (window.location.pathname !== url) {
      window.history.pushState(null, '', url);
    }
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    updateURL(page);
  };

  const navigateToCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    navigateToPage('Course-detail');
  };

  // Handle initial page load & redirect from 404.html
  useEffect(() => {
    const redirectedPath = sessionStorage.getItem('redirectPath');
    if (redirectedPath) {
      sessionStorage.removeItem('redirectPath');
      window.history.replaceState(null, '', redirectedPath);
      const initialPage = getPageFromURL();
      setCurrentPage(initialPage);
    } else {
      const initialPage = getPageFromURL();
      setCurrentPage(initialPage);
    }
  }, []);

  //Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromURL();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomePage setCurrentPage={navigateToPage} />;
      case "Explore":
        return (
          <ExplorePage
            setCurrentPage={navigateToPage}
            setSelectedCourse={navigateToCourseDetail}
          />
        );
      case "Jobs":
        return <JobsPage />;
      case "Course-detail":
        return (
          <CourseDetailPage
            course={selectedCourse}
            setCurrentPage={navigateToPage}
          />
        );
      case "About Us":
        return <AboutPage />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 dark relative">
      {/* Background Effects */}
      {/* <FloatingBubbles />
      <WaveBackground /> */}

      {/* Main Content */}
      <Header
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
      />
      {renderPage()}
      <Footer setCurrentPage={navigateToPage} />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}