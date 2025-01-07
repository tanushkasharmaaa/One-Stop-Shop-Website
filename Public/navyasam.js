// Fetch data from the JSON file
fetch('navyasample.json')
   .then(response => response.json())
   .then(data => {
      console.log(data); // Display JSON data in console

      // Example: Loop through each product and log its details
      data.forEach(item => {
         console.log(`Name: ${person.name}, Product: ${product.name}, Friend: ${friend.price}`);
      });

      // You can further manipulate or display the data on your HTML page as needed.
   })
   .catch(error => console.error('Error loading JSON:', error));