
let products = [];
let myChart;

function addProduct() {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCategory = document.getElementById("productCategory").value;
    const productRating = document.getElementById("productRating").value;

    const product = {
        name: productName,
        price: productPrice,
        category: productCategory,
        rating: productRating
    };

    products.push(product);

    displayProducts();
    updateChart();
    clearForm();
}

function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>${product.rating}</td>
                <td>
                    <button onclick="editProduct(${index})" class="btn btn-warning btn-sm">Edit</button>
                    <button onclick="deleteProduct(${index})" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
        productList.innerHTML += row;
    });
}

function editProduct(index) {
    const product = products[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productRating").value = product.rating;

    products.splice(index, 1);
    displayProducts();
    updateChart();
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    updateChart();
}

function clearForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";
    document.getElementById("productRating").value = "";
}

function updateChart() {
    if (myChart) {
        myChart.destroy(); 
    }

    const chartCanvas = document.getElementById("chart");
    const ctx = chartCanvas.getContext("2d");

    const productNames = products.map(product => product.name);
    const productPrices = products.map(product => parseFloat(product.price));

    const chartData = {
        labels: productNames,
        datasets: [{
            label: 'Product Prices',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: productPrices,
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
}
