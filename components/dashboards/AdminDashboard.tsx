// import { useRef } from "react";
import Link from "next/link";
import { Chart } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Charts from "@/components/charts/AdminCharts";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export default async function AdminDashboard() {
  const session: any = await auth();
  // const canvasRef: any = useRef<HTMLCanvasElement>(null);

  const batchs = await prisma.batch.findMany({
    select: {
      _count: {
        select: {
          enrollments: true
        },
      },
      id: true,
      start_year: true,
    },
    where: {
      syllabus: {
        degree: {
          admins: {
            some: {
              user_id: session.user.id,
            },
          },
        },
      },
    },
  })

  // const enrollments = await prisma.enrollment.findMany({
  //   include: {
  //     user: true,
  //   },
  //   where: {
  //     division: {
  //       batch: {
  //         syllabus: {
  //           degree_id: parseInt(params.degree_id),
  //         },
  //       },
  //     },
  //   },
  // });
  
  // const teaching = await prisma.teaching.findMany({
  //   select: {
  //     _count: {
  //       select: {
  //         sessions: true,
  //         timetables: true,
  //       }
  //     },
  //     id: true,
  //   },
  //   where: {
  //     division: {
  //       batch: {
  //         syllabus: {
  //           degree_id: parseInt(params.degree_id),
  //         },
  //       },
  //     },
  //   },
  // });

  // const professor_sessions = await prisma

  return (
    <div className="w-full p-2 overflow-auto">
      <h1>Admin Dashboard</h1>
      <Charts batchs={batchs} enrollments={[]} teaching={[]} />
    </div>
  );
}
