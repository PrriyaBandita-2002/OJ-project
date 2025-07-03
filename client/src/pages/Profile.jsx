// import { useEffect, useState } from "react";

// export default function Profile() {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john@example.com",
//     role: "user", // or "admin", "problem_setter"
//     problemsSolved: 79,
//     submissions: 210,
//     rank: 1234,
//   });

//   const getRoleBadge = (role) => {
//     const base = "text-xs px-2 py-1 rounded-full font-semibold";
//     switch (role) {
//       case "admin":
//         return `${base} bg-red-100 text-red-600`;
//       case "problem_setter":
//         return `${base} bg-yellow-100 text-yellow-600`;
//       default:
//         return `${base} bg-green-100 text-green-600`;
//     }
//   };

//   const handleLogout = () => {
//     // Clear auth tokens or call backend logout
//     console.log("Logging out...");
//   };

//   return (
//     <div className="min-h-screen px-4 py-10 bg-gray-50">
//       <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow">
//         <div className="flex items-center gap-6">
//           <img
//             src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
//             alt="avatar"
//             className="w-20 h-20 rounded-full"
//           />
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//             <p className="text-sm text-gray-500">{user.email}</p>
//             <span className={getRoleBadge(user.role)}>{user.role}</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mt-6 text-center">
//           <div>
//             <p className="text-lg font-semibold text-indigo-700">{user.problemsSolved}</p>
//             <p className="text-sm text-gray-600">Problems Solved</p>
//           </div>
//           <div>
//             <p className="text-lg font-semibold text-indigo-700">{user.submissions}</p>
//             <p className="text-sm text-gray-600">Submissions</p>
//           </div>
//           <div>
//             <p className="text-lg font-semibold text-indigo-700">#{user.rank}</p>
//             <p className="text-sm text-gray-600">Global Rank</p>
//           </div>
//         </div>

//         <div className="flex gap-3 mt-6">
//           <button
//             onClick={() => console.log("Edit profile")}
//             className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
//           >
//             Edit Profile
//           </button>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
