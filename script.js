const sections = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dots a")];

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector(".reveal")?.classList.add("visible");
      }
    });
  },
  { threshold: 0.28 }
);

sections.forEach(section => revealObserver.observe(section));

const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = sections.indexOf(entry.target);
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    });
  },
  { threshold: 0.6 }
);

sections.forEach(section => activeObserver.observe(section));

window.addEventListener("load", () => {
  document.querySelector("#start .reveal")?.classList.add("visible");
});

const dressPalettes = {
  pink: {
    name: "Пудрово-рожевий",
    colors: [
      ["#f7d8df", "світлий"],
      ["#e8b7c1", "основний"],
      ["#d792a5", "акцент"],
      ["#b86f83", "глибший"]
    ]
  },
  beige: {
    name: "Бежевий",
    colors: [
      ["#f3e7d6", "світлий"],
      ["#decbb1", "основний"],
      ["#c8ad8d", "акцент"],
      ["#a98d70", "глибший"]
    ]
  },
  blue: {
    name: "Ніжно-блакитний",
    colors: [
      ["#d8edf6", "світлий"],
      ["#a9c9dc", "основний"],
      ["#83aec7", "акцент"],
      ["#638ca5", "глибший"]
    ]
  },
  sage: {
    name: "Шавлієвий",
    colors: [
      ["#dfe7d4", "світлий"],
      ["#b8c2a4", "основний"],
      ["#98a783", "акцент"],
      ["#778565", "глибший"]
    ]
  },
  lavender: {
    name: "Лавандовий",
    colors: [
      ["#eadff0", "світлий"],
      ["#c8b6d7", "основний"],
      ["#ab94c0", "акцент"],
      ["#8f75a7", "глибший"]
    ]
  },
  cream: {
    name: "Кремовий",
    colors: [
      ["#fbefc8", "світлий"],
      ["#ead8a7", "основний"],
      ["#d4bd7f", "акцент"],
      ["#b69d60", "глибший"]
    ]
  }
};

const swatchButtons = [...document.querySelectorAll(".swatch[data-palette]")];
const paletteCard = document.querySelector("#dress-palette");
const paletteTitle = paletteCard?.querySelector("strong");
const paletteChips = paletteCard?.querySelector(".palette-chips");

const renderPalette = key => {
  const palette = dressPalettes[key];
  if (!palette || !paletteCard || !paletteTitle || !paletteChips) return;

  paletteTitle.textContent = palette.name;
  paletteChips.replaceChildren(
    ...palette.colors.map(([hex, label]) => {
      const chip = document.createElement("div");
      const color = document.createElement("i");
      const text = document.createElement("span");

      chip.className = "palette-chip";
      color.style.setProperty("--chip", hex);
      text.textContent = `${label} ${hex}`;

      chip.append(color, text);
      return chip;
    })
  );

  paletteCard.hidden = false;
  swatchButtons.forEach(button => {
    const isActive = button.dataset.palette === key;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

swatchButtons.forEach(button => {
  button.addEventListener("click", () => renderPalette(button.dataset.palette));
});
