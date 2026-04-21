// ---------------- 2026 OFFICIAL MATCHUPS ----------------
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

// ---------------- HELPERS ----------------
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

// ---------------- BRACKET WIZARD ----------------
function saveRound1() {
    const r1_winners = r1_matchups.map(m => document.getElementById(m.id).value);
    if (r1_winners.includes("")) {
        document.getElementById("error").textContent = "Select all 8 winners!";
        return;
    }
    // Dynamic pairing for Round 2 based on R1 winners
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
    const data = {
        finals: [document.getElementById("f1").value, document.getElementById("f2").value],
        champion: champ
    };
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

// ---------------- INITIALIZATION ----------------
window.onload = () => {
    if (document.getElementById("r1_s1")) {
        r1_matchups.forEach(m => fillDropdown(m.id, m.teams));
        displayBracket();
    }
};