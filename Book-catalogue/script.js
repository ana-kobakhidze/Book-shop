const bookData = [];
let bag = {
    items: [],
    totalCount: 0,
    totalPrice: 0
};
const dFragment = document.createDocumentFragment();
const dFrag = document.createElement('div');
dFrag.classList.add('main')
const shopItems = document.createElement('div');
shopItems.id = "wrapper";
shopItems.classList.add('wrapper')

fetch('https://raw.githubusercontent.com/rolling-scopes-school/js-fe-course-en/main/tasks/books-shop/books.json') //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach((elem, index) => {
            elem.imageLink = './assets/' + elem.author.trim() + '.png';
            const extendedBookObj = {...elem, id: index };
            bookData.push(extendedBookObj);
            const shopItem = document.createElement('div');
            shopItem.id = index;
            shopItem.setAttribute("draggable", true);
            shopItem.addEventListener("dragstart", function(event) {
                    drag(event);
                })
                //addimg image
            const image = document.createElement('img');
            image.src = elem.imageLink;
            shopItem.appendChild(image);
            //creating list
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            //adding title
            const title = document.createElement('h5');
            const titleContent = document.createTextNode(elem.title);
            title.classList.add('title');
            title.appendChild(titleContent);
            //adding author
            const author = document.createElement('h6');
            const authorContent = document.createTextNode(elem.author);
            author.appendChild(authorContent);
            //adding price
            const price = document.createElement('h5');
            const priceContent = document.createTextNode("$ " + elem.price);
            price.classList.add('price');
            price.appendChild(priceContent);
            //adding description button
            const descripLink = document.createElement('a');
            const descripLinkTxt = document.createTextNode('Show more');
            const arrow = document.createElement('img');
            arrow.src = './icons/arrow.png';
            arrow.classList.add('arrow')
            descripLink.appendChild(arrow);
            descripLink.appendChild(descripLinkTxt);
            descripLink.classList.add('descripLink')
            descripLink.addEventListener('click', function() {
                const shopItem = document.getElementById('shop-item' + index);
                console.log(index);
                if (!shopItem) {
                    return;
                }
                const descriptionElement = shopItem.querySelector('.description');
                descriptionElement.hidden = !descriptionElement.hidden;
            });
            //adding description
            const description = document.createElement('p');
            description.hidden = true;
            description.classList.add('description');
            const descriptionContent = document.createTextNode(elem.description);
            description.appendChild(descriptionContent);
            // adding 'add to bag' button
            const addBook = document.createElement('a');
            const addBookTxt = document.createTextNode("add to bag");
            addBook.addEventListener('click', function() {
                addBookToBag(extendedBookObj);
                const showModal = document.querySelector('.bagContainer')
                showModal.style.display = "block";
            });
            addBook.appendChild(addBookTxt);
            addBook.classList.add('add');
            //displaying book details
            li.appendChild(title);
            li.appendChild(author);
            li.appendChild(price);

            li.appendChild(descripLink);
            li.appendChild(description);
            li.appendChild(addBook);

            //adding rest of the nodes reversed order
            ul.appendChild(li);
            shopItem.appendChild(ul);
            shopItems.appendChild(shopItem);
        });
        dFrag.appendChild(shopItems);

    });

if (document.body != null) {
    // Add fragment to a list: 
    document.body.appendChild(dFrag);
}

const addBookToBag = book => {
    if (bag.items.length === 0) {

    }
    const bookIndexInBag = bag.items.findIndex(b => b.id === book.id);
    if (bookIndexInBag === -1) {
        bag.items.push({...book, count: 1 });
    } else {
        bag.items[bookIndexInBag].count++;
    }
    bag.totalPrice += book.price;
    bag.totalCount++;
    createBagItem(book);
    const totalPrice = document.querySelector('.total');
    totalPrice.innerHTML = "Total:" + " $ " + bag.totalPrice;

}

const removeBookFromBag = bookId => {
    const bookIndexInBag = bag.items.findIndex(b => b.id === bookId);
    if (bookIndexInBag > -1) {
        const bookToRemove = bag.items[bookIndexInBag];
        bag.totalPrice -= bookToRemove.count * bookToRemove.price;
        bag.items.splice(bookIndexInBag, 1);
        bag.totalCount--;
        const bagItemId = 'bagItem' + bookId;
        removeBagItemFromDom(bagItemId);
        const totalPrice = document.querySelector('.total');
        totalPrice.innerHTML = "Total:" + " $ " + bag.totalPrice;

    }
}

const drag = (event) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
}
const drop = ev => {
    //getting data from drop
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    // finding product in data obj with id 
    let product = bookData.findIndex(elem => elem.id == data);
    // adding product  to bag 
    addBookToBag(bookData[product]);
}

const allowDrop = event => {
    event.preventDefault();
}

const createBagContainer = () => {
    // adding modal
    const bagContainer = document.createElement("div");
    bagContainer.classList.add("bagContainer");
    bagContainer.addEventListener('drop', function(event) {
        drop(event)
    });
    bagContainer.addEventListener('dragover', function(event) {
        allowDrop(event);
    });
    //adding title
    const bagTitle = document.createElement("h4");
    const bagTitleTxt = document.createTextNode("Order books");
    bagTitle.append(bagTitleTxt);
    // adding close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton');

    const closeButtonTxt = document.createTextNode("X");
    closeButton.addEventListener('click', function() {
        bagContainer.style.display = "none";
    });
    closeButton.appendChild(closeButtonTxt);
    // adding total
    const total = document.createElement("h2");
    total.classList.add('total');
    // adding confirm
    const confirmButton = document.createElement('a');
    confirmButton.classList.add('confirm')
    confirmButton.href = "file:///Users/ana/Book-shop/Book-shop/form/index.html";
    const confirmTxt = document.createTextNode("confirm order");
    confirmButton.appendChild(confirmTxt);


    bagContainer.appendChild(closeButton);
    bagContainer.appendChild(bagTitle);
    bagContainer.appendChild(total);


    bagContainer.appendChild(confirmButton);

    dFrag.appendChild(bagContainer);
    return bagContainer;
}


const createBagItem = (book) => {
    let parentDiv = document.querySelector('.bagContainer');
    if (parentDiv === null) {
        parentDiv = createBagContainer();
    }
    const bagItemId = 'bagItem' + book.id;
    //check if dom element already exists and remove
    removeBagItemFromDom(bagItemId);
    //creating bag item
    const bagItem = document.createElement("div");
    bagItem.id = bagItemId;
    bagItem.classList.add('bagItem');
    // selected book title
    const bookTitle = document.createElement('h5');
    const bookTitleTxt = document.createTextNode(book.title);
    bookTitle.appendChild(bookTitleTxt);
    //selected book author
    const bookAuthor = document.createElement("h6");
    const bookAuthorTxt = document.createTextNode(book.author);
    bookAuthor.appendChild(bookAuthorTxt);
    //selected book price
    const bookPrice = document.createElement('h3');
    const bookPriceTxt = document.createTextNode("$ " + book.price);
    bookPrice.appendChild(bookPriceTxt);
    //remove Button
    const removeButton = document.createElement("button");
    removeButton.classList.add('removeButton')
    const removeButtonTxt = document.createTextNode("X");
    removeButton.addEventListener('click', function() {
        removeBookFromBag(book.id);
    });
    removeButton.appendChild(removeButtonTxt);

    //adding elements to wrapper
    bagItem.appendChild(bookTitle);
    bagItem.appendChild(bookAuthor);
    bagItem.appendChild(bookPrice);
    bagItem.appendChild(removeButton);


    parentDiv.appendChild(bagItem);


}
const removeBagItemFromDom = (id) => {
    const documentElById = document.getElementById(id);
    documentElById && documentElById.remove();
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
dFragment.appendChild(dFrag);
document.body.appendChild(dFragment);