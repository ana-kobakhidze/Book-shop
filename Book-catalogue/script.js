const bookData = [];
const bag = {
    items: [],
    totalCount: 0,
    totalPrice: 0
};
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
                console.log(bag);
                // adding modal
                const modal = document.createElement("div");
                modal.classList.add("modal");
                modal.addEventListener('drop', function(event) {
                    drop(event)
                })
                modal.addEventListener('dragover', function(event) {
                        allowDrop(event);
                    })
                    // adding close button
                const closeButton = document.createElement('button');
                const closeButtonTxt = document.createTextNode("X");
                closeButton.addEventListener('click', function() {
                    modal.style.display = "none";
                })
                closeButton.appendChild(closeButtonTxt);
                modal.appendChild(closeButton);
                const elements = document.querySelector('.modalListWrapper');

                elements !== null && elements.remove();
                // creating modalList
                bag.items.forEach(elem => {
                    const modalListWrapper = document.createElement("div");
                    modalListWrapper.classList.add('modalListWrapper');
                    // selected book title
                    const bookTitle = document.createElement('h5');
                    const bookTitleTxt = document.createTextNode(elem.title);
                    bookTitle.appendChild(bookTitleTxt);
                    //selected book author
                    const bookAuthor = document.createElement("h6");
                    const bookAuthorTxt = document.createTextNode(elem.author);
                    bookAuthor.appendChild(bookAuthorTxt);
                    //selected book price
                    const bookPrice = document.createElement('h4');
                    const bookPriceTxt = document.createTextNode(elem.price);
                    bookPrice.appendChild(bookPriceTxt);
                    //remove Button
                    const removeButton = document.createElement("button");
                    const removeButtonTxt = document.createTextNode("X");
                    removeButton.addEventListener('click', function() {
                        removeBookFromBag(elem.id);
                    });
                    removeButton.appendChild(removeButtonTxt);
                    //adding elements to wrapper
                    modalListWrapper.appendChild(bookTitle);
                    modalListWrapper.appendChild(bookAuthor);
                    modalListWrapper.appendChild(bookPrice);
                    modalListWrapper.appendChild(removeButton);
                    modal.appendChild(modalListWrapper);
                });
                console.log(modal)
                dFrag.appendChild(modal);

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
    const bookIndexInBag = bag.items.findIndex(b => b.id === book.id);
    if (bookIndexInBag === -1) {
        bag.items.push({...book, count: 1 });
    } else {
        bag.items[bookIndexInBag].count++;
    }
    bag.totalPrice += book.price;
    bag.totalCount++;
}

const removeBookFromBag = bookId => {
    const bookIndexInBag = bag.items.findIndex(b => b.id === bookId);
    if (bookIndexInBag > 0) {
        const bookToRemove = bag[bookIndexInBag];
        bag.totalPrice -= bookToRemove.count * bookToRemove.price;
        bag.items.pop(b => b.id === bookId);
        bag.totalCount--;
    }
}

const drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
}
const drop = ev => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    console.log(bookData)
    console.log(data)
    let product = bookData.findIndex(elem => elem.id == data);
    addBookToBag(bookData[product]);
    console.log(bag);
    const modalElements = document.querySelector('.modalListWrapper');
    modalElements.remove();
    bag.items.forEach(elem => {
        const modalListWrapper = document.createElement("div");
        modalListWrapper.classList.add('modalListWrapper');
        // selected book title
        const bookTitle = document.createElement('h5');
        const bookTitleTxt = document.createTextNode(elem.title);
        bookTitle.appendChild(bookTitleTxt);
        //selected book author
        const bookAuthor = document.createElement("h6");
        const bookAuthorTxt = document.createTextNode(elem.author);
        bookAuthor.appendChild(bookAuthorTxt);
        //selected book price
        const bookPrice = document.createElement('h4');
        const bookPriceTxt = document.createTextNode(elem.price);
        bookPrice.appendChild(bookPriceTxt);
        //remove Button
        const removeButton = document.createElement("button");
        const removeButtonTxt = document.createTextNode("X");
        removeButton.addEventListener('click', function() {
            removeBookFromBag(elem.id);
        });
        removeButton.appendChild(removeButtonTxt);
        //adding elements to wrapper
        modalListWrapper.appendChild(bookTitle);
        modalListWrapper.appendChild(bookAuthor);
        modalListWrapper.appendChild(bookPrice);
        modalListWrapper.appendChild(removeButton);
        const modalElement = document.querySelector('.modal');
        console.log(modalElement)
        modalElement.appendChild(modalListWrapper);
    });

    console.log(data)
}
const allowDrop = event => {
    event.preventDefault();
}