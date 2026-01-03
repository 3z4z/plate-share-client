import { useEffect } from "react";
import { container } from "../utils/classNames";
import CommonTitleComponent from "../components/common/CommonTitle";

export default function OurPoliciesPage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const policies = [
    {
      title: "Privacy Policy",
      description:
        "We respect your privacy. Your personal data is safe with us and will only be used to improve your experience on PlateShare.",
    },
    {
      title: "Terms of Use",
      description:
        "By using PlateShare, you agree to our rules and guidelines. We strive to create a safe and positive environment for all users.",
    },
    {
      title: "Refund Policy",
      description:
        "For paid services or features, we ensure fair refund policies. Please contact our support for any requests regarding refunds.",
    },
    {
      title: "Community Guidelines",
      description:
        "We encourage friendly and respectful interaction. Any inappropriate behavior, content, or spamming will not be tolerated.",
    },
    {
      title: "Food Safety",
      description:
        "Users sharing meals or recipes must follow basic hygiene and safety practices. We are not liable for unsafe practices, but we encourage responsible sharing.",
    },
    {
      title: "Content Ownership",
      description:
        "All content shared on PlateShare remains the property of its creator. By sharing, you grant PlateShare a license to display and promote it within the platform.",
    },
  ];

  return (
    <main className="pt-10 px-3 lg:px-20">
      <div className={container}>
        <CommonTitleComponent
          title={"Our Policies"}
          subtitle={`
          At PlateShare, we value transparency and safety. Here are our key
          policies to ensure a positive experience for all users.
            `}
          margins={"mb-16"}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, idx) => (
            <div
              key={idx}
              className="bg-base-200 p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {policy.title}
              </h2>
              <p className="text-base-content/80">{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
