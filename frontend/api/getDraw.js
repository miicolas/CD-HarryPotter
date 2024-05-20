const drawButton = document.querySelector(".draw_button");

drawButton.addEventListener("click", () => {
  try {
    fetch("/draw", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  } catch (error) {
    console.log(error);
  }
});
