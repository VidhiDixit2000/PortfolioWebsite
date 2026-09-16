export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  /** Full bullets, verbatim from the resume — kept for fidelity (and for
   * anything reading the raw source later, e.g. the AI agent). */
  bullets: string[];
  /** Condensed versions of the same bullets, for the website display. */
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "blue-flame-labs",
    role: "Technical Consultant / Software Developer",
    company: "Blue Flame Labs",
    period: "May 2025 – Current",
    bullets: [
      "Designed, developed, tested, and maintained scalable React.js and FastAPI applications following component-based architecture and complete SDLC practices.",
      "Built and maintained backend services using a microservices architecture with FastAPI and Docker, enabling independent deployment, scalability, and clearer separation of concerns across application modules.",
      "Designed and implemented secure RESTful APIs with authentication, authorization, request validation, exception handling, pagination, and third-party API integrations.",
      "Developed reusable React components, custom hooks, and responsive admin dashboards to improve maintainability and user experience.",
      "Designed normalized PostgreSQL database schemas and optimized SQL queries, improving backend performance and efficient high-volume data retrieval.",
      "Containerized frontend and backend services using Docker and supported AWS cloud deployments through GitHub Actions-based CI/CD workflows.",
      "Participated in Agile sprint planning, Git-based version control, pull requests, code reviews, debugging, testing, and production support.",
      "Maintained REST API documentation using Swagger/OpenAPI and followed software engineering best practices for scalable application development.",
      "Owned end-to-end ticket lifecycle — from requirement gathering and business stakeholder discussions through development, testing, deployment, and production support — ensuring delivery stayed aligned with business objectives.",
      "Partnered directly with business stakeholders to translate business processes and requirements into technical specifications, bringing product and process context into sprint planning and technical decisions.",
      "Led end-to-end testing across API and integration layers, identifying performance bottlenecks and driving optimizations that enhanced application responsiveness and reliability.",
    ],
    highlights: [
      "Built scalable React.js + FastAPI applications with a component-based, microservices architecture.",
      "Designed secure RESTful APIs — auth, validation, exception handling, third-party integrations.",
      "Built reusable React components, custom hooks, and responsive admin dashboards.",
      "Designed normalized PostgreSQL schemas and optimized queries for high-volume data.",
      "Containerized services with Docker; deployed to AWS via GitHub Actions CI/CD.",
      "Owned the ticket lifecycle end-to-end, partnering directly with business stakeholders on requirements.",
      "Led API/integration testing, finding and fixing performance bottlenecks.",
    ],
  },
  {
    id: "cloud-synapps",
    role: "Software Developer",
    company: "Cloud Synapps",
    period: "June 2023 – January 2025",
    bullets: [
      "Designed and developed a secure authentication and user management service using FastAPI and Python, implementing JWT-based authentication, role-based access control (RBAC), and password hashing for secure user access.",
      "Built scalable authentication APIs supporting user registration, login, profile management, and centralized identity management across multiple applications.",
      "Implemented secure OTP-based password reset and email verification workflows, improving account recovery reliability and reducing authentication-related support issues by approximately 30%.",
      "Designed modular and reusable API architecture with robust request validation, exception handling, and clean code practices, improving maintainability and reducing development effort for new features.",
      "Optimized API and database performance through efficient query design and backend optimizations, reducing average response time by approximately 25%.",
      "Optimized SOQL queries and handled Governor Limits, improving transaction efficiency.",
      "Collaborated in feature development, debugging, code reviews, testing, and application maintenance while following Agile methodologies, Git-based version control, and REST API best practices.",
      "Managed the complete ticket lifecycle end-to-end, from business requirement discussions and technical analysis through development, QA, deployment, and post-release support, ensuring solutions met real business needs.",
      "Engaged with business teams to understand authentication and identity workflows across client applications, aligning technical architecture with operational and compliance requirements.",
      "Drove end-to-end testing — unit, integration, and regression — for authentication services, proactively identifying performance issues and implementing fixes that improved system reliability.",
      "Took initiative in proposing process and workflow improvements during team discussions, contributing to more predictable sprint delivery.",
    ],
    highlights: [
      "Built a secure authentication/user-management service with FastAPI — JWT auth, RBAC, password hashing.",
      "Built scalable auth APIs for registration, login, and centralized identity across multiple apps.",
      "Added OTP-based password reset and email verification, cutting auth support issues ~30%.",
      "Optimized API and database performance, cutting average response time ~25%.",
      "Optimized SOQL queries and Governor Limits for transaction efficiency.",
      "Owned the ticket lifecycle end-to-end, from requirements through QA, deployment, and support.",
      "Drove unit/integration/regression testing for authentication services.",
    ],
  },
];
