const faqData = [
  {
    question: "What is HTML?",
    answer:
      "HTML stands for HyperText Markup Language. It provides the structure and meaning of content on a web page.",
  },
  {
    question: "What is CSS?",
    answer:
      "CSS stands for Cascading Style Sheets. It controls the visual presentation of HTML, including layout, colors, spacing, and typography.",
  },
  {
    question: "What is JavaScript?",
    answer:
      "JavaScript is a programming language that adds interaction and dynamic behavior to websites.",
  },
  {
    question: "How do these technologies work together?",
    answer:
      "HTML creates the content structure, CSS defines how it looks, and JavaScript handles interactions and dynamic updates.",
  },
];

const accordionContainer = document.getElementById("accordion");

function generateAccordionItems(faqData) {
  faqData.forEach((item, index) => {
    const accordionItem = document.createElement("div");
    accordionItem.classList.add("accordion-item");

    const header = document.createElement("button");
    header.classList.add("accordion-header");
    header.type = "button";
    header.id = `faq-header-${index}`;
    header.setAttribute("aria-expanded", "false");
    header.setAttribute("aria-controls", `faq-content-${index}`);

    const question = document.createElement("span");
    question.textContent = item.question;

    const icon = document.createElement("span");
    icon.classList.add("accordion-icon");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "+";

    header.append(question, icon);

    const content = document.createElement("div");
    content.classList.add("accordion-content");
    content.id = `faq-content-${index}`;
    content.setAttribute("role", "region");
    content.setAttribute("aria-labelledby", header.id);
    content.setAttribute("aria-hidden", "true");

    const contentText = document.createElement("p");
    contentText.textContent = item.answer;

    content.appendChild(contentText);
    accordionItem.appendChild(header);
    accordionItem.appendChild(content);
    accordionContainer.appendChild(accordionItem);
  });
}

generateAccordionItems(faqData);

const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const isOpen = header.classList.contains("active");
    const accordionContent = header.nextElementSibling;

    accordionHeaders.forEach((otherHeader) => {
      const otherContent = otherHeader.nextElementSibling;
      otherHeader.classList.remove("active");
      otherHeader.parentElement.classList.remove("open");
      otherHeader.setAttribute("aria-expanded", "false");
      otherContent.setAttribute("aria-hidden", "true");
      otherContent.style.maxHeight = "0";
    });

    if (!isOpen) {
      header.classList.add("active");
      header.parentElement.classList.add("open");
      header.setAttribute("aria-expanded", "true");
      accordionContent.setAttribute("aria-hidden", "false");
      accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
    }
  });
});
