let expenseArray = [];
const form = document.querySelector('form')
const table = document.querySelector('table')
const hideText = document.getElementById('hide-text')
// event listners
form.addEventListener('submit', createExpenseObject)

document.addEventListener('click',function(e){
    if(e.target.dataset.id){
        handleDeleteBtn(e.target.dataset.id)
    }
})

// functions
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
        date: currentDate.toLocaleDateString(),
        id: crypto.randomUUID()
    }
    expenseArray.push(expenseObject)
    console.log(expenseArray)
    renderExpenses(expenseArray)
    renderTotalSpent(expenseArray)
    form.reset()
}

function renderTotalSpent(arr){
 const totalSpent = arr.reduce(function(total, currentAmount){
 const amount = Number(currentAmount.amount)
    if(currentAmount.category === 'income'){
        return total + amount
    }else{
        return total - amount 
    }
 }, 0)
         console.log(totalSpent)

 document.getElementById('total-spent-p').textContent = "Total Spent: $" + totalSpent
}

function renderExpenses(arr){
    hideText.style.display = 'none'
table.style.display = 'block'
const tbody = document.getElementById('expense-body');
tbody.innerHTML = ''
    arr.forEach(function(expenseItem){
        const row = document.createElement('tr')
        row.innerHTML = `<td>${expenseItem.description}</td>
                        <td>$${expenseItem.amount}</td>
                        <td>${expenseItem.category}</td>
                        <td>${expenseItem.date}</td>
                        <td><button data-id="${expenseItem.id}">Delete Item</button></td>
                        ` ;
        tbody.append(row);
    })
}

function handleDeleteBtn(id){
  expenseArray = expenseArray.filter(function(item){
      return id !== item.id
   })
renderExpenses(expenseArray)
renderTotalSpent(expenseArray)
}