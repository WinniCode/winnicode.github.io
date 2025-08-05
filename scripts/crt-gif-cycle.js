document.addEventListener("DOMContentLoaded", () => {
    // Array of GIF URLs
    const gifs = [
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDJ4bGZ4bGphYXFxczVyNjZ4bjFldWU4aTlqeTB0aHdlcmpqYXBnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M6zlLCAQALGta/giphy.gif",
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTd6dGMzejVpNHoybGczeHJnMXZhMHRwMWJnMW5naXV6a2o0cm1rYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3caEcViLVTCik/giphy.gif",
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhnaWJkaXh2ODBudHY4eXd1bXBnbjRtaDM0a2U1ZnEzcWptMXk0eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/txcIHRNl2vcDm/giphy.gif",
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHA2cGU1cm85MTR1cXFmOTJsaGIzem9iZ2x2bDY3c3R2dHpmaHl2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AAGzmXefPMzzG/giphy.gif",
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDJwcGxrZ2V3enMxNjMwYXFwOWF6a2VkdmZ5Z2hhaGlubXhtM3hidCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6UDorPg1oGRQ4/giphy.gif",
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDM2dXd5MWdlOWlqY2I3dWhtOGRtNmdqZjduZ3dsZHlnMW5qNm0yYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1lmqpLW6BxtRK/giphy.gif",
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmF6emw2NnJkcWs0dHg1NnJlcXpnN2F4ajFlYjdybGRteDI4MGgyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w4nEJP5lWKEkU/giphy.gif",
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTZ3MmNmNnJ1cGZ2c3lmMjM5YmthYXc0a284dDJmcmhoNzR3aHhzOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e2XQfHkCaKHuw/giphy.gif",
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnNyOTJzZ2VzaTZqZzZtZXNrazBjcDJycjhxNTZpcHJwaDVodTkxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YaooEfKWBBD68/giphy.gif",
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnNyOTJzZ2VzaTZqZzZtZXNrazBjcDJycjhxNTZpcHJwaDVodTkxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YaooEfKWBBD68/giphy.gif",
      "https://media1.tenor.com/m/IYj-G8rBGPgAAAAd/resident-evil-remake.gif",
      "https://media1.tenor.com/m/ipxMlwtf_SIAAAAd/bubble-bobble-bubble.gif"
      // Add more GIF URLs as needed
    ];

    const imgElement = document.getElementById("crt-gif");
    let currentIndex = 0;

    function showNextGif() {
      if (!imgElement) return;

      imgElement.src = gifs[currentIndex] + '?t=' + Date.now(); // Force reload
      currentIndex = (currentIndex + 1) % gifs.length;
    }

    // Show the first GIF immediately
    showNextGif();

    // Cycle to the next one every 5 seconds
    setInterval(showNextGif, 5000);
  });
