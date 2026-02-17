/*********************************
 * JOBS DATABASE (FAKE)
 *********************************/
 const jobs = [
    { id: 1, title: "Frontend Developer", company: "ABC Tech", location: "Remote" },
    { id: 2, title: "Backend Developer", company: "XYZ Solutions", location: "Bangalore" },
    { id: 3, title: "Web Designer", company: "Creative Studio", location: "Delhi" }
];

/*********************************
 * SHOW JOBS (JOBS PAGE)
 *********************************/
const jobsContainer = document.getElementById("jobsContainer");

if (jobsContainer) {
    const searchResults = JSON.parse(localStorage.getItem("searchResults"));
    const jobsToShow = searchResults && searchResults.length ? searchResults : jobs;

    jobsToShow.forEach(job => {
        const div = document.createElement("div");
        div.className = "job";
        div.onclick = () => viewJob(job.id);

        div.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>${job.location}</p>
            <button onclick="event.stopPropagation(); applyJob(${job.id})" class="primary-btn">
                Apply
            </button>
        `;

        jobsContainer.appendChild(div);
    });

    localStorage.removeItem("searchResults");
}

/*********************************
 * SEARCH JOBS (HOME PAGE)
 *********************************/
function searchJobs() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const keyword = input.value.toLowerCase();

    const results = jobs.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword)
    );

    localStorage.setItem("searchResults", JSON.stringify(results));
    window.location.href = "jobs.html";
}

/*********************************
 * VIEW JOB DETAILS
 *********************************/
function viewJob(id) {
    localStorage.setItem("selectedJobId", id);
    window.location.href = "job-details.html";
}

/*********************************
 * LOAD JOB DETAILS
 *********************************/
const jobTitleEl = document.getElementById("jobTitle");
if (jobTitleEl) {
    const id = localStorage.getItem("selectedJobId");
    const job = jobs.find(j => j.id == id);

    document.getElementById("jobTitle").innerText = job.title;
    document.getElementById("jobCompany").innerText = "Company: " + job.company;
    document.getElementById("jobLocation").innerText = "Location: " + job.location;
}

/*********************************
 * APPLY JOB (OPEN FORM)
 *********************************/
let currentJobId = null;

function applyJob(jobId) {
    currentJobId = jobId;
    document.getElementById("applyModal").style.display = "flex";
}

function closeApplyForm() {
    document.getElementById("applyModal").style.display = "none";
}

/*********************************
 * SUBMIT APPLICATION
 *********************************/
function submitApplication() {
    const name = document.getElementById("appName").value.trim();
    const phone = document.getElementById("appPhone").value.trim();
    const email = document.getElementById("appEmail").value.trim();
    const education = document.getElementById("appEducation").value.trim();
    const resumeFile = document.getElementById("appResume").files[0];

    if (!name || !phone || !email || !education || !resumeFile) {
        alert("Please fill all details");
        return;
    }

    const job = jobs.find(j => j.id === currentJobId);

    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    applications.push({
        jobId: job.id,
        jobTitle: job.title,
        name,
        phone,
        email,
        education,
        resume: resumeFile.name
    });

    localStorage.setItem("applications", JSON.stringify(applications));

    alert(
        "Application Submitted Successfully!\n\n" +
        "Job: " + job.title + "\n" +
        "Name: " + name + "\n" +
        "Email: " + email
    );

    closeApplyForm();
}

/*********************************
 * SHOW APPLIED JOBS PAGE
 *********************************/
const appliedContainer = document.getElementById("appliedJobsContainer");

if (appliedContainer) {
    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    applications.forEach(app => {
        const div = document.createElement("div");
        div.className = "job";
        div.innerHTML = `
            <h3>${app.jobTitle}</h3>
            <p>Name: ${app.name}</p>
            <p>Email: ${app.email}</p>
            <p>Education: ${app.education}</p>
            <p>Resume: ${app.resume}</p>
        `;
        appliedContainer.appendChild(div);
    });
}

/*********************************
 * USER REGISTRATION
 *********************************/
function register() {
    const name = document.getElementById("regName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !phone || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        alert("User already exists");
        return;
    }

    users.push({ name, phone, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful. Please login.");
    window.location.href = "login.html";
}

/*********************************
 * USER LOGIN
 *********************************/
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert("Login successful");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
}

/*********************************
 * SHOW USER NAME + LOGOUT
 *********************************/
const userNameSpan = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (loggedUser && userNameSpan) {
    userNameSpan.innerText = "Hi, " + loggedUser.name;
    logoutBtn.style.display = "inline-block";
}

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}
/*********************************
 * FEATURE CARDS CLICK HANDLING
 *********************************/
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".feature-card");

    cards.forEach(card => {
        card.addEventListener("click", function () {
            const action = this.getAttribute("data-action");

            console.log("Feature card clicked:", action);

            if (action === "jobs") {
                window.location.href = "jobs.html";
            }

            if (action === "account") {
                const loggedUser = localStorage.getItem("loggedUser");
                if (loggedUser) {
                    window.location.href = "index.html";
                } else {
                    window.location.href = "register.html";
                }
            }
        });
    });
});

