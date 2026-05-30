const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const history = document.getElementById("history");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const balance = document.getElementById("balance");
const text = document.getElementById("text");
const category = document.getElementById("category");

let editId = null;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//clear from state
function clearInputs() {
    text.value = "";
    amount.value = "";
    editId = null;
    addBtn.textContent = "Add Transaction";
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function renderTransactions() {
    history.innerHTML = "";

    if (transactions.length === 0) {
        history.innerHTML = `
            <p style="text-align:center; opacity:0.6;">
                No transactions yet
            </p>
        `;
    }

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
        const li = document.createElement("li");
        li.classList.add("transaction");

        li.innerHTML = `
            <span>
                <strong>${transaction.title}</strong><br>
                <small>${transaction.date} • ${transaction.category}</small>
            </span>

            <span style="color:${transaction.type === "income" ? "var(--income)" : "var(--expense)"}; font-weight: bold;">
                ${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}
            </span>

            <div class="actions">
                <button class="edit-btn" data-id="${transaction.id}">✏️</button>
                <button class="delete-btn" data-id="${transaction.id}">❌</button>
            </div>
        `;

        history.prepend(li);

        if (transaction.type === "income") {
            income += Number(transaction.amount);
        } else {
            expense += Number(transaction.amount);
        }
    });

    totalIncome.textContent = `₹${income}`;
    totalExpense.textContent = `₹${expense}`;
    balance.textContent = `₹${income - expense}`;
}


history.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    const editBtn = e.target.closest(".edit-btn");

    if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        transactions = transactions.filter(t => Number(t.id) !== id);

        if (editId === id) {
            clearInputs();
        }

        saveTransactions();
        renderTransactions();
    }

    if (editBtn) {
        const id = Number(editBtn.dataset.id);
        const txn = transactions.find(t => Number(t.id) === id);
        if (!txn) return;
        
        text.value = txn.title;
        category.value = txn.category;
        amount.value = txn.amount;
        type.value = txn.type;

        editId = id;
        addBtn.textContent = "Update Transaction"; 
    }
});

// Light / Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
} 
else {
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

addBtn.addEventListener("click", () => {
    const title = text.value.trim();
    const amt = Number(amount.value);

    if (title === "" || isNaN(amt) || amt <= 0) {
        alert("Please enter a valid title and positive amount");
        return;
    }

    if (editId != null) {
        transactions = transactions.map(t => {
            if (Number(t.id) === editId) {
                return {
                    ...t,
                    title,
                    amount: amt,
                    type: type.value,
                    category: category.value
                };
            }
            return t;
        });
    } else {
        const transaction = {
            id: Date.now(),
            title,
            amount: amt,
            type: type.value,
            category: category.value,
            date: new Date().toLocaleDateString()
        };
        transactions.push(transaction);
    }

    saveTransactions();
    renderTransactions();
    clearInputs();
});

// Bootstrapping initial state 
renderTransactions();