const r1_matchups = [
    { id: "r1_s1", teams: ["Buffalo Sabres", "Boston Bruins"] },
    { id: "r1_s2", teams: ["Tampa Bay Lightning", "Montreal Canadiens"] },
    { id: "r1_s3", teams: ["Carolina Hurricanes", "Ottawa Senators"] },
    { id: "r1_s4", teams: ["Pittsburgh Penguins", "Philadelphia Flyers"] },
    { id: "r1_s5", teams: ["Colorado Avalanche", "Los Angeles Kings"] },
    { id: "r1_s6", teams: ["Dallas Stars", "Minnesota Wild"] },
    { id: "r1_s7", teams: ["Vegas Golden Knights", "Utah Mammoth"] },
    { id: "r1_s8", teams: ["Edmonton Oilers", "Anaheim Ducks"] }
];

const allTeams = [
    { name: "Buffalo Sabres", url: "https://www.espn.com/nhl/team/_/name/buf/buffalo-sabres" },
    { name: "Boston Bruins", url: "https://www.espn.com/nhl/team/_/name/bos/boston-bruins" },
    { name: "Tampa Bay Lightning", url: "https://www.espn.com/nhl/team/_/name/tb/tampa-bay-lightning" },
    { name: "Montreal Canadiens", url: "https://www.espn.com/nhl/team/_/name/mtl/montreal-canadiens" },
    { name: "Carolina Hurricanes", url: "https://www.espn.com/nhl/team/_/name/car/carolina-hurricanes" },
    { name: "Ottawa Senators", url: "https://www.espn.com/nhl/team/_/name/ott/ottawa-senators" },
    { name: "Pittsburgh Penguins", url: "https://www.espn.com/nhl/team/_/name/pit/pittsburgh-penguins" },
    { name: "Philadelphia Flyers", url: "https://www.espn.com/nhl/team/_/name/phi/philadelphia-flyers" },
    { name: "Colorado Avalanche", url: "https://www.espn.com/nhl/team/_/name/col/colorado-avalanche" },
    { name: "Los Angeles Kings", url: "https://www.espn.com/nhl/team/_/name/la/los-angeles-kings" },
    { name: "Dallas Stars", url: "https://www.espn.com/nhl/team/_/name/dal/dallas-stars" },
    { name: "Minnesota Wild", url: "https://www.espn.com/nhl/team/_/name/min/minnesota-wild" },
    { name: "Vegas Golden Knights", url: "https://www.espn.com/nhl/team/_/name/vgs/vegas-golden-knights" },
    { name: "Utah Mammoth", url: "https://www.espn.com/nhl/team/_/name/utah/utah-mammoth" },
    { name: "Edmonton Oilers", url: "https://www.espn.com/nhl/team/_/name/edm/edmonton-oilers" },
    { name: "Anaheim Ducks", url: "https://www.espn.com/nhl/team/_/name/ana/anaheim-ducks" }
];

const quizData = [
    { q: "What is it called when a player scores three goals in one game?", a: ["Power Play", "Hat Trick", "Home Run"], correct: 1 },
    { q: "Which team has won the most Stanley Cups in NHL history?", a: ["Montreal Canadiens", "Toronto Maple Leafs", "Boston Bruins"], correct: 0 },
    { q: "How many players (including the goalie) are on the ice for one team during regular play?", a: ["5", "6", "11"], correct: 1 },
    { q: "What is the name of the trophy awarded to the NHL champion?", a: ["The Super Bowl", "The World Cup", "The Stanley Cup"], correct: 2 },
    { q: "Which of these is the nickname of hockey legend Wayne Gretzky?", a: ["The Great One", "The Rocket", "Sid the Kid"], correct: 0 }
];

let currentQuestion = 0;
let userScore = 0;

function fillDropdown(id, list) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = "<option value=''>Select Team</option>";
    list.forEach(team => {
        const option = document.createElement("option");
        option.value = team;
        option.textContent = team;
        el.appendChild(option);
    });
}

function saveRound1() {
    const r1_winners = r1_matchups.map(m => document.getElementById(m.id).value);
    if (r1_winners.includes("")) {
        document.getElementById("error").textContent = "Select all 8 winners!";
        return;
    }
    fillDropdown("r2_w1", [r1_winners[0], r1_winners[1]]);
    fillDropdown("r2_w2", [r1_winners[2], r1_winners[3]]);
    fillDropdown("r2_w3", [r1_winners[4], r1_winners[5]]);
    fillDropdown("r2_w4", [r1_winners[6], r1_winners[7]]);
    document.getElementById("step1").style.opacity = "0.4";
    document.getElementById("step2").style.display = "block";
    document.getElementById("error").textContent = "";
}

function saveRound2() {
    const r2_winners = ["r2_w1", "r2_w2", "r2_w3", "r2_w4"].map(id => document.getElementById(id).value);
    if (r2_winners.includes("")) {
        document.getElementById("error").textContent = "Select all 4 winners!";
        return;
    }
    fillDropdown("f1", [r2_winners[0], r2_winners[1]]); 
    fillDropdown("f2", [r2_winners[2], r2_winners[3]]);
    document.getElementById("step2").style.opacity = "0.4";
    document.getElementById("step3").style.display = "block";
}

function saveFinals() {
    const finalists = [document.getElementById("f1").value, document.getElementById("f2").value];
    if (finalists.includes("")) {
        document.getElementById("error").textContent = "Select both Champions!";
        return;
    }
    fillDropdown("champion", finalists);
    document.getElementById("step3").style.opacity = "0.4";
    document.getElementById("step4").style.display = "block";
}

function saveChampion() {
    const champ = document.getElementById("champion").value;
    if (!champ) return;
    const data = { finals: [document.getElementById("f1").value, document.getElementById("f2").value], champion: champ };
    localStorage.setItem("bracket2026", JSON.stringify(data));
    displayBracket();
}

function displayBracket() {
    const data = JSON.parse(localStorage.getItem("bracket2026"));
    const display = document.getElementById("savedBracket");
    if (data && display) {
        display.innerHTML = `<div class="card"><h3>🏆 Final 2026 Prediction</h3><p>${data.finals[0]} vs ${data.finals[1]}</p><h2 style="color:gold;">Winner: ${data.champion}</h2></div>`;
    }
}

function loadTeams() {
    const teamListDiv = document.getElementById("teamList");
    if (!teamListDiv) return;
    allTeams.forEach(team => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<a href="${team.url}" target="_blank" style="color:white; text-decoration:none;"><h3>${team.name} 🔗</h3></a>`;
        teamListDiv.appendChild(card);
    });
}

function loadQuiz() {
    const questionEl = document.getElementById("question");
    const optionsDiv = document.getElementById("options");
    const scoreEl = document.getElementById("score");
    if (!questionEl || !optionsDiv) return;

    if (currentQuestion >= quizData.length) {
        questionEl.textContent = "Quiz Complete!";
        optionsDiv.innerHTML = "";
        scoreEl.innerHTML = `<h2>Final Score: ${userScore} / ${quizData.length}</h2>`;
        return;
    }

    const current = quizData[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1}: ${current.q}`;
    optionsDiv.innerHTML = "";
    
    current.a.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.style.display = "block";
        btn.style.margin = "10px auto";
        btn.onclick = () => {
            if (index === current.correct) {
                userScore++;
                scoreEl.textContent = "✅ Correct!";
            } else {
                scoreEl.textContent = "❌ Wrong!";
            }
            // Move to next question after 1 second delay
            setTimeout(() => {
                currentQuestion++;
                scoreEl.textContent = "";
                loadQuiz();
            }, 1000);
        };
        optionsDiv.appendChild(btn);
    });
}

window.onload = () => {
    if (document.getElementById("r1_s1")) {
        r1_matchups.forEach(m => fillDropdown(m.id, m.teams));
        displayBracket();
    }
    if (document.getElementById("teamList")) {
        loadTeams();
    }
    if (document.getElementById("question")) {
        loadQuiz();
    }
};
