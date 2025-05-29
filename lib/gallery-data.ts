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
        id: "training-4",
        src: "/images/training 4.jpg",
        title: "Interpersonal Relationship Seminar",
        description: "A seminar focused on effective strategic planning methodologies for sustainable growth.",
        category: "Training Sessions",
        date: "August 2023",
      },
      {
        id: "training-5",
        src: "/images/training 5.jpg",
        title: "Team Building",
        description: "A seminar focused on effective strategic planning methodologies for sustainable growth.",
        category: "Training Sessions",
        date: "August 2023",
      },
      {
        id: "training-6",
        src: "/images/training 6.jpg",
        title: "Strategic Planning Seminar",
        description: "A seminar focused on effective strategic planning methodologies for sustainable growth.",
        category: "Training Sessions",
        date: "August 2023",
      },
      {
        id: "training-7",
        src: "/images/training 7.jpg",
        title: "Trust Building",
        description: "A seminar focused on effective strategic planning methodologies for sustainable growth.",
        category: "Training Sessions",
        date: "August 2023",
      },
      {
        id: "training-9",
        src: "/images/training 9.jpg",
        title: "Sales Training",
        description: "A seminar focused on effective strategic planning methodologies for sustainable growth.",
        category: "Training Sessions",
        date: "August 2023",
      },
    ],
  },
  {
    id: "events",
    name: "Corporate Events",
    description: "Conferences, seminars, and networking events",
    images: [

      {
        id: "event-3",
        src: "/images/cm.jpg",
        title: "Meet with CM",
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
      {
        id: "event-5",
        src: "/images/CE.jpg",
        title: "Roleplay Discussion",
        description: "A special event to express gratitude to our valued clients for their continued trust.",
        category: "Corporate Events",
        date: "August 2023",
      },
      {
        id: "event-4",
        src: "/images/up.jpg",
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
        title: "Our Team",
        description: "Our team's annual retreat focused on bonding, reflection, and strategic planning.",
        category: "Team Activities",
        date: "November 2023",
      },
      {
        id: "team-3",
        src: "/images/visit.jpg",
        title: "Client meet at Shimla",
        description: "An exciting sports tournament to promote teamwork and healthy competition.",
        category: "Team Activities",
        date: "September 2023",
      },
      {
        id: "team-4",
        src: "/images/ta.jpg",
        title: "With Our Russian Client",
        description: "client meeting.",
        category: "Team Activities",
        date: "September 2023",
      },
      {
        id: "team-5",
        src: "/images/ta1.jpg",
        title: "Client meet",
        description: "client meeting.",
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
        id: "office-2",
        src: "/images/office1.jpg",
        title: "Office Internal Bonding",
        description: "Modern meeting spaces equipped with the latest technology for productive discussions.",
        category: "Office & Workspace",
        date: "2023",
      },
      {
        id: "event-2",
        src: "/images/food.jpg",
        title: "Corporate Lunch",
        description: "An exclusive networking event for our clients and partners to foster collaboration.",
        category: "Corporate Events",
        date: "October 2023",
      },
      {
        id: "event-3",
        src: "/images/ofc.jpg",
        title: "Networking Gala",
        description: "An exclusive networking event for our clients and partners to foster collaboration.",
        category: "Corporate Events",
        date: "October 2023",
      },
    ],
  },
]
