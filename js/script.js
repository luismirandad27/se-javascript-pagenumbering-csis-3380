/**
 * File: index.js
 * 
 * Description:
 * This file contains JavaScript code for managing a users contacts.
 *
 * Author: Luis Miguel Miranda
 * ID: 300363277
 * Date: January 15th, 2024
 *
 */

const MAX_USERS_PER_LIST = 10;

// Reading the data from the JSON database
const data = users;

// Initial Rendering
initial_rendering();

// Showing the first set of users
displayData(0)

/**
* This function will make the initial rendering for the html page. Based on the data, it will calculate the total number of users,
* population the initial MAX_USERS_PER_LIST (if the # users is less than that, it will display the full list of users), and the
* pagination feature.
*/
function initial_rendering(){
    
    // Updating the total number of users in the database
    const divHeader = document.getElementsByClassName('page-header')[0];
    const h3Total = document.createElement('h3');
    h3Total.innerHTML = data.length == 0 ? 'No users in the database' : 'Total :' + data.length;
    divHeader.appendChild(h3Total);
    divHeader.appendChild(document.createElement('h3'))

    if (data.length > 0) {
        
        // Displaying the first list of users
        displayData(0);

        // Updating the pagination
        const userListPaginationHTML = document.getElementsByClassName('pagination')[0];

        const totalNumberPages = Math.ceil(data.length / MAX_USERS_PER_LIST);
        
        for(let i = 0; i < totalNumberPages; i++){

            const anchorPage = document.createElement('a');
            anchorPage.innerHTML = i + 1;
            
            // To add the event listener on the dot HTML item, we need to create an immediately-invoked function expression (IIFE)
            (function (index) {
                anchorPage.addEventListener("click", function () {
                    displayData(index);
                });
            })(i);

            const listElement = document.createElement('li');
            listElement.appendChild(anchorPage);

            userListPaginationHTML.appendChild(listElement);

        }
    }    

}

/**
* Function to display the data as a list, depending on the index.
*
* @param {[int]} index - The number of the page - 1
*/
function displayData(index){

    /*
        We need to determine how many users we are going to put in the list.
    */
    const startIndex = index * MAX_USERS_PER_LIST;
    const endIndex = (index + 1) * MAX_USERS_PER_LIST;

    // The slice method will help us to cut the array in specific list. For the last list, we don't need to worry about
    // putting the right end_index_user
    arr = data.slice(startIndex, endIndex);

    // Clean the list
    const userListHTML = document.getElementsByClassName("contact-list")[0];
    removeAllChildNodes(userListHTML);

    // Add the elements 
    arr.map(
        element => {
            
            const img = document.createElement('img');
            img.className = 'avatar';
            img.src = element['image']

            const h3 = document.createElement('h3');
            h3.innerHTML = element['name'];

            const spanEmail = document.createElement('span');
            spanEmail.className = 'email';
            spanEmail.innerHTML = element['email'];

            const divDetail = document.createElement('div');
            divDetail.className = 'contact-details'
            divDetail.appendChild(img);
            divDetail.appendChild(h3);
            divDetail.appendChild(spanEmail);

            const spanJoined = document.createElement('span');
            spanJoined.className = 'date';
            spanJoined.innerHTML = 'Joined ' + element['joined'];

            const divJoined = document.createElement('div');
            divJoined.className = 'joined-details';
            divJoined.appendChild(spanJoined);

            const liContact = document.createElement('li');
            liContact.classList.add('contact-item','cf')

            liContact.appendChild(divDetail);
            liContact.appendChild(divJoined);

            userListHTML.appendChild(liContact)

        }
    );

    // Update the pagination
    const paginationList = Array.from(document.querySelectorAll('.pagination li'));

    paginationList.forEach((page, i) => {
        
        // We need to remove the active class for all pages
        page.classList.remove('active');

        // For the selected index, let's add the active class
        if (i === index) {
            page.classList.add('active');
        }
    });


}


/**
* Function to remove the list of child nodes of a parent HTML element
*
* @param {[node]} parent - Parent node
*/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}