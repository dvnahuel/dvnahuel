class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function consoleLog() {
  const cssRule =
        "color: rgb(249, 162, 34);" +
        "font-size: 60px;" +
        "font-weight: bold;" +
        "text-shadow: 1px 1px 5px rgb(249, 162, 34);" +
        "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";
      console.log("%cHey there 🤙🏻", cssRule);
}

function hideScroll() {
  document.addEventListener("scroll", function () {
    document.getElementById("scroll").classList.add("has-scrolled")
  });
}

const phrases = ["Hi", "My name is ", "Nahuel del Valle"];

const el = document.querySelector(".text");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

consoleLog();
next();
hideScroll();


document.querySelector('.modes').onclick = Mode;

function Mode () {
  const logo = document.querySelector('.modes');
  const principal  = document.getElementById("principal");
  principal.classList.add("dark-mode");
  logo.innerHTML= '';
  logo.innerHTML= '🌕';
  logo.onclick = Cerrar;
  function Cerrar() {
    const logo = document.querySelector('.modes');
    const principal  = document.getElementById("principal");
    principal.classList.remove("dark-mode");
    logo.innerHTML= '🌑';
    logo.onclick = Mode;
  }
}
