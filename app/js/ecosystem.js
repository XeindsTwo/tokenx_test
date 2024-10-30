export function ecosystem() {
  let isClickable = true;

  const toggleItems = document.querySelectorAll(".ecosystem__content-item");
  const percentageSpans = document.querySelectorAll(".ecosystem__left-line span");
  const svgPath = document.querySelector(".ecosystem__left-line svg path");
  const categoryNames = document.querySelectorAll(".ecosystem__item-name");
  const percentDigits = document.querySelectorAll(".ecosystem__digital");

  for (let i = 1; i < percentageSpans.length; i++) {
    percentageSpans[i].style.opacity = "0";
    categoryNames[i].style.opacity = "0";
    percentDigits[i].style.opacity = "0";
    percentDigits[i].style.transform = "translateY(-45px)";
  }

  toggleItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      if (!isClickable) {
        return;
      }

      isClickable = false;
      setTimeout(function () {
        isClickable = true;
      }, 1100);

      toggleItems.forEach(function (el) {
        el.classList.remove("active");
      });

      item.classList.add("active");

      const categoryItem = document.querySelector(".ecosystem__item");
      categoryItem.classList = "ecosystem__item";
      if (index === 0) {
        categoryItem.classList.add("item-1");
      } else {
        categoryItem.classList.add(`item-${index + 1}`);
      }

      percentageSpans.forEach(function (span, i) {
        span.style.transition = "opacity 0.7s ease-in-out";
        span.style.opacity = "0";
        if (i === index) {
          setTimeout(function () {
            span.style.opacity = "1";
          }, 100);
        }
      });

      categoryNames.forEach(function (name, i) {
        name.style.transition = "opacity 0.8s ease-in-out";
        name.style.opacity = "0";
        if (i === index) {
          setTimeout(function () {
            name.style.opacity = "1";
          }, 100);
        }
      });

      percentDigits.forEach(function (digit, i) {
        digit.style.transition = "opacity 0.9s ease-in-out, transform 0.9s ease-in-out";
        digit.style.opacity = "0";
        if (i === index) {
          setTimeout(function () {
            digit.style.opacity = "1";
            digit.style.transform = "translateY(0)";
          }, 100);
        } else {
          digit.style.opacity = "0";
          digit.style.transform = "translateY(45px)";
        }
      });

      setTimeout(function () {
        percentDigits.forEach(function (digit, i) {
          if (i !== index) {
            digit.style.transform = "translateY(-45px)";
          }
        });
      }, 800);

      const colors = ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'];
      svgPath.style.stroke = colors[index];
      percentageSpans.forEach(function (span, i) {
        span.style.color = colors[i];
      });
    });

    if (index === 0) {
      item.classList.add("active");

      const categoryItem = document.querySelector(".ecosystem__item");
      categoryItem.classList = "ecosystem__item item-1";
      percentDigits[0].style.opacity = "1";
      percentDigits[0].style.transform = "translateY(0)";
    }
  });
}