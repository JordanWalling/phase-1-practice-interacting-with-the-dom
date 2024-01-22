document.addEventListener("DOMContentLoaded", initialise);

let time = 0;
let intervalId;

function initialise() {
  let counter = document.querySelector("#counter");
  let likes = document.querySelector(".likes");
  let likeClickAmount = 0;

  intervalId = setInterval(() => {
    ++time;
    counter.innerHTML = time;
  }, 1000);

  let minus = document.querySelector("#minus");
  let plus = document.querySelector("#plus");

  minus.addEventListener("click", () => {
    clearInterval(intervalId);
    time -= 1;
    counter.innerHTML = time;
    intervalId = setInterval(() => {
      ++time;
      counter.innerHTML = time;
    }, 1000);
  });
  plus.addEventListener("click", () => {
    clearInterval(intervalId);
    ++time;
    counter.innerHTML = time;
    intervalId = setInterval(() => {
      ++time;
      counter.innerHTML = time;
    }, 1000);
  });
  let heart = document.querySelector("#heart");
  heart.addEventListener("click", () => {
    const existingLikes = document.querySelector(`#like-${time}`);

    if (existingLikes) {
      likeClickAmount++;
      existingLikes.textContent = `${time} has been liked ${likeClickAmount} times`;
    } else {
      likeClickAmount = 1;
      const likeElement = document.createElement("div");
      likeElement.id = `like-${time}`;
      likeElement.textContent = `${time} has been liked ${likeClickAmount} times`;
      likes.appendChild(likeElement);
    }
  });

  let pause = document.querySelector("#pause");
  pause.addEventListener("click", () => {
    if (document.querySelector("#plus").disabled === false) {
      clearInterval(intervalId);

      document.querySelector("#plus").disabled = true;
      document.querySelector("#minus").disabled = true;
      document.querySelector("#heart").disabled = true;
      pause.innerHTML = "Resume";
    } else {
      intervalId = setInterval(() => {
        time++;
        counter.innerHTML = time;
        document.querySelector("#plus").disabled = false;
        document.querySelector("#minus").disabled = false;
        document.querySelector("#heart").disabled = false;
        pause.innerHTML = "pause";
      }, 1000);
    }
  });
  let form = document.querySelector("#comment-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = document.querySelector("#comment-input").value;
    let p = document.createElement("p");
    p.innerHTML = inputValue;
    let commentList = document.querySelector("#list");
    commentList.appendChild(p);
    form.reset();
  });
}
