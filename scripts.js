//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
}