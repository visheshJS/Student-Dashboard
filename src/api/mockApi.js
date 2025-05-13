import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

const getInitialStudents = () => {
  const storedStudents = localStorage.getItem("students");
  return storedStudents
    ? JSON.parse(storedStudents)
    : [
        {
          id: 1,
          name: "Vishesh Sharma",
          email: "visheshking123@gmail.com",
          course: "Computer Science",
          gpa: 9.8,
          avatar: "https://i.pravatar.cc/150?u=visheshking123@gmail.com",
        },
        {
          id: 2,
          name: "Alistir Cook",
          email: "cook@gmail.com",
          course: "Mathematics",
          gpa: 3.9,
          avatar: "https://i.pravatar.cc/150?u=cook@gmail.com",
        },
        {
          id: 3,
          name: "Mitchell Johnson",
          email: "mitchell.johnson@gmail.com",
          course: "Physics",
          gpa: 3.7,
          avatar: "https://i.pravatar.cc/150?u=mitchell.johnson@gmail.com",
        },
        {
          id: 4,
          name: "Shane Watson",
          email: "shane.watson@gmail.com",
          course: "Computer Science",
          gpa: 3.5,
          avatar: "https://i.pravatar.cc/150?u=shane.watson@gmail.com",
        },
        {
          id: 5,
          name: "Dale Steyn",
          email: "dale.steyn@gmail.com",
          course: "Chemistry",
          gpa: 3.6,
          avatar: "https://i.pravatar.cc/150?u=dale.steyn@gmail.com",
        },
        {
          id: 6,
          name: "Sachin Tendulkar",
          email: "sachin.tendulkar@gmail.com",
          course: "Mathematics",
          gpa: 9.5,
          avatar: "https://i.pravatar.cc/150?u=sachin.tendulkar@gmail.com",
        },
        {
          id: 7,
          name: "Virat Kohli",
          email: "virat.kohli@gmail.com",
          course: "Physics",
          gpa: 10,
          avatar: "https://i.pravatar.cc/150?u=virat.kohli@gmail.com",
        },
        {
          id: 8,
          name: "AB de Villiers",
          email: "ab.devilliers@gmail.com",
          course: "Computer Science",
          gpa: 9.2,
          avatar: "https://i.pravatar.cc/150?u=ab.devilliers@gmail.com",
        },
        {
          id: 9,
          name: "Kane Williamson",
          email: "kane.williamson@gmail.com",
          course: "Chemistry",
          gpa: 8.7,
          avatar: "https://i.pravatar.cc/150?u=kane.williamson@gmail.com",
        },
        {
          id: 10,
          name: "Joe Root",
          email: "joe.root@gmail.com",
          course: "Mathematics",
          gpa: 8.5,
          avatar: "https://i.pravatar.cc/150?u=joe.root@gmail.com",
        },
        {
          id: 11,
          name: "Steve Smith",
          email: "steve.smith@gmail.com",
          course: "Physics",
          gpa: 8.8,
          avatar: "https://i.pravatar.cc/150?u=steve.smith@gmail.com",
        },
        {
          id: 12,
          name: "Ben Stokes",
          email: "ben.stokes@gmail.com",
          course: "Computer Science",
          gpa: 8.1,
          avatar: "https://i.pravatar.cc/150?u=ben.stokes@gmail.com",
        },
        {
          id: 13,
          name: "Rohit Sharma",
          email: "rohit.sharma@gmail.com",
          course: "Mathematics",
          gpa: 8.6,
          avatar: "https://i.pravatar.cc/150?u=rohit.sharma@gmail.com",
        },
        {
          id: 14,
          name: "Jasprit Bumrah",
          email: "jasprit.bumrah@gmail.com",
          course: "Physics",
          gpa: 8.3,
          avatar: "https://i.pravatar.cc/150?u=jasprit.bumrah@gmail.com",
        },
        {
          id: 15,
          name: "Rashid Khan",
          email: "rashid.khan@gmail.com",
          course: "Chemistry",
          gpa: 8.9,
          avatar: "https://i.pravatar.cc/150?u=rashid.khan@gmail.com",
        },
        {
          id: 16,
          name: "Babar Azam",
          email: "babar.azam@gmail.com",
          course: "Computer Science",
          gpa: 0,
          avatar: "https://i.pravatar.cc/150?u=babar.azam@gmail.com",
        },
        {
          id: 17,
          name: "David Warner",
          email: "david.warner@gmail.com",
          course: "Mathematics",
          gpa: 8.2,
          avatar: "https://i.pravatar.cc/150?u=david.warner@gmail.com",
        },
        {
          id: 18,
          name: "Quinton de Kock",
          email: "quinton.dekock@gmail.com",
          course: "Physics",
          gpa: 8.4,
          avatar: "https://i.pravatar.cc/150?u=quinton.dekock@gmail.com",
        },
        {
          id: 19,
          name: "Kagiso Rabada",
          email: "kagiso.rabada@gmail.com",
          course: "Chemistry",
          gpa: 8.7,
          avatar: "https://i.pravatar.cc/150?u=kagiso.rabada@gmail.com",
        },
        {
          id: 20,
          name: "Shubman Gill",
          email: "shubman.gill@gmail.com",
          course: "Computer Science",
          gpa: 8.8,
          avatar: "https://i.pravatar.cc/150?u=shubman.gill@gmail.com",
        },
      ];
};

let students = getInitialStudents();

const saveStudentsToLocalStorage=  () => {
  localStorage.setItem("students", JSON.stringify(students));
}

mock.onGet("/api/students").reply(200, {
  students: students,
});

mock.onPost("/api/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1;
  if (!newStudent.avatar) {
    newStudent.avatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(newStudent.email)}`;
  }
  students.push(newStudent);
  saveStudentsToLocalStorage();
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

mock.onDelete(/\/api\/students\/\d+/).reply((config) => {
  const id = parseInt(config.url.split("/").pop());
  console.log("Delete handler called for ID:", id);
  console.log("URL received:", config.url);

  const studentIndex = students.findIndex((s) => s.id === id);
  console.log("Student found at index:", studentIndex);

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    saveStudentsToLocalStorage();
    return [200, { message: "Student deleted successfully" }];
  }
  return [404, { message: "Student not found" }];
});

export default axiosInstance;
