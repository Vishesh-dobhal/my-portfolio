import './App.css'
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Code, Cloud, ShoppingCart, Github, Linkedin, Mail, Menu, X, ChevronDown, ExternalLink } from "lucide-react"
//import Image from "next/image"
import { ThemeToggle } from "./components/theme-toggle"
import { CustomCursor } from "./components/custom-cursor"
import { ParticleBackground } from "./components/particle-background"
import { AnimatedText } from "./components/animated-text"
import { Card3D } from "./components/card-3d"
import { ScrollProgress } from "./components/scroll-progress"
import { useTheme } from "next-themes"
import axios from "axios";

  function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme()
    console.log(theme);
  // Refs for parallax sections
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)

  // Scroll animations
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const handleActions = async (e) => {
    e.preventDefault()
    setIsOpen(true)
   setTimeout(() => setIsOpen(false), 2000);
    try {
      await axios.post(
        "https://nodemail-smtp-configuration.vercel.app/send-email",
        {
          email: "vasudobhal1234@gmail.com",
          subject: "emailSubject",
          content: "emailContent",
        }
      );

    } catch (error) {
      console.error("Error updating candidate status or sending email:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }

      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  // Project data
  const projects = [
    {
      title: "Student Management",
      description: `A modern web application built with Next.js for managing student records efficiently. It allows users to add, edit, view, and delete student details through a clean and responsive dashboard. Designed for simplicity and performance, this app helps schools or institutions organize student data seamlessly.`,
      technologies: [
        "Next.js",
        "Tailwind css",
        "Clerk Auth",
      ],
      image: "https://github.com/Vishesh-dobhal/my-portfolio/blob/main/src/assets/student%20mangement.png",
      liveLink: "https://student-management-app-beige.vercel.app/",
      githubLink: "https://github.com/Vishesh-dobhal/student-management-app",
    },
    {
      title: "Hiring Portal",
      description: `The Hiring Portal is a modern and efficient job recruitment platform designed to streamline the hiring process for both
                employers and job seekers. Built with a robust frontend running on ES6+ features and a scalable backend, this platform
                offers an intuitive UX.`,
      technologies: ["React", "Tailwind Css", "Node.js", "Responsive Design"],
      image:
        "https://github.com/Vishesh-dobhal/my-portfolio/blob/main/src/assets/hiring%20portal.png?raw=true",
      liveLink: "https://hiring-portal-app.vercel.app/",
      githubLink: "https://github.com/Vishesh-dobhal/hiring-portal",
    },
    {
      title: "Weather forecast",
      description: `The Weather App is a sleek and user-friendly application that provides real-time weather updates, forecasts, and alerts
                            to help users plan their day effectively. Whether checking for rain before heading out or monitoring extreme weather.`,
      image:
        "https://github.com/Vishesh-dobhal/my-portfolio/blob/main/src/assets/weather.png?raw=true",
      technologies: ["React", "Node.js", "Express"],
      liveLink: "https://weathe-r-app.netlify.app/",
      githubLink: "https://github.com/Vishesh-dobhal/Weather-App",
    },
    {
      title: "Text Edits",
      description: ` Are you tired of battling with complex text editors that feel more like obstacles than tools? Say
                            goodbye to frustration
                            and hello to efficiency with TextEdits, the ultimate text editing app designed to streamline your
                            writing process like
                            never before.`,
      image:
        "https://github.com/Vishesh-dobhal/my-portfolio/blob/main/src/assets/TextEDITS1.png?raw=true",
      technologies: ["React", "Tailwind Css"],
      liveLink: "https://text-edits.netlify.app/",
      githubLink: "https://github.com/Vishesh-dobhal/TextEdits",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ParticleBackground />
      <ScrollProgress />
      {/* modal */}
      {isOpen ? (
        <div
          id="successModal"
          tabindex="-1"
          aria-hidden="true"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Success</span>
              </div>
              <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Successfully form submitted.
              </p>
              <button
                data-modal-toggle="successModal"
                type="button"
                class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-foreground"
          >
            Vishesh<span className="text-primary">Dobhal</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize font-medium transition-colors ${
                  activeSection === item
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize font-medium py-2 transition-colors ${
                        activeSection === item
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-28 pb-20 md:pt-40 md:pb-32 relative overflow-hidden"
        ref={heroRef}
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <AnimatedText
                text="Hi, I'm Vishesh Dobhal"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
              />
              <AnimatedText
                text="Full Stack Developer"
                className="text-2xl md:text-3xl text-muted-foreground mb-6"
                delay={0.2}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground mb-8 max-w-lg"
              >
                I build modern web applications with React, Node.js, and
                MongoDB. Passionate about creating clean, efficient, and
                user-friendly solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex space-x-4"
              >
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors duration-300 flex items-center"
                >
                  Contact Me
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  View Projects
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card" ref={aboutRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="About Me"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            />
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur-lg"></div>
                <img
                  src="https://github.com/Vishesh-dobhal/my-portfolio/blob/main/src/assets/software-dev.png?raw=true"
                  alt="About Vasu Dobal"
                  width={500}
                  height={400}
                  className="rounded-lg relative"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2 md:pl-12"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Who I Am
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm a passionate Full Stack Developer with expertise in building
                modern web applications. With a strong foundation in both
                frontend and backend technologies, I create seamless,
                responsive, and user-friendly digital experiences.
              </p>
              <p className="text-muted-foreground mb-6">
                My journey in web development started with a curiosity about how
                things work on the internet. That curiosity evolved into a
                career where I get to solve problems and build solutions every
                day.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground">Name:</p>
                  <p className="text-muted-foreground">Vishesh Dobhal</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Email:</p>
                  <p className="text-muted-foreground">
                    vaishdobhal122@gmail.com
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">From:</p>
                  <p className="text-muted-foreground">India</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Experience:</p>
                  <p className="text-muted-foreground">
                    Full Stack Development
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background" ref={skillsRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="My Skills"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            />
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Frontend Development",
                icon: <Code className="h-10 w-10 text-primary" />,
                skills: [
                  "React",
                  "JavaScript",
                  "HTML5",
                  "CSS3",
                  "Tailwind CSS",
                  "Responsive Design",
                ],
              },
              {
                name: "Backend Development",
                icon: <Cloud className="h-10 w-10 text-primary" />,
                skills: [
                  "Node.js",
                  "Express.js",
                  "RESTful APIs",
                  "Authentication",
                  "Authorization",
                ],
              },
              {
                name: "Database",
                icon: <ShoppingCart className="h-10 w-10 text-primary" />,
                skills: ["MongoDB", "Mongoose", "CRUD Operations"],
              },
              {
                name: "Tools & Deployment",
                icon: <Github className="h-10 w-10 text-primary" />,
                skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify"],
              },
              {
                name: "UI/UX Design",
                icon: <ExternalLink className="h-10 w-10 text-primary" />,
                skills: ["Figma", "User Experience"],
              },
              {
                name: "Other Skills",
                icon: <Code className="h-10 w-10 text-primary" />,
                skills: [
                  "Problem Solving",
                  "Team Collaboration",
                  "Project Management",
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-bold text-foreground ml-3">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span className="text-muted-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-card" ref={projectsRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="My Projects"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            />
            <div className="w-20 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Here are some of my recent projects. Each project represents my
              skills and expertise in different areas of web development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card3D key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="Get In Touch"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            />
            <div className="w-20 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to reach out!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2 bg-card p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-medium text-foreground">
                      Email
                    </h4>
                    <p className="text-muted-foreground">
                      vaishdobhal122@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Linkedin className="h-6 w-6 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-medium text-foreground">
                      LinkedIn
                    </h4>
                    <p className="text-muted-foreground">
                      linkedin.com/in/vishesh-dobhal-135170278
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Github className="h-6 w-6 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="text-lg font-medium text-foreground">
                      GitHub
                    </h4>
                    <p className="text-muted-foreground">
                      github.com/Vishesh-dobhal
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:w-1/2 bg-card p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Send Me a Message
              </h3>
              <form onSubmit={handleActions} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors duration-300 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">
                Vishesh<span className="text-primary">Dobhal</span>
              </h3>
              <p className="text-muted-foreground mt-2">Full Stack Developer</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Vishesh-dobhal"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/vishesh-dobhal-135170278"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground text-sm">
            <p>
              &copy; {new Date().getFullYear()} Vishesh Dobhal. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}



export default App
