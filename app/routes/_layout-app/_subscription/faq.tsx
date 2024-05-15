import FaqItem from "~/components/ui/faq-item";
import faqQuestions from "~/routes/_layout-app/_subscription/faq-questions";

function Faq() {
  return faqQuestions.map((question, index) => (
    <FaqItem
      key={index}
      question={question.question}
      answer={question.answer}
    />
  ));
}

export default Faq;
