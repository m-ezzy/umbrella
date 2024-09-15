import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/db"
import { auth, update } from "@/auth"
import { roleMenus } from "@/constants/menus"
import MenuList from "@/components/ui/MenuList"
import BreadcrumbBar from "@/components/ui/BreadcrumbBar"

export default async function Layout({ children }: { children: any }) {
  // const session:any = await auth();

  // if(!session.user) redirect('/login')

  // put all this roles in the session for authorization and access control in the future
  // Founder - owner or creator or top guy of university
  // const founderUniversity: any[] = await prisma.university.findMany({
  //   where: { user_id: session.user.id },
  // })
  // Manager - director of the university
  // const managerUniversity: any[] = await prisma.manager.findMany({
  //   where: { user_id: session.user.id },
  // })
  // Head - head of any department
  // const headDepartments: any[] = await prisma.faculty.findMany({
  //   where: {
  //     user_id: session.user.id,
  //     designation: "head",
  //   },
  // })
  // Admin - admin of any degree of any department
  // const adminDegrees: any[] = await prisma.admin.findMany({
  //   where: { user_id: session.user.id },
  // })
  // Professor - employeed in any department
  // const professorEmployments: any[] = await prisma.faculty.findMany({
  //   where: {
  //     user_id: session.user.id,
  //     designation: {
  //       in: ["assistant_professor", "associate_professor"],
  //     },
  //   },
  // })
  // Student - enrollments in any degree of any department of any university
  // const studentEnrollments: any[] = await prisma.enrollment.findMany({
  //   where: { user_id: session.user.id },
  // });

  // const menus: any = []
  // if(founderUniversity.length > 0) {
  //   menus.push(roleMenus[0])
  // }
  // if(managerUniversity.length > 0) {
  //   menus.push(roleMenus[1])
  // }
  // if(headDepartments.length > 0) {
  //   menus.push(roleMenus[2])
  // }
  // if(adminDegrees.length > 0) {
  //   menus.push(roleMenus[3])
  // }
  // if(professorEmployments.length > 0) {
  //   menus.push(roleMenus[4])
  // }
  // if(studentEnrollments.length > 0) {
  //   menus.push(roleMenus[5])
  // }

  // let showMenu = true
  // if(menus.length === 0) {
  //   return <h1>You have no role in this university yet</h1>
  // } else if(menus.length === 1) {
  //   showMenu = false
  // }

  // const breadcrumbs: any = [
  //   {
  //     label: "Dashboard",
  //     path: "/dashboard",
  //   },
  //   {
  //     label: "Stack",
  //     path: "/dashboard/views/stack",
  //   },
  // ];

  // const founderUniversityList = founderUniversity.map((item: any) => (
  //   <li key={item.id} className="border rounded-md p-2 min-w-44">
  //     <Link href={`/dashboard/founder`}>
  //       <p>University: {item.name}</p>
  //     </Link>
  //   </li>
  // ));
  // const managerUniversityList = managerUniversity.map((item: any) => (
  //   <li key={item.id} className="border rounded-md p-2 min-w-44">
  //     <Link href={`/dashboard/manager`}>
  //       <p>University: {item.university.name}</p>
  //     </Link>
  //   </li>
  // ));
  // const adminDegreesList = adminDegrees.map((item: any) => (
  //   <li key={item.admin_id} className="border rounded-md p-2 min-w-44">
  //     <Link href={`/dashboard/admin/${item.degree.degree_id}`}>
  //       <p>Degree: {item.degree.degree_name}</p>
  //     </Link>
  //   </li>
  // ));
  // const professorEmploymentsList = professorEmployments.map((item: any) => (
  //   <li key={item.department.department_id} className="border rounded-md p-2 min-w-44">
  //     {/* <Link href={`/dashboard/professor`}> */}
  //     <Link href={`/dashboard/professor/${item.department_id}/`}>
  //       <p>Department: {item.department.department_name}</p>
  //     </Link>
  //   </li>
  // ));
  // const studentEnrollmentsList = studentEnrollments.map((item: any) => (
  //   <li key={item.batch_id} className="border rounded-md p-2 min-w-44">
  //     <Link href={`/dashboard/student/${item.enrollment_id}`}>
  //       {/* <p>Department: {item.batch.syllabus.degree.department.department_name} ({item.batch.syllabus.degree.department.department_name_acronym})</p> */}
  //       <p>Degree: {item.batch.syllabus.degree.degree_name} ({item.batch.syllabus.degree.degree_name_acronym})</p>
  //       <p>Batch: {item.batch.year_started}</p>
  //       {/* <p>Division: {item.division.division_name}</p> */}
  //     </Link>
  //   </li>
  // ));

  return (
    <div className="h-full layout-dashboard md:flex">
      {/* <BreadcrumbBar breadcrumbs={breadcrumbs} /> */}
      <MenuList menus={roleMenus} selected={"write code for this"} pathSegment="/dashboard" pathPosition={2} />
      {children}
    </div>
  );
}
