import { notFound } from "next/navigation";
import EventDetail from "@/components/events/event-detail";
import { getAllEvents, getEventById } from "@/lib/events";

export async function generateStaticParams() {
  const events = getAllEvents();

  return events.map((event) => ({
    id: event.id.toString(),
  }));
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEventById(parseInt(params.id));

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
