function startCountdown(targetDate) {
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = "Event Started!";
            clearInterval(timer);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
}

// Set the target date (example: nov. 21, 2025)
const targetDate = new Date("Nov. 21, 2025 23:59:59").getTime();
startCountdown(targetDate);

function toggleText() {
    const textElement = document.getElementById("text");
    if (textElement.style.display === "none" || textElement.style.display === "") {
        textElement.style.display = "block";
    } else {
        textElement.style.display = "none";
    }
}

// Posts a comment as a GitHub issue (requires valid name and comment)
function postCommentToGitHub(name, comment) {
    const issueData = {
        title: `Comment from ${name}`,
        body: comment,
    };

    fetch("https://api.github.com/repos/OWNER/REPO/issues", {
        method: "POST",
        headers: {
            "Authorization": "Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(issueData)
    })
        .then(response => {
            if (!response.ok) throw new Error("GitHub API error");
            return response.json();
        })
        .then(() => alert("Comment posted as GitHub issue!"))
        .catch(() => alert("Error posting comment to GitHub."));
}
