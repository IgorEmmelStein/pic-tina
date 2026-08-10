// ==== SITE META ====

// Optimized SEO Title
export const SITE_TITLE =
  "Pilot Instructional Center | Professional Flight Training in Kansas City, KS";

// Optimized SEO Description (uses GBP text + UVP)
export const SITE_DESCRIPTION =
  "Pilot Instructional Center (PIC) is a top-rated flight school in New Century, Kansas, offering professional pilot training led by jet-rated, safety-focused instructors. Whether you're starting your Private Pilot License or advancing toward Instrument, Commercial, CFI, or CFII ratings, PIC provides personalized, integrity-driven training designed to help you take off with confidence.";

// Main keywords for the entire site
export const KEYWORDS = [
  "Pilot Instructional Center",
  "Kansas City flight school",
  "flight school New Century Kansas",
  "pilot training Kansas City",
  "flight lessons Kansas",
  "private pilot training Kansas",
  "instrument rating Kansas City",
  "commercial pilot training Kansas",
  "CFI CFII training Kansas",
  "best flight school Kansas City",
  "learn to fly Kansas",
  "aviation school Kansas City",
  "jet-rated flight instructors Kansas",
  "professional pilot training Kansas",
  "discovery flights Kansas City",
].join(", ");

// ==== PRIMARY KEYWORDS BY SEARCH INTENT ====

export const PRIMARY_KEYWORDS = {
  informational:
    "how to become a pilot in Kansas City, private pilot requirements Kansas, instrument rating requirements Kansas, aviation school Kansas City, how much does flight training cost Kansas",

  navigational:
    "Pilot Instructional Center Kansas, PIC flight school, flight lessons New Century Kansas, pilot program Kansas City",

  commercial:
    "best flight school Kansas City, top aviation school Kansas, affordable pilot training Kansas, professional flight instructors Kansas, CFI training Kansas City",

  transactional:
    "book discovery flight Kansas City, enroll in pilot school Kansas, start pilot training Kansas, schedule flight lesson Kansas City",
};

// ==== SECONDARY KEYWORDS BY PROGRAM ====

export const PROGRAM_KEYWORDS = {
  privatePilot:
    "private pilot license Kansas, PPL course Kansas City, beginner flight training Kansas, recreational pilot training Kansas",

  instrument:
    "instrument rating Kansas, IFR training Kansas City, CFII instruction Kansas, instrument checkride Kansas",

  commercial:
    "commercial pilot training Kansas, CPL Kansas City, aviation career Kansas, professional pilot school Kansas",

  multiEngine:
    "multi-engine rating Kansas, advanced aircraft training Kansas City, complex aircraft endorsement Kansas",

  flightInstructor:
    "CFI training Kansas, CFII training Kansas, become a flight instructor Kansas City, flight instructor school Kansas",
};

// ==== LOCATION KEYWORDS ====

export const LOCATION_KEYWORDS = {
  primary:
    "New Century KS flight school, Kansas City aviation training, pilot school New Century Kansas",

  secondary:
    "Olathe flight training, Overland Park aviation school, Gardner Kansas pilot lessons, Lawrence flight instruction, Kansas pilot programs",
};

// ==== BRAND ASSETS ====

export const OG_IMAGE = "/pilot-instructional-center-og.png";
export const FAVICON = "/Logo-round.png";
export const LOGO = "/Logo-round.png";
export const LOGO_ASSETS = "";

// ==== BUSINESS INFO (UPDATED WITH REAL DATA) ====

export const COMPANY_NAME = "Pilot Instructional Center";
export const COMPANY_NAME_CAPS = "PILOT INSTRUCTIONAL CENTER";
export const COMPANY_NICKNAME = "PIC";

export const LOGO_PRIMARY = "";
export const LOGO_SECONDARY = "";

// REAL phone number
export const PHONE_NUMBER = "(913) 600-8188";
export const PHONE_NUMBER_NO_FORMAT = "9136008188";

export const ADDRESS_LINE_1 = "280 Gardner Dr";
export const ADDRESS_LINE_2 = "";
export const ADDRESS = "280 Gardner Dr, New Century, KS 66031, United States";

export const ADDRESS_CITY = "New Century";
export const ADDRESS_STATE = "Kansas";
export const ADDRESS_STATE_SHORT = "KS";
export const ADDRESS_ZIP = "66031";
export const PRIMARY_AREA = "Kansas City";

export const AIRPORT = "New Century AirCenter";
export const AIRPORT_CODE = "KIXD";

// Google Maps link placeholder (can update later)
export const GMAPS = "";

// REAL email placeholder (replace when you know)
export const EMAIL_ADDRESS = "info@mail.pilot-instructionalcenter.com";

// Social URLs (update when available)
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61584374815330";
export const INSTAGRAM_URL =
  "https://www.instagram.com/pilotinstructionalcenter/";
export const LINKEDIN_URL = "";
export const X_URL = "";
export const YOUTUBE_URL = "";
export const YELP_URL = "";
export const GITHUB_URL = "";

// ==== LOCATIONS ====

export const LOCATIONS = [
  {
    title: `Pilot Instructional Center`,
    address: "280 Gardner Dr",
    city: "New Century",
    state: "KS",
    zip: "66031",
    gMaps: "https://maps.app.goo.gl/hGFGzn3Qr6D1amK36",
    phone: "(913) 600-8188",
    forwardPhone: "+1 913-600-8188",
  },
];

// their phone number +1 913-952-0207

// ==== PROGRAMS ====

export const COURSES = [
  "Private Pilot Training (PPL)",
  "Instrument Rating Training (IR)",
  "Commercial Pilot Training (CPL)",
  "CFI & CFII Instructor Programs",
  "Discovery Flights",
  "Advanced Pilot Training",
];

export const OTHER_COURSES = [];

// ==== FLEET ====

export const FLEET = [];

// ==== VIDEO BLOCK ====

export const VIDEOS = [
  {
    upperHeading: "Pilot Instructional Center",
    title: "Dedicated to Building Safe, Skilled Pilots",
    description:
      "At PIC, training is led by jet-rated instructors who prioritize safety, integrity, and personalized mentorship. Whether earning your PPL or advanced ratings, our team provides real-world expertise that prepares you for success.",
    link: "",
    image: {
      src: "",
      alt: "Pilot Instructional Center Training Video Thumbnail",
      classes: "",
    },
  },
];

// ==== website links ====

export const website_links = {
  // STARTING PAGES

  home: "/",
  newToFlying: "/new-to-flying/",

  // PROGRAM PAGES
  flightTraining: "/flight-training/",
  airlinePilotTrack: "/airline-pilot-track/",
  sportPilot: "/flight-training/sport-pilot/",
  privatePilot: "/flight-training/private-pilot/",
  commercialPilot: "/flight-training/commercial-pilot/",
  instrumentRating: "/flight-training/instrument-rating/",
  certifiedFlightInstructor:
    "/flight-training/certified-flight-instructor-cfi/",
  certifiedFlightInstructorInstrumentCfii:
    "/flight-training/certified-flight-instructor-instrument-cfii/",

  // FORMS PAGES
  contact: { path: "/contact/", id: "contact" },
  enroll: { id: "enroll" },
  discoveryFlight: { path: "/discovery-flight/", id: "discovery-flight" },
  privacyPolicy: "/privacy-policy/",
  termsService: "/terms-of-service/",

  // ABOUT PAGES
  about: "/about/",
  teamPage: { path: "/about/our-team/" },
  fleetPage: "/about/our-fleet/",
  ourSimulator: {
    path: "/about/our-fleet/simulator-redbird-fmx-full-motion-aatd/",
  },
  faqsPage: "/faqs/",
  pricingPage: "/pricing/",
  blogPage: "/blog/",
};
