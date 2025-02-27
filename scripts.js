//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valoro atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    // Transforma o valor em centavos.
    value = Number(value) / 100

    // Atualiza o valor do input
    amount.value = formatCurrencyBrl(value);
}

function formatCurrencyBrl(value) {
    //Formata o valor no padrão BRL (Real brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    // Retorna o valor formatado
    return value;
}

//Captura o evento de submit do formulário apra obter os vlaores.
form.onsubmit = () => {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault()

    //Cria um objeto com os detalhes na nova despesa.

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    //Chama a função que adicionará o item na lista
    expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        //Cria o elemento para adicionar na lista para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense")

        //Cria o ícone da categoria.
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `assets/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        // Cria a info da despesa
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        //Cria o nome da despesa.
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa.
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name;

        // Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory);

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o ícone de remover
        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "assets/remove.svg");
        removeIcon.setAttribute("alt","remover");
        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista
        expenseList.append(expenseItem);
    } catch(error) {
        alert("Não foi possivel atualizar a lista de despesas")
        console.log(error)
    }

    //Atualiza os totais
    updateTotals()
}

// Atualiza os totais
function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        // Atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} 
        ${items.length > 1 ? "despesas" : "despesa"}`
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais")
    }
}