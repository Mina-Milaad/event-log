// const token = localStorage.getItem("token");

// // ✅ لو مفيش توكن رجع لصفحة اللوجين
// if (!token) {
//   window.location.href = "login.html";
// }

// // جلب الـ logs
// async function fetchLogs() {
//   try {
//     const res = await fetch("https://dm.s-badge.com/api/logs", {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     const logs = await res.json();
//     renderLogs(logs);
//   } catch (err) {
//     console.error("Error fetching logs:", err);
//     document.getElementById("logsContainer").innerText = "Failed to load logs.";
//   }
// }

// // عرض الـ logs
// function renderLogs(logs) {
//   const container = document.getElementById("logsContainer");
//   container.innerHTML = "";

//   if (!logs || logs.length === 0) {
//     container.innerText = "No logs found.";
//     return;
//   }

//   logs.forEach(log => {
//     const card = document.createElement("div");
//     card.classList.add("log-card");

//     // loop على الـ object بحيث يعرض بس القيم اللي مش فاضية
//     Object.entries(log).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== "" && value !== "null") {
//         const field = document.createElement("p");
//         field.innerHTML = `<strong>${key}:</strong> ${typeof value === "object" ? JSON.stringify(value) : value}`;
//         card.appendChild(field);
//       }
//     });

//     container.appendChild(card);
//   });
// }

// // زرار اللوج آوت
// document.getElementById("logoutBtn").addEventListener("click", () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
//   window.location.href = "login.html";
// });

// // أول ما الصفحة تفتح → هات اللوجات
// fetchLogs();
