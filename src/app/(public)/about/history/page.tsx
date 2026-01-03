import { Metadata } from "next";
import HistoryClient from "./HistoryClient";

export const metadata: Metadata = {
  title: "ประวัติความเป็นมาพรรคคนไทย",
  description: "พรรคคนไทย — พรรคของประชาชนทุกคน",
};

export default function HistoryPage() {
  return <HistoryClient />;
}
