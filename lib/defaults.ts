// Default content used by the seed script and as a fallback before the profile row exists.
// Everything here is editable from the admin panel.

export const defaultProfile = {
  name: "Chirag Dafda",
  title: "Flutter Developer",
  badge: "Flutter Developer",
  headline: "Building Scalable Mobile Apps with",
  headlineHighlight: "Flutter",
  bio: "I'm a Flutter developer helping founders and businesses design, build and launch high-quality iOS and Android apps.",
  about:
    "I build cross-platform mobile apps with Flutter and Dart — from the first wireframe to the App Store and Play Store. I care about clean architecture, smooth performance and code that stays maintainable as the product grows.",
  heroNote: "Real apps built with Flutter",
  heroImageUrl: "",
  avatarUrl: "",
  email: "",
  phone: "+91 8734824736",
  location: "India",
  githubUrl: "https://github.com/chiiirag",
  linkedinUrl: "https://www.linkedin.com/in/chirag-dafda-8ba850204/",
  resumeUrl: "",
  ctaTitle: "Have a Mobile App Idea?",
  ctaText: "I'm open to freelance projects and long-term contracts. Let's discuss how we can bring your idea to life.",
  seoDescription:
    "Chirag Dafda — Flutter developer building scalable, high-quality iOS and Android apps for founders and businesses.",
};

export const defaultStats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Apps Delivered" },
  { value: "100K+", label: "Total Downloads" },
  { value: "4.8", label: "Client Satisfaction" },
];

export const defaultSkills = [
  { name: "Flutter", icon: "flutter", category: "Framework" },
  { name: "Dart", icon: "dart", category: "Language" },
  { name: "Firebase", icon: "firebase", category: "Backend" },
  { name: "Supabase", icon: "supabase", category: "Backend" },
  { name: "API Integration", icon: "lucide:plug", category: "Integration" },
  { name: "Push Notifications", icon: "lucide:bell", category: "Integration" },
  { name: "In-App Purchases", icon: "lucide:shopping-cart", category: "Integration" },
  { name: "Mapbox", icon: "mapbox", category: "Maps" },
  { name: "Google Maps", icon: "googlemaps", category: "Maps" },
  { name: "Stripe", icon: "stripe", category: "Payments" },
  { name: "SQLite", icon: "sqlite", category: "Storage" },
  { name: "CI/CD", icon: "lucide:workflow", category: "DevOps" },
];

export const defaultProjects = [
  {
    title: "CERA",
    slug: "cera",
    category: "Tracking & Field Operations",
    summary: "Background tracking, geofencing, Mapbox, offline support and real-time updates.",
    techStack: ["Flutter", "Mapbox", "Firebase"],
    featured: true,
  },
  {
    title: "Wexo",
    slug: "wexo",
    category: "Food Delivery",
    summary: "On-demand food delivery app with Firebase, real-time tracking and payments.",
    techStack: ["Flutter", "Firebase", "Stripe"],
    featured: true,
  },
  {
    title: "Trim",
    slug: "trim",
    category: "Barber Booking",
    summary: "Search, booking, reminders and payments for salons and barbers.",
    techStack: ["Flutter", "Supabase"],
    featured: true,
  },
  {
    title: "Note AI",
    slug: "note-ai",
    category: "AI Note Taking",
    summary: "AI-powered note taking app with smart summaries and search.",
    techStack: ["Flutter", "OpenAI"],
    featured: true,
  },
];

export const defaultTestimonials = [
  {
    name: "Client",
    role: "Product Founder",
    content:
      "Chirag delivered a high quality Flutter app with great attention to detail. Communication was clear and he was easy to work with throughout the project.",
    rating: 5,
  },
];

export const defaultServices = [
  { title: "End-to-End Development", description: "From idea to App Store & Play Store", icon: "rocket" },
  { title: "Clean & Scalable Code", description: "Maintainable and future-ready apps", icon: "settings" },
  { title: "iOS & Android Expertise", description: "Single codebase with Flutter", icon: "smartphone" },
  { title: "Reliable Long-term Partner", description: "Ongoing development and maintenance", icon: "users" },
];
