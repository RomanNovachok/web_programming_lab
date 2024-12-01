document.addEventListener('DOMContentLoaded', function() {
    loadListings();
    loadRentedListings();
    document.getElementById('listingForm').addEventListener('submit', createListing);
    document.getElementById('editForm').addEventListener('submit', saveEdit);
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function loadListings() {
    fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        const listingsContainer = document.getElementById('allListings');
        listingsContainer.innerHTML = '';  // Очищаємо старі оголошення
        
        data.products.forEach(product => {
            const isRented = rentedProducts.includes(product._id); // Перевіряємо, чи продукт вже орендований

            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.imageLink}" alt="${product.name}">           
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ${product.priceInGrn}грн</p>
                <button onclick="rentProduct('${product._id}')" data-rented="${isRented}">
                    ${isRented ? 'Rented' : 'Rent'}
                </button>
                <button onclick="editListing('${product._id}')">Edit</button>
                <button onclick="deleteListing('${product._id}')">Delete</button>
            `;

            // Змінюємо колір кнопки, якщо продукт орендований
            const rentButton = productItem.querySelector('button[data-rented]');
            if (isRented) {
                rentButton.style.backgroundColor = 'gray';
            }

            listingsContainer.appendChild(productItem);
        });
    })
    .catch(error => console.error('Error loading listings:', error));
}



function createListing(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('listingForm'));

    // Створюємо об'єкт з полями форми
    const dataObject = {
        name: formData.get("name"),
        description: formData.get("description"),
        priceInGrn: formData.get("price"),
        imageLink: formData.get("image_url")  
    };

    // Виконуємо запит на сервер
    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObject) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            loadListings();  // Оновлюємо список оголошень
            showSection('equipment');  // Показуємо відповідний розділ
        } else {
            console.error('Error creating listing');  // Виводимо помилку в консоль
        }
    })
    .catch(error => console.error('Error:', error));  // Обробляємо помилки

    alert("Оголошення успішно додано, оновіть сторінку, щоб побачити його")
}


function editListing(id) {

    fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Переконайся, що властивості правильно названі
        document.getElementById('editItemId').value = data.product._id; // Звертаємося до _id
        document.getElementById('editItemName').value = data.product.name;
        document.getElementById('editItemDescription').value = data.product.description;
        document.getElementById('editItemPrice').value = data.product.priceInGrn; 
        document.getElementById('editItemImageUrl').value = data.product.imageLink;
        
        // Показуємо модальне вікно
        document.getElementById('editModal').style.display = 'block';
    })
    .catch(error => console.error('Error fetching product data:', error));
}

function deleteListing(id) {
    if (confirm('Ви впевнені, що хочете видалити це оголошення?')) {
        fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Оголошення видалено:', data);

            // Видаляємо продукт з орендованих, якщо він там є
            rentedProducts = rentedProducts.filter(productId => productId !== id);
            localStorage.setItem('rentedProducts', JSON.stringify(rentedProducts));

            loadListings();  // Оновлюємо список оголошень
            loadRentedListings();  // Оновлюємо орендовані оголошення
            calculateTotalRentPrice();  // Оновлюємо загальну суму орендованих товарів
        })
        .catch(error => console.error('Помилка при видаленні оголошення:', error));
    }
}



function saveEdit() {
    const id = document.getElementById("editItemId").value;  // Зчитуємо id
    const name = document.getElementById("editItemName").value;
    const description = document.getElementById("editItemDescription").value;
    const priceInGrn = document.getElementById("editItemPrice").value;
    const imageLink = document.getElementById("editItemImageUrl").value;

    const dataObject = {
        name,
        description,
        priceInGrn,
        imageLink
    };

    fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObject)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Продукт оновлено:", data);
        loadListings();  // Оновлюємо список продуктів
        closeModal();    // Закриваємо модальне вікно
    })
    .catch(error => console.error('Помилка при оновленні продукту:', error));
}



function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function rentListing(id) {
    fetch(`http://localhost:3000/api/products/rent/${id}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            loadRentedListings();
            showSection('rented');
        });
}

function loadRentedListings() {
    const rentedListingsContainer = document.getElementById('rentedListings');
    rentedListingsContainer.innerHTML = ''; // Очищуємо контейнер

    rentedProducts.forEach(productId => {
        // Тут потрібно отримати інформацію про продукт з бази даних або з глобального масиву продуктів
        const product = products.find(item => item._id === productId); // products - ваш масив оголошень

        if (product) {
            const listing = document.createElement('div');
            listing.className = 'listing';
            listing.innerHTML = `
                <img src="${product.imageLink}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>${product.priceInGrn} грн</p>
                </div>
                <div>
                    <button onclick="editListing('${product._id}')">Edit</button>
                    <button onclick="deleteListing('${product._id}')">Delete</button>
                </div>
            `;
            rentedListingsContainer.appendChild(listing);
        }
    });
}



let isAscending = true; // Змінна для відстеження напрямку сортування

function sortListingsByPrice() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            // Сортуємо оголошення в залежності від напрямку
            data.products.sort((a, b) => {
                if (isAscending) {
                    return a.priceInGrn - b.priceInGrn; // За зростанням
                } else {
                    return b.priceInGrn - a.priceInGrn; // За спаданням
                }
            });

            // Оновлюємо перемінну для наступного сортування
            isAscending = !isAscending;

            const listingsContainer = document.getElementById('allListings');
            listingsContainer.innerHTML = ''; // Очищаємо контейнер

            data.products.forEach(item => {
                const listing = document.createElement('div');
                listing.className = 'listing';
                listing.innerHTML = `
                    <img src="${item.imageLink}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>${item.priceInGrn} грн</p>
                   
                        <button onclick="editListing('${item._id}')">Edit</button>
                        <button onclick="rentProduct('${item._id}')">Rent</button> 
                        <button onclick="deleteListing('${item._id}')">Delete</button>
                `;
                listingsContainer.appendChild(listing);
            });
        })
        .catch(error => console.error('Помилка при сортуванні оголошень:', error));
}



function filterListings() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        const name = listing.querySelector('h3').textContent.toLowerCase();
        const description = listing.querySelector('p').textContent.toLowerCase();
        if (name.includes(query) || description.includes(query)) {
            listing.style.display = 'flex';
        } else {
            listing.style.display = 'none';
        }
    });
}



let rentedProducts = JSON.parse(localStorage.getItem('rentedProducts')) || [];

function rentProduct(productId) {
    const productButton = document.querySelector(`button[onclick="rentProduct('${productId}')"]`);

    // Перевіряємо, чи товар вже орендований
    const isRented = rentedProducts.includes(productId);

    if (!isRented) {
        // Додаємо товар до списку орендованих
        rentedProducts.push(productId);
        productButton.textContent = 'Rented';
        productButton.style.backgroundColor = 'gray';
    } else {
        // Видаляємо товар зі списку орендованих
        rentedProducts = rentedProducts.filter(id => id !== productId);
        productButton.textContent = 'Rent';
        productButton.style.backgroundColor = '';
    }

    // Зберігаємо оновлений список в localStorage
    localStorage.setItem('rentedProducts', JSON.stringify(rentedProducts));

    // Оновлюємо списки та загальну суму
    loadListings();
    loadRentedListings();
    calculateTotalRentPrice();  // Оновлення загальної суми після змін
}




// Функція для відображення орендованих оголошень
function loadRentedListings() {
    const rentedListingsContainer = document.getElementById('rentedListings');
    rentedListingsContainer.innerHTML = ''; // Очищаємо контейнер

    // Перевіряємо, чи є орендовані продукти
    if (rentedProducts.length === 0) {
        rentedListingsContainer.innerHTML = '<p>У вас немає орендованих продуктів.</p>';
        return;
    }

    // Вибираємо орендовані продукти з API
    fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        const rentedItems = data.products.filter(product => rentedProducts.includes(product._id));

        rentedItems.forEach(product => {
            const listing = document.createElement('div');
            listing.className = 'listing';
            listing.innerHTML = `
                <img src="${product.imageLink}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>${product.priceInGrn} грн</p>
                    <button onclick="editListing('${product._id}')">Edit</button>
                    <button onclick="deleteListing('${product._id}')">Delete</button>
                    <button onclick="rentProduct('${product._id}')">${rentedProducts.includes(product._id) ? 'Remove from Rent' : 'Rent'}</button>
            `;
            rentedListingsContainer.appendChild(listing);
        });
    })
    .catch(error => console.error('Помилка завантаження орендованих продуктів:', error));
}

function calculateTotalRentPrice() {
    let total = 0;

    // Одержуємо орендовані товари з API
    fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        // Фільтруємо товари, які є в списку орендованих (збереженому в `rentedProducts`)
        const rentedItems = data.products.filter(product => rentedProducts.includes(product._id));

        // Підсумовуємо вартість орендованих товарів
        rentedItems.forEach(product => {
            total += product.priceInGrn;  // Припускається, що товар має поле `priceInGrn`
        });

        // Оновлюємо значення в HTML
        document.getElementById('totalRentPrice').textContent = total.toFixed(2); // Оновлення суми з двома знаками після коми
    })
    .catch(error => console.error('Помилка при підрахунку загальної суми:', error));
}


window.onload = function() {
    // Викликаємо функцію для обчислення загальної суми оренди під час завантаження сторінки
    calculateTotalRentPrice();
};
