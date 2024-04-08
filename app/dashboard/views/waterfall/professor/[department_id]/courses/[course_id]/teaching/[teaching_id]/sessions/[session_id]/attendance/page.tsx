import { redirect } from "next/navigation"
import SessionUpdateButton from "@/components/session/SessionUpdateButton"
import RoomGridProfessor from "@/components/attendance/RoomGridProfessor"
import AttendanceVerifyButton from "@/components/attendance/AttendanceVerifyButton"
import AttendanceListProfessor from "@/components/attendance/AttendanceListProfessor"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"

export default async function Page({ params }: any) {
  const session: any = await auth()

  const sessionData = await prisma.session.findUniqueOrThrow({
    include: {
      room: true,
    },
    where: {
      session_id: parseInt(params.session_id),
    },
  })
  .catch((error) => {
    return null;
  })

  // if session is not found, redirect to previous page
  if(!sessionData) {
    redirect("/dashboard")
  }

  const attendances = await prisma.session_attendance.findMany({
    include: {
      user: true,
    },
    where: {
      session_id: parseInt(params.session_id),
    },
  })
  .catch((error) => {
    return null;
  })

  return (
    <div className="overflow-auto p-2 space-y-2">
      {/* create form here to enter attendance individually of 1 student - could be present, absent, excused, ... */}

      <div className="flex justify-end gap-2">
        <SessionUpdateButton session_id={params.session_id} open_for_attendance={sessionData.open_for_attendance} />
        <AttendanceVerifyButton session_id={params.session_id} />
      </div>

      <RoomGridProfessor user_id={session.user.user_id} session_id={params.session_id} rowCount={sessionData.room.count_row} columnCount={sessionData.room.count_column} attendances={attendances} />
      <AttendanceListProfessor session_id={params.session_id} attendances={attendances} />
    </div>
  )
}
