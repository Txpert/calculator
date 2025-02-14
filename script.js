document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttonsContainer = document.querySelector(".buttons");
  
    // Helper function to update display content
    const updateDisplay = (content) => {
      display.textContent = content;
    };
  
    // Handle button clicks using event delegation
    buttonsContainer.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.classList.contains("btn")) return;
  
      // If the button has a data-value attribute (numbers and dot)
      if (target.hasAttribute("data-value")) {
        // Replace '0' if that's all that is there or if the previous input was an operator
        if (display.textContent === "0") {
          updateDisplay(target.dataset.value);
        } else {
          updateDisplay(display.textContent + target.dataset.value);
        }
      }
  
      // Handle actions (operators, clear, equal)
      if (target.hasAttribute("data-action")) {
        const action = target.dataset.action;
  
        if (action === "clear") {
          updateDisplay("0");
        } else if (action === "equal") {
          try {
            // Evaluate the expression safely.
            // Since input is only via our buttons, using eval is acceptable.
            const result = eval(display.textContent);
            updateDisplay(result);
          } catch (error) {
            updateDisplay("Error");
          }
        } else {
          // Operator button was clicked
          const lastChar = display.textContent.slice(-1);
          // Prevent adding multiple operators consecutively
          if ("+-*/".includes(lastChar)) {
            updateDisplay(display.textContent.slice(0, -1) + action);
          } else {
            updateDisplay(display.textContent + action);
          }
        }
      }
    });
  });