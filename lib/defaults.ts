// Default content used by the seed script and as a fallback before the profile row exists.
// Everything here is editable from the admin panel.

export const defaultProfile = {
  name: "Chirag Dafda",
  title: "Senior Flutter Developer",
  badge: "Senior Flutter Developer",
  headline: "Building Production-Ready Mobile Apps with",
  headlineHighlight: "Flutter",
  bio: "I'm a Senior Flutter Developer with 5+ years of experience turning ideas and designs into production-ready iOS and Android apps — with clean architecture, smooth UI and code that survives production.",
  about: `You bring the idea. I'll bring the Flutter. ☕️

I'm a Senior Flutter Developer with 5+ years of experience turning ideas, designs, and sometimes "this should be a simple feature" requests into production-ready mobile apps.

I mainly work with Flutter & Dart, building for both iOS and Android with a focus on clean architecture, maintainable code, smooth UI, and apps that actually survive production.

Over the years, I've worked with:
• Firebase, REST APIs & authentication
• BLoC / Provider & clean architecture
• Mapbox, maps & location tracking
• Push notifications & real-time features
• Payments & third-party SDKs
• AWS & Supabase
• App Store / Play Store releases
• Performance improvements, debugging & production fixes

I'm comfortable joining at any stage:
• Starting a product from scratch
• Taking over an existing Flutter codebase
• Building new features
• Fixing the "it works on my machine" problems
• Getting an app ready for release

Available for remote full-time roles, hourly work and contract projects. If you have a Flutter product that needs to be built, fixed, improved, or shipped, let's talk.

And yes, I do read the whole ticket before asking, "Have you tried restarting it?" 😄`,
  heroNote: "You bring the idea. I'll bring the Flutter.",
  heroImageUrl: "",
  avatarUrl: "",
  email: "",
  phone: "+91 8734824736",
  location: "Surat, Gujarat, India",
  githubUrl: "https://github.com/chiiirag",
  linkedinUrl: "https://www.linkedin.com/in/chirag-dafda-8ba850204/",
  resumeUrl: "",
  ctaTitle: "Have a Flutter app to build, fix or ship?",
  ctaText: "Open to remote full-time roles, hourly work and contract projects. Tell me about your app and let's get it to production.",
  seoDescription:
    "Chirag Dafda — Senior Flutter Developer in Surat, India with 5+ years building production-ready iOS & Android apps. Clean architecture, Firebase, BLoC. Open to remote, hourly & contract work.",
};

export const defaultStats = [
  { value: "5+", label: "Years with Flutter" },
  { value: "3", label: "Companies Worked With" },
  { value: "2", label: "Platforms, One Codebase" },
  { value: "Remote", label: "Hourly & Contract" },
];

export const defaultSkills = [
  { name: "Flutter", icon: "flutter", category: "Framework" },
  { name: "Dart", icon: "dart", category: "Language" },
  { name: "BLoC / Provider", icon: "lucide:layers", category: "State Management" },
  { name: "Clean Architecture", icon: "lucide:code", category: "Architecture" },
  { name: "Firebase", icon: "firebase", category: "Backend" },
  { name: "Supabase", icon: "supabase", category: "Backend" },
  { name: "AWS", icon: "lucide:cloud", category: "Backend" },
  { name: "REST APIs & Auth", icon: "lucide:plug", category: "Integration" },
  { name: "Mapbox", icon: "mapbox", category: "Maps & Location" },
  { name: "Google Maps", icon: "googlemaps", category: "Maps & Location" },
  { name: "Location Tracking", icon: "lucide:map-pin", category: "Maps & Location" },
  { name: "Push Notifications", icon: "lucide:bell", category: "Real-time" },
  { name: "Real-time Features", icon: "lucide:zap", category: "Real-time" },
  { name: "Payments & SDKs", icon: "lucide:credit-card", category: "Integration" },
  { name: "App Store", icon: "appstore", category: "Release" },
  { name: "Google Play", icon: "googleplay", category: "Release" },
  { name: "Performance & Debugging", icon: "lucide:gauge", category: "Quality" },
  { name: "Git & GitHub", icon: "github", category: "Tools" },
];

export const defaultProjects = [
  {
    title: "RW Rain Reminder",
    slug: "rw-rain-reminder",
    category: "Weather & Smart Reminders",
    summary:
      "Cross-platform weather app with real-time forecasts and smart rain reminders that tell you to carry an umbrella before it rains.",
    description: `A cross-platform weather application that provides real-time weather forecasts and intelligent rain reminders, helping users stay prepared for changing weather conditions.

• Built with Flutter for Android and iOS
• Integrated real-time weather APIs for current conditions and 7-day forecasts
• Customisable rain reminder notifications based on the forecast
• Multi-location weather tracking with location search and GPS support
• Responsive, user-friendly UI with weather infographics
• Push and local notifications for weather alerts
• Optimised performance and state management for a smooth experience
• Worked with backend APIs to keep data reliably in sync

The app shows live weather, hourly forecasts and precipitation probability, plus smart reminders that notify users to carry an umbrella before expected rainfall.`,
    techStack: ["Flutter", "Dart", "Weather APIs", "Push Notifications", "Local Notifications", "GPS"],
    playStoreUrl: "https://play.google.com/store/search?q=R%20W%20rain%20reminder&c=apps&hl=en_IN",
    featured: true,
  },
  {
    title: "Aternit Studio Website",
    slug: "aternit-website",
    category: "Studio Website & Admin Panel",
    summary:
      "Marketing website and content admin panel for a mobile app development studio, built with Next.js, TypeScript and Supabase.",
    description: `Built the Aternit website — a responsive marketing site for a mobile app development studio.

• Pages for services, portfolio, case studies, team, contact, privacy and terms
• Admin panel to manage site settings, services, team members, portfolio categories and projects
• Supabase for content storage, data management and admin workflows
• Reusable frontend components and polished, responsive UI animations
• Focus on performance, accessibility and a premium user experience`,
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "Google Analytics"],
    playStoreUrl: "",
    featured: true,
  },
];

export const defaultExperiences = [
  {
    role: "Sr. Full Stack Engineer",
    company: "Aternit",
    employmentType: "Full-time",
    location: "Surat, Gujarat, India",
    workMode: "Hybrid",
    startDate: "2026-05-01",
    endDate: null,
    skills: ["Next.js", "React", "TypeScript", "Supabase"],
  },
  {
    role: "Sr. Full Stack Engineer",
    company: "KryzeTech",
    employmentType: "Full-time",
    location: "Surat, Gujarat, India",
    workMode: "Hybrid",
    startDate: "2024-09-01",
    endDate: "2026-04-01",
    skills: ["Flutter", "Dart", "GitHub"],
  },
  {
    role: "Jr. Flutter Developer",
    company: "Freshcodes Technology",
    employmentType: "Full-time",
    location: "Surat, Gujarat, India",
    workMode: "On-site",
    startDate: "2021-09-01",
    endDate: "2024-08-01",
    skills: ["Flutter", "GitHub"],
  },
];

export const defaultServices = [
  { title: "End-to-End App Development", description: "From idea to App Store & Play Store", icon: "rocket" },
  { title: "Existing Codebase Takeover", description: "New features, refactors & clean architecture", icon: "code" },
  { title: "Production Fixes & Performance", description: "Debugging, crashes & “works on my machine” bugs", icon: "wrench" },
  { title: "Remote, Hourly & Contract", description: "Flexible engagement that fits your team", icon: "users" },
];
