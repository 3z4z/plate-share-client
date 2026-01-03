import { useEffect } from "react";
import CommonTitleComponent from "../components/common/CommonTitle";
import { container } from "../utils/classNames";

export default function FaqPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const faqs = [
    {
      question: "How do I share a meal on PlateShare?",
      answer:
        "To share a meal, log in to your account, click on 'Share Meal', fill in the details, upload a photo, and publish. Your meal will then appear on the platform for others to see.",
    },
    {
      question: "Is PlateShare free to use?",
      answer:
        "Yes! Creating an account, browsing meals, and sharing content is completely free. Some premium features may be added in the future.",
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        "If you find content that violates our guidelines, click the 'Report' button on that post. Our team will review it and take appropriate action.",
    },
    {
      question: "Can I edit or delete my shared meals?",
      answer:
        "Yes, you can edit or delete any meal you have shared at any time from your profile dashboard.",
    },
    {
      question: "How do I contact PlateShare support?",
      answer:
        "You can reach our support team via the 'Contact Us' page, or email us at support@plateshare.com. We aim to respond within 24 hours.",
    },
  ];
  return (
    <main className="pt-10 px-3 lg:px-20">
      <div className={container}>
        <CommonTitleComponent
          title={"FAQ"}
          subtitle={`
            Have questions? Here are some common questions and answers
            to help you understand PlateShare better.
          `}
          margins={"mb-16"}
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box"
            >
              <div className="collapse-title text-lg font-medium text-primary">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content/80">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
