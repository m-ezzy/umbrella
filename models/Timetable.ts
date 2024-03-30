import { queryDatabase } from "@/lib/database";

async function select() {
  return await queryDatabase("SELECT * FROM timetable ORDER BY id DESC LIMIT 10");
}
async function selectByDegree(degree_id: number) {
  const data: any = await queryDatabase(`
    SELECT 
      timetable.timetable_id,timetable.time_start,timetable.time_end,timetable.weekday, timetable.teaching_id, division.batch_id,batch.year_started, teaching.division_id,division.division_name, teaching.course_id,course.course_name,course.course_name_acronym, syllabus_course.course_semester, teaching.professor_id,user.name_prefix,user.name_first,user.name_sur 
    FROM 
      timetable INNER JOIN teaching ON timetable.teaching_id=teaching.teaching_id INNER JOIN course ON teaching.course_id=course.course_id INNER JOIN division ON teaching.division_id=division.division_id INNER JOIN batch ON division.batch_id=batch.batch_id INNER JOIN syllabus ON batch.syllabus_id=syllabus.syllabus_id INNER JOIN degree ON syllabus.degree_id=degree.degree_id INNER JOIN syllabus_course ON syllabus_course.course_id=course.course_id INNER JOIN user ON teaching.professor_id=user.user_id 
    WHERE 
      degree.degree_id = ?`
  , [degree_id]);

  return data;
}
async function insert(teaching_id:number, weekday:string, time_start:string, time_end:string, room_id:number) {
  const result:any = await queryDatabase("INSERT INTO timetable (teaching_id,weekday,time_start,time_end,room_id) VALUES (?,?,?,?,?)", [teaching_id, weekday, time_start, time_end, room_id]);
  return result;
}
async function update(params:type) {
  //
}
async function deleteById(timetable_id:number) {
  const result:any = await queryDatabase("DELETE FROM timetable WHERE timetable_id=?", [timetable_id]);
  return result;
}

export { select, selectByDegree, insert, update, deleteById }
