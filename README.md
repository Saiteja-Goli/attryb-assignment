# attryb-assignment
# BUYC Corp

Explore a trusted online marketplace for buying and selling second-hand cars. Find the perfect vehicle or sell your own with ease.

## Deployed Link
- [Live Demo](#) - https://client-saiteja-goli.vercel.app

## Backend Deploy
- [Live Demo](#) - https://attryb-backend-saiteja-goli.vercel.app

## .env
Before running the application, make sure to set the following environment variables in a .env file in the project root directory:
PORT=8000
MONGODBURL=your_mongodb_connection_url
SECRET=your_jwt_secret_key


## Installation
git clone https://github.com/Saiteja-Goli/attryb-assignment
cd server
npm install
npm run start

## Database
MongoDB is employed as the database to store task data efficiently.


## Contact Information
For any queries and feedback, please contact me at saitejagoli111@gmail.com.

✨Thank You✨
<div>
  <button id="copyButton" onclick="copyCode()">Copy Code</button>
</div>

<pre>
  <code>
    <!-- Your code to be copied here -->
    console.log("Hello, World!");
  </code>
</pre>
<style>
  #copyButton {
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
</style>
<script>
  function copyCode() {
    const codeToCopy = document.querySelector("code");
    const textArea = document.createElement("textarea");
    textArea.value = codeToCopy.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Code copied to clipboard!");
  }
</script>

