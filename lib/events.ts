export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  attendees?: number;
  registrationOpen: boolean;
  registrationLink?: string;
  organizer?: string;
}

// Mock data for events
const events: Event[] = [
  {
    id: 1,
    title: "Digital Transformation Summit",
    description:
      "Join industry leaders to explore the latest trends in digital transformation and how they can be applied to your business.",
    date: "May 15-17, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Hyderabad International Convention Centre",
    image: "/placeholder.svg?height=400&width=600",
    category: "Conference",
    attendees: 250,
    registrationOpen: true,
    registrationLink: "#",
    organizer: "Vriksh Consulting",
  },
  {
    id: 2,
    title: "Sustainable Business Practices Workshop",
    description:
      "Learn how to implement sustainable practices in your business operations while maintaining profitability and growth.",
    date: "May 20, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Virtual Event",
    image: "/placeholder.svg?height=400&width=600",
    category: "Workshop",
    attendees: 100,
    registrationOpen: true,
    registrationLink: "#",
    organizer: "Vriksh Consulting",
  },
  {
    id: 3,
    title: "Funding Strategies for Startups",
    description:
      "Discover effective funding strategies for early-stage startups from venture capitalists and angel investors.",
    date: "May 25-26, 2025",
    time: "11:00 AM - 4:00 PM",
    location: "Bangalore Tech Hub",
    image: "/placeholder.svg?height=400&width=600",
    category: "Seminar",
    attendees: 150,
    registrationOpen: true,
    registrationLink: "#",
    organizer: "Vriksh Consulting",
  },
  {
    id: 4,
    title: "AI in Business Operations",
    description:
      "Explore how artificial intelligence is revolutionizing business operations and how you can implement AI solutions.",
    date: "June 10, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Mumbai Business Centre",
    image: "/placeholder.svg?height=400&width=600",
    category: "Workshop",
    registrationOpen: true,
    organizer: "Vriksh Consulting",
  },
  {
    id: 5,
    title: "Market Research Masterclass",
    description:
      "Learn advanced techniques for market research and analysis to gain competitive insights for your business.",
    date: "June 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Event",
    image: "/placeholder.svg?height=400&width=600",
    category: "Masterclass",
    registrationOpen: true,
    organizer: "Vriksh Consulting",
  },
  {
    id: 6,
    title: "Leadership Summit 2025",
    description:
      "Join top executives and leadership experts to discuss effective leadership strategies in the modern business landscape.",
    date: "July 5-7, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Delhi International Centre",
    image: "/placeholder.svg?height=400&width=600",
    category: "Conference",
    registrationOpen: false,
    organizer: "Vriksh Consulting",
  },
  {
    id: 7,
    title: "E-commerce Growth Strategies",
    description:
      "Discover proven strategies to scale your e-commerce business and increase your online presence and sales.",
    date: "July 20, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "Virtual Event",
    image: "/placeholder.svg?height=400&width=600",
    category: "Webinar",
    registrationOpen: false,
    organizer: "Vriksh Consulting",
  },
];

export function getAllEvents(): Event[] {
  return events;
}

export function getCurrentEvents(): Event[] {
  // In a real app, you would filter based on date
  return events.slice(0, 3);
}

export function getUpcomingEvents(): Event[] {
  // In a real app, you would filter based on date
  return events.slice(3);
}

export function getEventById(id: number): Event | undefined {
  return events.find((event) => event.id === id);
}

export function getSimilarEvents(id: number, limit: number = 3): Event[] {
  // In a real app, you would find events with similar categories or tags
  return events.filter((event) => event.id !== id).slice(0, limit);
}
