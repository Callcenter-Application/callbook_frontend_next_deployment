import type { Metadata } from "next";
import { RecordingsView } from "@/components/recordings/RecordingsView";

export const metadata: Metadata = { title: "Recordings" };

export default function RecordingsPage() {
  return <RecordingsView />;
}
