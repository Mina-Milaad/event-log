document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://dm.s-badge.com/api/Authentication/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (res.ok && data.succeeded && data.data?.token) {
      // خزّن التوكن والرولات
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("roles", JSON.stringify(data.data.roles));

      // لو فيها Admin → dashboard
      if (data.data.roles.includes("Admin")) {
        window.location.href = "dashboard.html";
      } else {
        alert("You are not authorized to view this page");
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong, please try again.");
  }
});
