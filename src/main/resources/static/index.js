console.log("Finance Tracker loaded!");

const API_URL = 'http://localhost:8080/api';

async function loadAnalytics() {
    try {

        const balanceRes = await fetch(`${API_URL}/analytics/balance`);
        const balance = await balanceRes.json();
        document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

        const incomeRes = await fetch(`${API_URL}/analytics/total-income`);
        const income = await incomeRes.json();
        document.getElementById('income').textContent = `$${income.toFixed(2)}`;

        const expensesRes = await fetch(`${API_URL}/analytics/total-expenses`);
        const expenses = await expensesRes.json();
        document.getElementById('expenses').textContent = `$${expenses.toFixed(2)}`;

    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        const transactions = await response.json();

        const list = document.getElementById('transactions-list');

        if (transactions.length === 0) {
            list.innerHTML = '<p>No transactions yet.</p>';
            return;
        }

        list.innerHTML = transactions.map(t => `
            <div class="transaction-item ${t.type}">
                <div>
                    <strong>${t.description}</strong>
                    <small>${t.category ? t.category.name : 'No category'}</small>
                </div>
                <div>
                    <span class="transaction-amount ${t.type}">
                        ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}
                    </span>
                    <small>${t.date}</small>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading transactions:', error);
        document.getElementById('transactions-list').innerHTML =
            '<p>Error loading transactions.</p>';
    }
}

async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        const categories = await response.json();

        const select = document.getElementById('category');
        select.innerHTML = '<option value="">Select category</option>';

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

document.getElementById('date').valueAsDate = new Date();

document.getElementById('transaction-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const transaction = {
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        date: document.getElementById('date').value,
        type: document.getElementById('type').value,
        category: {
            id: parseInt(document.getElementById('category').value)
        }
    };

    try {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });

        if (response.ok) {
            alert('Transaction added successfully! ✅');

            // Reset form
            document.getElementById('transaction-form').reset();
            document.getElementById('date').valueAsDate = new Date();

            // Reload data
            loadAnalytics();
            loadTransactions();
        } else {
            alert('Error adding transaction ❌');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding transaction ❌');
    }
});

loadAnalytics();
loadTransactions();
loadCategories();