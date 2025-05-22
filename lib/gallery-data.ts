export interface GalleryImage {
  id: string
  src: string
  title: string
  description: string
  category: string
  date: string
}

export interface GalleryCategory {
  id: string
  name: string
  description: string
  images: GalleryImage[]
}

export const galleryData: GalleryCategory[] = [
  {
    id: "training",
    name: "Training Sessions",
    description: "Knowledge sharing and skill development programs",
    images: [
      {
        id: "training-1",
        src: "/images/training1.jpg",
        title: "Digital Transformation Workshop",
        description: "A comprehensive workshop on implementing digital transformation strategies for businesses.",
        category: "Training Sessions",
        date: "November 2023",
      },
      {
        id: "training-2",
        src: "/images/trainingG.jpg",
        title: "Leadership Development Program",
        description: "An intensive program designed to nurture leadership skills among emerging leaders.",
        category: "Training Sessions",
        date: "September 2023",
      },
      {
        id: "training-3",
        src: "/images/training3.jpg",
        title: "Strategic Planning Seminar",
        description: "A seminar focused on effective strategic planning methodologies for sustainable growth.",
        category: "Training Sessions",
        date: "August 2023",
      },
      {
        id: "training-4",
        src: "/images/tr.jpg",
        title: "Financial Management Workshop",
        description: "Practical workshop on financial management best practices for business owners.",
        category: "Training Sessions",
        date: "July 2023",
      },
    ],
  },
  {
    id: "events",
    name: "Corporate Events",
    description: "Conferences, seminars, and networking events",
    images: [
      {
        id: "event-1",
        src: "/images/fv.jpg",
        title: "Annual Business Conference 2023",
        description: "Our flagship annual conference bringing together industry leaders and innovators.",
        category: "Corporate Events",
        date: "December 2023",
      },
      {
        id: "event-2",
        src: "/images/food.jpg",
        title: "Networking Gala",
        description: "An exclusive networking event for our clients and partners to foster collaboration.",
        category: "Corporate Events",
        date: "October 2023",
      },
      {
        id: "event-3",
        src: "/images/cm.jpg",
        title: "Industry Roundtable",
        description: "A focused discussion on emerging trends and challenges in the consulting industry.",
        category: "Corporate Events",
        date: "September 2023",
      },
      {
        id: "event-4",
        src: "/images/fl.jpg",
        title: "Client Appreciation Day",
        description: "A special event to express gratitude to our valued clients for their continued trust.",
        category: "Corporate Events",
        date: "August 2023",
      },
    ],
  },
  {
    id: "team",
    name: "Team Activities",
    description: "Team building and recreational activities",
    images: [
      {
        id: "team-1",
        src: "/images/meeting.jpg",
        title: "Annual Team Retreat",
        description: "Our team's annual retreat focused on bonding, reflection, and strategic planning.",
        category: "Team Activities",
        date: "November 2023",
      },
      {
        id: "team-2",
        src: "/images/meeting1.jpg",
        title: "Volunteer Day",
        description: "Team members participating in community service as part of our CSR initiatives.",
        category: "Team Activities",
        date: "October 2023",
      },
      {
        id: "team-3",
        src: "/images/visit.jpg",
        title: "Sports Tournament",
        description: "An exciting sports tournament to promote teamwork and healthy competition.",
        category: "Team Activities",
        date: "September 2023",
      },
    ],
  },
  {
    id: "office",
    name: "Office & Workspace",
    description: "Our modern and collaborative workspace",
    images: [
      {
        id: "office-1",
        src: "/images/office.jpg",
        title: "Main Office Headquarters",
        description: "Our state-of-the-art headquarters designed for collaboration and innovation.",
        category: "Office & Workspace",
        date: "2023",
      },
      {
        id: "office-2",
        src: "/images/office1.jpg",
        title: "Collaborative Meeting Spaces",
        description: "Modern meeting spaces equipped with the latest technology for productive discussions.",
        category: "Office & Workspace",
        date: "2023",
      },
      {
        id: "office-3",
        src: "/images/birthday.jpg",
        title: "Innovation Lab",
        description: "Our dedicated innovation lab where new ideas and solutions are developed.",
        category: "Office & Workspace",
        date: "2023",
      },
    ],
  },
]
