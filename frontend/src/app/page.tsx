import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/books/list?page=1");
}
