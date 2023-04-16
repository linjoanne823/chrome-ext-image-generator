
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".my-form");

  form.addEventListener("click", (e) => {
    e.preventDefault();
    const object = document.getElementById("text_to_image").value;
    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: object }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => (document.getElementById("result").src = data[0].url))
   
      .catch((error) => console.log(error));
  });
});

