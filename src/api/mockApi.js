import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

const students = [
  { id: 1, name: "Vishesh Sharma", email: "visheshking123@gmail.com", course: "Computer Science", gpa: 9.8 },
  { id: 2, name: "Alistir Cook", email: "cook@gmail.com", course: "Mathematics", gpa: 3.9 },
  { id: 3, name: "Mitchell Johnson", email: "mitchell.johnson@gmail.com", course: "Physics", gpa: 3.7 },
  { id: 4, name: "Shane Watson", email: "shane.watson@gmail.com", course: "Computer Science", gpa: 3.5 },
  { id: 5, name: "Dale Steyn", email: "dale.steyn@gmail.com", course: "Chemistry", gpa: 3.6 },
  { id: 6, name: "Sachin Tendulkar", email: "sachin.tendulkar@gmail.com", course: "Mathematics", gpa: 9.5 },
  { id: 7, name: "Virat Kohli", email: "virat.kohli@gmail.com", course: "Physics", gpa: 8.9 },
  { id: 8, name: "AB de Villiers", email: "ab.devilliers@gmail.com", course: "Computer Science", gpa: 9.2 },
  { id: 9, name: "Kane Williamson", email: "kane.williamson@gmail.com", course: "Chemistry", gpa: 8.7 },
  { id: 10, name: "Joe Root", email: "joe.root@gmail.com", course: "Mathematics", gpa: 8.5 },
  { id: 11, name: "Steve Smith", email: "steve.smith@gmail.com", course: "Physics", gpa: 8.8 },
  { id: 12, name: "Ben Stokes", email: "ben.stokes@gmail.com", course: "Computer Science", gpa: 8.1 },
  { id: 13, name: "Rohit Sharma", email: "rohit.sharma@gmail.com", course: "Mathematics", gpa: 8.6 },
  { id: 14, name: "Jasprit Bumrah", email: "jasprit.bumrah@gmail.com", course: "Physics", gpa: 8.3 },
  { id: 15, name: "Rashid Khan", email: "rashid.khan@gmail.com", course: "Chemistry", gpa: 8.9 },
  { id: 16, name: "Babar Azam", email: "babar.azam@gmail.com", course: "Computer Science", gpa: 9.0 },
  { id: 17, name: "David Warner", email: "david.warner@gmail.com", course: "Mathematics", gpa: 8.2 },
  { id: 18, name: "Quinton de Kock", email: "quinton.dekock@gmail.com", course: "Physics", gpa: 8.4 },
  { id: 19, name: "Kagiso Rabada", email: "kagiso.rabada@gmail.com", course: "Chemistry", gpa: 8.7 },
  { id: 20, name: "Shubman Gill", email: "shubman.gill@gmail.com", course: "Computer Science", gpa: 8.8 },
];

mock.onGet("/api/students").reply(200, {
  students: students,
});

mock.onPost("/api/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1;
  students.push(newStudent);
  return [201, { student: newStudent }];
});

mock.onGet(/\/api\/students\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());

  const student = students.find((s) => s.id === id);

  if (student) {
    return [200, { student }];
  }
  return [404, { message: "Student not found" }];
});

export default axiosInstance;
