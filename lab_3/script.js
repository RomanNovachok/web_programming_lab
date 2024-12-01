// Масив для зберігання оголошень
let allListings = [];
let rentedListings = [];
let isSortedAsc = true; // Прапорець для відстеження напрямку сортування

// Функція для відображення секції
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// Функція для додавання оголошення
document.getElementById('listingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').files[0];

    // Конвертуємо зображення в base64
    const reader = new FileReader();
    reader.readAsDataURL(itemImage);
    reader.onload = function() {
        const listing = {
            name: itemName,
            description: itemDescription,
            price: parseFloat(itemPrice),
            image: reader.result, // base64 зображення
            isRented: false
        };

        allListings.push(listing);
        displayListings();
        document.getElementById('listingForm').reset();
    };
});

// Функція для відображення оголошень з урахуванням пошуку
function displayListings() {
    const listingsContainer = document.getElementById('allListings');
    listingsContainer.innerHTML = '';

    // Отримуємо значення з пошукового поля
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();

    allListings.forEach((listing, index) => {
        if (listing.name.toLowerCase().includes(searchQuery)) { // Пошук за назвою
            const listingElement = document.createElement('div');
            listingElement.className = 'listing';
            listingElement.innerHTML = `
                <img src="${listing.image}" alt="${listing.name}">
                <div>
                    <strong>${listing.name}</strong>
                    <p>${listing.description}</p>
                    <p><strong>Ціна:</strong> ${listing.price} грн</p>
                </div>
                <div>
                    ${listing.isRented ? '<span>Орендовано</span>' : `<button onclick="rentItem(${index})">Орендувати</button>`}
                    <button onclick="openEditModal(${index})">Редагувати</button> <!-- Додаємо кнопку редагування -->
                </div>
            `;
            listingsContainer.appendChild(listingElement);
        }
        
    });
}

// Функція для сортування оголошень за ціною
function sortListingsByPrice() {
    allListings.sort((a, b) => isSortedAsc ? a.price - b.price : b.price - a.price);
    isSortedAsc = !isSortedAsc; // Змінюємо напрямок сортування
    displayListings(); // Оновлюємо відображення оголошень
}

// Функція для оренди обладнання
function rentItem(index) {
    if (!allListings[index].isRented) {
        allListings[index].isRented = true;
        rentedListings.push(allListings[index]);
        updateTotalRentPrice();
        displayListings();
        displayRentedListings();
    }
}

// Функція для відображення орендованого обладнання
function displayRentedListings() {
    const rentedContainer = document.getElementById('rentedListings');
    rentedContainer.innerHTML = '';

    rentedListings.forEach((listing, index) => {
        const rentedElement = document.createElement('div');
        rentedElement.className = 'listing';
        rentedElement.innerHTML = `
            <img src="${listing.image}" alt="${listing.name}">
            <div>
                <strong>${listing.name}</strong>
                <p>${listing.description}</p>
                <p><strong>Ціна:</strong> ${listing.price} грн</p>
            </div>
            <button onclick="removeItem(${index})">Видалити</button>
        `;
        rentedContainer.appendChild(rentedElement);
    });
}

// Функція для видалення оголошення з орендованих
function removeItem(index) {
    const removedItem = rentedListings.splice(index, 1)[0];

    // Знаходимо відповідне оголошення у масиві allListings і скидаємо статус оренди
    const originalItemIndex = allListings.findIndex(item => item.name === removedItem.name && item.price === removedItem.price);
    if (originalItemIndex !== -1) {
        allListings[originalItemIndex].isRented = false; // Знову дозволяємо орендувати
    }

    updateTotalRentPrice();
    displayListings(); // Оновлюємо список всього обладнання
    displayRentedListings(); // Оновлюємо список орендованого обладнання
}

// Функція для оновлення загальної суми оренди
function updateTotalRentPrice() {
    const totalRentPrice = rentedListings.reduce((total, listing) => total + listing.price, 0);
    document.getElementById('totalRentPrice').textContent = totalRentPrice.toFixed(2);
}

// Функція для фільтрації оголошень
function filterListings() {
    displayListings(); // Викликаємо оновлене відображення оголошень з урахуванням пошуку
}

let currentEditIndex = null;

// Function to open the modal for editing
function openEditModal(index) {
    currentEditIndex = index;
    const listing = allListings[index];
    
    // Pre-fill modal with existing data
    document.getElementById('editItemName').value = listing.name;
    document.getElementById('editItemDescription').value = listing.description;
    document.getElementById('editItemPrice').value = listing.price;
    
    // Show modal
    document.getElementById('editModal').style.display = "block";
}

// Close modal
function closeModal() {
    document.getElementById('editModal').style.display = "none";
}


// Update listing data on form submit
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const updatedName = document.getElementById('editItemName').value;
    const updatedDescription = document.getElementById('editItemDescription').value;
    const updatedPrice = parseFloat(document.getElementById('editItemPrice').value);
    const updatedImageFile = document.getElementById('editItemImage').files[0];

    if (!updatedName || !updatedDescription || isNaN(updatedPrice) || updatedPrice <= 0) {
        alert('Будь ласка, введіть коректні дані.');
        return;
    }

    if (updatedImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(updatedImageFile);
        reader.onload = function () {
            allListings[currentEditIndex].image = reader.result;
            applyListingChanges(updatedName, updatedDescription, updatedPrice);

            // Close modal and update UI
            closeModal();
            displayListings();
        };
    } else {
        applyListingChanges(updatedName, updatedDescription, updatedPrice);

        // Close modal and update UI
        closeModal();
        displayListings();
    }
});


// Form validation on adding new listings (existing functionality)

function validateForm() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;

    if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
        alert('Будь ласка, введіть коректні дані.');
        return false;
    }
    return true;
}

listingElement.innerHTML = `
    <img src="${listing.image}" alt="${listing.name}">
    <div>
        <strong>${listing.name}</strong>
        <p>${listing.description}</p>
        <p><strong>Ціна:</strong> ${listing.price} грн</p>
    </div>
    ${listing.isRented ? '<span>Орендовано</span>' : `<button onclick="rentItem(${index})">Орендувати</button>`}
    <button onclick="openEditModal(${index})">Редагувати</button>
`;

// Function to apply the updated changes to the listing
function applyListingChanges(name, description, price) {
    allListings[currentEditIndex].name = name;
    allListings[currentEditIndex].description = description;
    allListings[currentEditIndex].price = price;

    // Оновлюємо відображення оголошень
    displayListings();
}
