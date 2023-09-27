document.addEventListener("DOMContentLoaded", function () {
    const expenseList = document.getElementById("expense-list");
    const addExpenseButton = document.getElementById("add-expense");

    // Function to create an expense item
    function createExpenseItem(expense) {
        const listItem = document.createElement("li");
        listItem.className = "expense-item";
        listItem.innerHTML = `
            <span>${expense.description} - ${expense.category} - Rs.${expense.amount}</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;

        // Attach event listeners to edit and delete buttons
        const editButton = listItem.querySelector(".edit-button");
        const deleteButton = listItem.querySelector(".delete-button");

        editButton.addEventListener("click", function () {
            // Implement edit functionality here
            const updatedExpense = prompt("Edit expense:", `${expense.description} - ${expense.category} - $${expense.amount}`);
            if (updatedExpense !== null) {
                const [description, category, amount] = updatedExpense.split(" - ");
                expense.description = description;
                expense.category = category;
                expense.amount = parseFloat(amount.replace("Rs.", ""));
                listItem.querySelector("span").textContent = `${expense.description} - ${expense.category} - $${expense.amount}`;
            }
        });

        deleteButton.addEventListener("click", function () {
            // Implement delete functionality here
            if (confirm("Are you sure you want to delete this expense?")) {
                listItem.remove();
                expenses.splice(expenses.indexOf(expense), 1);
                updateLocalStorage();
            }
        });

        return listItem;
    }

    // Function to add an expense to the list
    function addExpenseToList(expense) {
        const listItem = createExpenseItem(expense);
        expenseList.appendChild(listItem);
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Load existing expenses from local storage
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Add existing expenses to the list
    expenses.forEach(addExpenseToList);

    // Handle the "Add Expense" button click
    addExpenseButton.addEventListener("click", function () {
        const amountInput = document.getElementById("expense-amount");
        const descriptionInput = document.getElementById("expense-description");
        const categoryInput = document.getElementById("expense-category");

        const amount = parseFloat(amountInput.value);
        const description = descriptionInput.value;
        const category = categoryInput.value;

        if (!isNaN(amount) && description && category) {
            const newExpense = { amount, description, category };
            expenses.push(newExpense);
            addExpenseToList(newExpense);
            updateLocalStorage();

            // Clear input fields
            amountInput.value = "";
            descriptionInput.value = "";
            categoryInput.value = "";
        } else {
            alert("Please fill in all fields correctly.");
        }
    });
});
