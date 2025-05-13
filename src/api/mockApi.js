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
        name: "Amit Sharma",
        email: "amit.sharma@example.com",
        course: "Computer Science",
        gpa: 9.8,
        avatar: "https://i.pravatar.cc/150?u=amit.sharma@example.com"
      },
      {
        id: 2,
        name: "Ravi Kumar",
        email: "ravi.kumar@example.com",
        course: "Mathematics",
        gpa: 3.9,
        avatar: "https://i.pravatar.cc/150?u=ravi.kumar@example.com"
      },
      {
        id: 3,
        name: "Sanjay Verma",
        email: "sanjay.verma@example.com",
        course: "Physics",
        gpa: 3.7,
        avatar: "https://i.pravatar.cc/150?u=sanjay.verma@example.com"
      },
      {
        id: 4,
        name: "Vikram Patel",
        email: "vikram.patel@example.com",
        course: "Computer Science",
        gpa: 3.5,
        avatar: "https://i.pravatar.cc/150?u=vikram.patel@example.com"
      },
      {
        id: 5,
        name: "Rajesh Gupta",
        email: "rajesh.gupta@example.com",
        course: "Chemistry",
        gpa: 3.6,
        avatar: "https://i.pravatar.cc/150?u=rajesh.gupta@example.com"
      },
      {
        id: 6,
        name: "Sunil Joshi",
        email: "sunil.joshi@example.com",
        course: "Mathematics",
        gpa: 9.5,
        avatar: "https://i.pravatar.cc/150?u=sunil.joshi@example.com"
      },
      {
        id: 7,
        name: "Deepak Mehta",
        email: "deepak.mehta@example.com",
        course: "Physics",
        gpa: 10,
        avatar: "https://i.pravatar.cc/150?u=deepak.mehta@example.com"
      },
      {
        id: 8,
        name: "Karan Singh",
        email: "karan.singh@example.com",
        course: "Computer Science",
        gpa: 9.2,
        avatar: "https://i.pravatar.cc/150?u=karan.singh@example.com"
      },
      {
        id: 9,
        name: "Anil Malhotra",
        email: "anil.malhotra@example.com",
        course: "Chemistry",
        gpa: 8.7,
        avatar: "https://i.pravatar.cc/150?u=anil.malhotra@example.com"
      },
      {
        id: 10,
        name: "Rohit Kapoor",
        email: "rohit.kapoor@example.com",
        course: "Mathematics",
        gpa: 8.5,
        avatar: "https://i.pravatar.cc/150?u=rohit.kapoor@example.com"
      },
      {
        id: 11,
        name: "Nikhil Iyer",
        email: "nikhil.iyer@example.com",
        course: "Physics",
        gpa: 8.8,
        avatar: "https://i.pravatar.cc/150?u=nikhil.iyer@example.com"
      },
      {
        id: 12,
        name: "Arjun Rao",
        email: "arjun.rao@example.com",
        course: "Computer Science",
        gpa: 8.1,
        avatar: "https://i.pravatar.cc/150?u=arjun.rao@example.com"
      },
      {
        id: 13,
        name: "Manish Jain",
        email: "manish.jain@example.com",
        course: "Mathematics",
        gpa: 8.6,
        avatar: "https://i.pravatar.cc/150?u=manish.jain@example.com"
      },
      {
        id: 14,
        name: "Ajay Saxena",
        email: "ajay.saxena@example.com",
        course: "Physics",
        gpa: 8.3,
        avatar: "https://i.pravatar.cc/150?u=ajay.saxena@example.com"
      },
      {
        id: 15,
        name: "Kunal Bhat",
        email: "kunal.bhat@example.com",
        course: "Chemistry",
        gpa: 8.9,
        avatar: "https://i.pravatar.cc/150?u=kunal.bhat@example.com"
      },
      {
        id: 16,
        name: "Vivek Chaudhary",
        email: "vivek.chaudhary@example.com",
        course: "Computer Science",
        gpa: 0,
        avatar: "https://i.pravatar.cc/150?u=vivek.chaudhary@example.com"
      },
      {
        id: 17,
        name: "Harsh Reddy",
        email: "harsh.reddy@example.com",
        course: "Mathematics",
        gpa: 8.2,
        avatar: "https://i.pravatar.cc/150?u=harsh.reddy@example.com"
      },
      {
        id: 18,
        name: "Pranav Das",
        email: "pranav.das@example.com",
        course: "Physics",
        gpa: 8.4,
        avatar: "https://i.pravatar.cc/150?u=pranav.das@example.com"
      },
      {
        id: 19,
        name: "Siddharth Nair",
        email: "siddharth.nair@example.com",
        course: "Chemistry",
        gpa: 8.7,
        avatar: "https://i.pravatar.cc/150?u=siddharth.nair@example.com"
      },
      {
        id: 20,
        name: "Gaurav Chatterjee",
        email: "gaurav.chatterjee@example.com",
        course: "Computer Science",
        gpa: 8.8,
        avatar: "https://i.pravatar.cc/150?u=gaurav.chatterjee@example.com"
      }
    ]
    
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
