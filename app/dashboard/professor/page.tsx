import { redirect } from "next/navigation";

export default function Page() {
  redirect('/professor/courses');
  return (
    <div>
    </div>
  );
}
