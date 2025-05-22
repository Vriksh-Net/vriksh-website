import { notFound } from "next/navigation";
import EventDetail from "@/components/events/event-detail";
import { getAllEvents, getEventById } from "@/lib/events";

export async function generateStaticParams() {
  const events = await getAllEvents();

  return events.map((event) => ({
    id: event.id.toString(),
  }));
}

export default async function EventPage({ params }: { params: Promise<{id: string}> }) {

  const { id } = await params;
  const event = await getEventById(parseInt(id));

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
