const button = document.querySelector(".btn");
const inputs = document.querySelectorAll("input");

const dayInput = document.getElementById("days");
const monthInput = document.getElementById("months");
const yearInput = document.getElementById("years");

const lablDay = document.querySelector("#ld");
const lablMonth = document.querySelector("#lm");
const lablYear = document.querySelector("#ly");

const dayMessageError = document.querySelector("#d-errorMessage");
const monthMessageError = document.querySelector("#m-errorMessage");
const yearMessageError = document.querySelector("#y-errorMessage");


button.addEventListener("click", () => {
  const inputs = document.querySelectorAll('input');

  let allValid = true;
  inputs.forEach((input) => {
    const value = input.value.trim();
    const errorElement = input.nextElementSibling;
    
    if (value === "") {
      allValid = false;
      errorElement.textContent = "This field is required";
      input.style.borderColor = "red";
    } else {
      const numValue = parseInt(value);
      
      switch (input.id) {
        case "days":
          if (isNaN(numValue) || numValue < 1 || numValue > 31) {
            allValid = false;
            errorElement.textContent = "Must be a valid day";
            input.style.borderColor = "red";
          } else {
            errorElement.textContent = "";
            input.style.borderColor = "initial";
          }
          break;
        case "months":
          if (isNaN(numValue) || numValue < 1 || numValue > 12) {
            allValid = false;
            errorElement.textContent = "Must be a valid month";
            input.style.borderColor = "red";
          } else {
            errorElement.textContent = "";
            input.style.borderColor = "initial";
          }
          break;
        case "years":
          const currentYear = new Date().getFullYear();
          if (isNaN(numValue) || numValue > currentYear) {
            allValid = false;
            errorElement.textContent = "Must be in the past";
            input.style.borderColor = "red";
          } else {
            errorElement.textContent = "";
            input.style.borderColor = "initial";
          }
          break;
      }
    }
  });

  if (!allValid) {
    return;
  }

  const currentDate = new Date();
  const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  const birthMonthThisYear = birthDate.getMonth();
  const currentMonth = currentDate.getMonth();

  if (
    currentMonth < birthMonthThisYear ||
    (currentMonth === birthMonthThisYear &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    ageInYears--;
  }

  let ageInMonths, ageInDays;
  const birthMonthInCurrentYear = birthDate.getMonth() + 1;
  const birthDayInCurrentYear = birthDate.getDate();

  if (currentMonth >= birthMonthInCurrentYear) {
    ageInMonths = currentMonth - birthMonthInCurrentYear;
    ageInDays = currentDate.getDate() - birthDayInCurrentYear;
  } else {
    ageInMonths = 12 - (birthMonthInCurrentYear - currentMonth);
    ageInDays =
      currentDate.getDate() < birthDayInCurrentYear
        ? currentDate.getDate() +
          new Date(currentDate.getFullYear(), currentMonth, 0).getDate() -
          birthDayInCurrentYear
        : currentDate.getDate() - birthDayInCurrentYear;
  }
  if (currentMonth < birthMonthInCurrentYear) {
    ageInMonths = 12 + currentMonth - birthMonthInCurrentYear;
    ageInYears--; 
  }

  if (ageInDays < 0) {
    const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
    ageInDays += daysInPreviousMonth;
    ageInMonths--;
    if (ageInMonths < 0) {
      ageInMonths = 11;
      ageInYears--;
    }
  }

  document.getElementById("yearsResult").innerText = ageInYears;
  document.getElementById("monthsResult").innerText = ageInMonths;
  document.getElementById("daysResult").innerText = ageInDays;
});
