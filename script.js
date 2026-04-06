let expenseArray = [];


const form = document.querySelector('form')

form.addEventListener('submit', createExpenseObject)

function createExpenseObject(e){
    e.preventDefault()
    const formData = new FormData(form);
    const descriptionInput = formData.get('description')
    const amountInput = formData.get('amount')
    const categoryInput = formData.get('category')
    const currentDate = new Date()
    const expenseObject = {
        description: descriptionInput,
        amount: amountInput,
        category: categoryInput,
        date: currentDate.toString(),
        id: crypto.randomUUID()
    }
    expenseArray.push(expenseObject)
    console.log(expenseArray)
    renderExpenses(expenseArray)
    renderTotalSpent(expenseArray)
}

function renderTotalSpent(arr){
 const totalSpent = arr.reduce(function(total, currentAmount){

    if(currentAmount.category === 'income'){
        currentAmount.amount = +Number(currentAmount.amount)
    }
        return total + Number(currentAmount.amount)
 }, 0)
         console.log(totalSpent)

 document.getElementById('total-spent-p').textContent = "Total Spent: $" + totalSpent
}




function renderExpenses(arr){
const tbody = document.getElementById('expense-body');
tbody.innerHTML = ''
    arr.forEach(function(expenseItem){
        const row = document.createElement('tr')
        row.innerHTML = `<td>${expenseItem.description}</td>
                        <td>${expenseItem.amount}</td>
                        <td>${expenseItem.category}</td>
                        <td>${expenseItem.date}</td>
                        <td><button>Delete Item</button></td>
                        ` ;
        tbody.append(row);
    })
}