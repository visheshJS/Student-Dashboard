import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

const students = [
  {
    id: 1,
    name: "Vishesh Sharma",
    email: "visheshking123@gmail.com",
    course: "Computer Science",
    gpa: 9.8,
  },
  {
    id: 2,
    name: "Alistir Cook",
    email: "cook@gmail.com",
    course: "Mathematics",
    gpa: 3.9,
  },
  {
    id: 3,
    name: "Mitchell Johnson",
    email: "alex@yahoo.com",
    course: "Physics",
    gpa: 3.7,
  },
  {
    id: 4,
    name: "Shane Watson",
    email: "shane@yahoo.com",
    course: "Computer Science",
    gpa: 3.5,
  },
  {
    id: 5,
    name: "Dale Steyn",
    email: "dale@gmail.com",
    course: "Chemistry",
    gpa: 3.6,
  },
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
