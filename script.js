const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const history = document.getElementById("history");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balance = document.getElementById("balance");
const text = document.getElementById("text");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function renderTransactions() {

    history.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {

        const li = document.createElement("li");

        li.classList.add("transaction");

        li.innerHTML = `
            <span>
                <strong>${transaction.title}</strong><br>
                <small>${transaction.date}</small>
            </span>

            <span style="color:${transaction.type === "income" ? "var(--income)" : "var(--expense)"};">
                ${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}
            </span>
        `;

        history.prepend(li);

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });

    totalIncome.textContent = `₹${income}`;
    totalExpense.textContent = `₹${expense}`;
    balance.textContent = `₹${income - expense}`;
}

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

    const transaction = {
        title,
        amount: amt,
        type: type.value,
        date: formattedDate
    };

    transactions.push(transaction);

    saveTransactions();

    renderTransactions();

    text.value = "";
    amount.value = "";
});

renderTransactions();
