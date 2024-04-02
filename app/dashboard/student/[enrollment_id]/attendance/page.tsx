import { prisma } from "@/lib/db";
import RoomGrid from "@/components/attendance/RoomGrid";

export default async function Page({ params }: any) {
  const session_id = 1; // 😂

  const data = await prisma.session.findMany({
    include: {
      room: true,
      teaching: {
        include: {
          course: true,
          professor: true,
        },
      },
    },
    where: {
      open_for_attendance: true,
      teaching: {
        division: {
          enrollments: {
            some: {
              enrollment_id: parseInt(params.enrollment_id),
            },
          },
        },
      },
    },
  });
  return (
    <div>
      <h1>Give Attendance - Choose Location when lecture faculty opens to select</h1>
      <RoomGrid rowCount={5} columnCount={5} sessionData={sessionData} attendanceData={attendanceData} />
    </div>
  );
}
