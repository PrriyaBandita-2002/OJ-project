

```markdown
# Online Judge Platform

A full-stack Online Judge (OJ) platform built with the MERN stack. Supports competitive programming features like problem solving, code execution, live contests, time-travel debugging, and an AI-powered debugging assistant.



##  Features

###  Core Functionality
- Problem Bank: Create, edit, and manage coding problems with constraints, examples, hidden test cases, and starter code.
- Code Editor: Editor with syntax highlighting using Prism.js, supporting C/C++, Java, and Python.
- Test Case Evaluation: Automatic evaluation using public and hidden test cases.
- Submissions: Stores each submission with verdicts, runtime, test case results, and timestamps.

### Contests
- Live Contests: Time-bound contests with real-time countdown timers.
- Access Control: Problems are accessible only during the active contest window.

###  Analytics
- Dashboard: Tracks number of problems solved, submission history, average submission time, and participation stats.

###  Debugging Tools
- AI Debug Assistant: Ask questions like "Why is my loop failing?" and get targeted AI feedback on failed code.



## Tech Stack

### Frontend
-React.js, Tailwind CSS
- Code Editor: `react-simple-code-editor`, `Prism.js`

### Backend
- **Node.js**, **Express.js**
- **MongoDB** (with Mongoose)
- **Docker** for secure code execution environments

### Authentication
- JWT-based Authentication
- Role-Based Access: `admin`, `problem_setter`, `user`
- Firebase/Google Sign-In support (optional)



##  Supported Languages

- C / C++
- Java
- Python

> All programs run inside secure, isolated Docker containers with resource/time constraints.



##  Project Structure
-client              # React frontend
-server              # Express backend
-server/models       # MongoDB models (User, Problem, TestCase, Submission, Contest)
-docker              # Docker container setup for code execution

```


````


##  Installation

###  Prerequisites

- Node.js ≥ 18
- Docker
- MongoDB (local or MongoDB Atlas)

###  Backend Setup

```bash
cd server
npm install
npm run dev
````

###  Frontend Setup

```bash
cd client
npm install
npm start
```

### Docker Setup

```bash
cd docker
docker build -t code-runner .
```



##  Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_genai_api_key
```






##  Screenshot

<img width="1893" height="912" alt="image" src="https://github.com/user-attachments/assets/75e263cf-810b-4af7-8d27-1c1c9971cbc1" />


##  Future Enhancements


* Hints + Editorials per problem
* MOSS-based plagiarism detection
*  PDF export for solutions



##  Author

Developed with ❤️ by Prriya



## 📄 License

This project is licensed under the [MIT License](LICENSE).

