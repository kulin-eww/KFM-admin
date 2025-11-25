import { useState } from "react";
import ContainerImage from "../../assets/images/home/container-image.png";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqs = [
    {
      question: t("home.faq.question1"),
      answer:
        t("home.faq.answer1"),
    },
    {
      question: t("home.faq.question2"),
      answer: t("home.faq.answer2"),
    },
    {
      question: t("home.faq.question3"),
      answer:
        t("home.faq.answer3"),
    },
    {
      question: t("home.faq.question4"),
      answer: t("home.faq.answer4"),
    },
    {
      question: t("home.faq.question5"),
      answer: t("home.faq.answer5"),
    },
    {
      question: t("home.faq.question6"),
      answer: t("home.faq.answer6"),
    },
    {
      question: t("home.faq.question7"),
      answer: t("home.faq.answer7"),
    },
    {
      question: t("home.faq.question8"),
      answer: t("home.faq.answer8"),
    },
  ];

  return (
    <>
      <section id="faq" className="xl:py-24 lg:py-16 py-10 relative">
        <div className="max-w-[84rem] mx-auto px-4">
          <h2 className="lg:text-[44px]/14 md:text-4xl/11 text-3xl/8 font-semibold text-text-primary lg:mb-7 mb-5 text-center">
            {t("home.faq.title")}
          </h2>
          <div className="grid md:grid-cols-6 lg:gap-5 gap-4 items-start">
            <div className="lg:col-span-2 col-span-3 relative">
              <div className="w-full h-full rounded-2xl relative overflow-hidden">
                <img
                  src={ContainerImage}
                  alt="container-img"
                  className="w-full md:h-full lg:min-h-[678px] md:min-h-[650px] h-[300px] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-4 col-span-3 h-full">
              <div className="md:p-6 p-4 bg-white rounded-2xl h-full">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`flex flex-col xl:space-y-4.5 space-y-3 xl:gap-4.5 gap-3 xl:mb-4.5 mb-3 last:mb-0 ${
                      openIndex === index ? "border-b border-[#EDEDED]" : "border-b border-transparent"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-start flex gap-3 mb-0 items-center justify-between transition-colors duration-200 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-[#007A4721] min-w-11 w-11 h-11 rounded-lg flex justify-center items-center">
                          <svg
                            className="lg:w-5 lg:h-5 w-4 h-4 rtl:-scale-x-100"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.7507 2.1395C16.3264 1.71519 15.7446 1.48651 15.2609 1.34534C14.7397 1.19323 14.1374 1.08949 13.514 1.01671C12.264 0.870771 10.7842 0.833409 9.39283 0.844292C7.99371 0.855251 6.64857 0.915433 5.65561 0.972573C5.15835 1.00119 4.00461 1.08508 4.00461 1.08508C3.30735 1.14385 2.78977 1.75675 2.84854 2.454C2.90732 3.15123 3.52129 3.66871 4.2185 3.60998C4.2185 3.60998 5.31836 3.53011 5.8012 3.50233C6.76843 3.44666 8.0691 3.38867 9.41259 3.37815C10.7637 3.36759 12.1231 3.40547 13.2202 3.53355C13.3259 3.54589 13.4277 3.55891 13.5258 3.57261L0.681141 16.4172C0.186365 16.912 0.186365 17.7142 0.681141 18.209C1.17593 18.7037 1.97812 18.7037 2.47291 18.209L15.3177 5.36428C15.3314 5.46238 15.3444 5.56433 15.3567 5.67006C15.4848 6.76712 15.5227 8.12646 15.512 9.47755C15.5015 10.8212 15.4435 12.1217 15.3879 13.089C15.36 13.5719 15.28 14.6729 15.28 14.6729C15.2214 15.3701 15.7389 15.9829 16.4362 16.0417C17.1334 16.1005 17.7463 15.5821 17.8051 14.8847C17.8051 14.8847 17.889 13.7319 17.9176 13.2346C17.9748 12.2417 18.0349 10.8966 18.046 9.49744C18.0569 8.10606 18.0195 6.6262 17.8735 5.37622C17.8008 4.75288 17.697 4.15057 17.5449 3.62933C17.4037 3.14563 17.1751 2.56382 16.7507 2.1395Z"
                              fill="#007A47"
                            />
                          </svg>
                        </span>
                        <h3 className="lg:text-lg/normal text-base/5 font-semibold text-[#363636] pe-4">
                          {faq.question}
                        </h3>
                      </div>
                      <span className={`transition-transform duration-200 ${openIndex === index ? "rotate-90" : ""}`}>
                        <svg
                          className={`lg:w-5 lg:h-5 w-4 h-4 rtl:-scale-x-100 ${openIndex === index ? "opacity-0" : "opacity-100"}`}
                          width="23"
                          height="20"
                          viewBox="0 0 23 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22.1314 10.1985C22.1314 10.7784 21.8901 11.3323 21.656 11.7593C21.4037 12.2195 21.063 12.702 20.6867 13.1777C19.9322 14.1317 18.9465 15.1685 17.9882 16.112C17.0245 17.0606 16.0641 17.9388 15.3465 18.5783C14.9871 18.8986 14.1413 19.6297 14.1413 19.6297C13.6246 20.066 12.8521 20.0009 12.4157 19.4842C11.9794 18.9676 12.0454 18.1944 12.562 17.758C12.562 17.758 13.3682 17.061 13.7172 16.75C14.4162 16.127 15.3447 15.2778 16.27 14.3668C17.2006 13.4507 18.1037 12.4958 18.766 11.6585C18.8297 11.5779 18.8904 11.4994 18.9481 11.423L1.39212 11.423C0.715876 11.423 0.167626 10.8748 0.167642 10.1985C0.167669 9.52228 0.715885 8.97407 1.39213 8.97404L18.9482 8.97401C18.8905 8.89762 18.8298 8.81902 18.7659 8.73837C18.1037 7.90111 17.2007 6.94625 16.2701 6.03019C15.3446 5.11915 14.4162 4.27002 13.7171 3.64696C13.3681 3.33604 12.5611 2.63825 12.5611 2.63825C12.0445 2.20187 11.9794 1.42937 12.4157 0.912718C12.852 0.39607 13.6252 0.331479 14.1419 0.767864C14.1419 0.767864 14.9871 1.49837 15.3465 1.81865C16.0641 2.45816 17.0245 3.3363 17.9881 4.28491C18.9465 5.22833 19.9322 6.26521 20.6867 7.21918C21.063 7.69488 21.4037 8.1774 21.656 8.6376C21.8901 9.06462 22.1314 9.61851 22.1314 10.1985Z"
                            fill="#007A47"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out group ${
                        openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="xl:pb-5 pb-3">
                        <p className="text-[#7B7B7B] font-medium text-sm/5">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Faq;
