function calcAdd(valor) {
    valor = valor + (valor * (4.3 / 100));
    return valor.toFixed(2)
}

function humanDate(d) {
    const [date, hour] = d.split('T')
    return `${date.split('-').reverse().join('/')} ${hour.slice(0, -1)}`
}

function checkEntrega(entrega){
    if(entrega){
        return "Sim";
    }else{
        return "Não";
    }
}

function renderItem(item) {
    return (
        `<tr>
            <td>${item.codigo}</td>
            <td>${item.cliente.nome}</td>
            <td>R$ ${item.valor}</td>
            <td>R$ ${calcAdd(item.valor)}</td>
            <td>${humanDate(item.data)}</td>
            <td><button data-id="${item.id}">Ver</button></td>
        </tr>`
    )
}

function viewItem(item) {
    return (
        `<table class="viewItem">
            <tr>
                <td>Código</td>
                <td>${item.codigo}</td>
            </tr>
            <tr>
                <td>Nome do Cliente</td>
                <td>${item.cliente.nome}</td>
            </tr>
            <tr>
                <td>Valor</td>
                <td>R$ ${item.valor}</td>
            </tr>
            <tr>
                <td>Valor Final</td>
                <td>R$ ${calcAdd(item.valor)}</td>
            </tr>
            <tr>
                <td>Entregue</td>
                <td>${checkEntrega(item.entregue)}</td>
            </tr>
            <tr>
                <td>Data de Entrega</td>
                <td>${humanDate(item.data)}</td>
            <tr>
        </table>
         `
    )
}

function openItem(item) {
    Swal.fire({
        title: "Encomenda " + item.codigo,
        html: `${viewItem(item)}`,
        confirmButtonText: "Fechar",
    });
};

function render($element, data, page, perPage) {
    const offset = (page - 1) * perPage;
    const limit = offset + perPage;
    const result = data.slice(offset, limit).map(item => renderItem(item));
    console.log(result);
    $element.html(result);
}

function renderPage($element, page) {
    $element.html(page);
}

$(function () {
    let page = 1;
    let data = [];
    let totalPages = 0;
    const perPage = 4;
    const $tbody = $("#tbody");
    const $prev = $("#prev");
    const $next = $("#next");
    const $page = $("#page");

    renderPage($page, page);

    $prev.on("click", function () {
        if (page === 1) {
            return
        }
        page = page - 1;
        renderPage($page, page);
        render($tbody, data, page, perPage);
    })

    $next.on("click", function () {
        if (page === totalPages) {
            return
        }
        page = page + 1;
        renderPage($page, page);
        render($tbody, data, page, perPage);
    })

    $tbody.on("click", "button", function (e) {
        const item = data.find(i => i.id === $(e.target).data("id"));
        openItem(item);
    })
    $.ajax({
        url: 'http://localhost:3000/api/encomendas',
        success: function (json) {
            data = json.encomendas;
            totalPages = Math.round(data.length / perPage);
            render($tbody, data, page, perPage);
        },
        dataType: 'json'
    });
})