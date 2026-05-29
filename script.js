const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const history = document.getElementById("history");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balance = document.getElementById("balance");

let income = 0;
let expense = 0;

// Light / Dark Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

// Add Transaction
addBtn.addEventListener("click", () => {
    const title = text.value.trim();
    const amt = Number(amount.value);

    if (title === "" || amount.value === "") {
        alert("Please enter valid details");
        return;
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    const li = document.createElement("li");
    li.classList.add("transaction");
    li.innerHTML = `
        <span>
            <strong>${title}</strong><br>
            <small>${formattedDate}</small>
        </span>
        <span style="color:${type.value === "income" ? "var(--income)" : "var(--expense)"};">
            ${type.value === "income" ? "+" : "-"} ₹${amt}
        </span>
    `;

    history.prepend(li);

    if (type.value === "income") {
        income += amt;
    } else {
        expense += amt;
    }

    updateSummary();

    text.value = "";
    amount.value = "";
});

// Update Summary
function updateSummary() {
    totalIncome.textContent = `₹${income}`;
    totalExpense.textContent = `₹${expense}`;
    balance.textContent = `₹${income - expense}`;
}
