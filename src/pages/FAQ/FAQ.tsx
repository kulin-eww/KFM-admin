import React, { useEffect, useState } from "react";
import { ChevronRightFaq } from "../../components/common/icons";
import { useQuery } from "@tanstack/react-query";
import { faqListAPI } from "../../api/faq";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";
import { useTranslation } from "react-i18next";

interface faqType {
  answer: string;
  question: string;
}

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<faqType[]>([]);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["faq"],
    queryFn: faqListAPI,
  });

  useEffect(() => {
    if (isSuccess) {
      setFaqData(data?.data || []);
    } else if (isError) {
      setFaqData([]);
    }
  }, [data, isSuccess, isError]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-layout-bg shadow-md rounded-xl px-6 py-4">
      <h3 className="text-xl font-bold">Frequently Asked Questions (FAQs)</h3>
      <div className="border-b border-[#E2E2E2] mt-4 mb-4"></div>
      <div className="divide-y divide-gray-200">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center h-32 text-primary text-xl font-bold">
            <Loader />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex justify-center items-center h-32 text-red-500 text-lg font-semibold">
            <ErrorLottie />
          </div>
        )}

        {/* Success */}
        {isSuccess && (
          <>
            {faqData.length > 0 ? (
              faqData.map((item, index) => (
                <div key={index} className="flex flex-col cursor-pointer">
                  <div className="flex justify-between items-center py-3" onClick={() => toggle(index)}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-secondary">{item?.question}</span>
                    </div>
                    <ChevronRightFaq
                      className={`w-4 h-4 text-secondary transform transition-transform duration-200 
                         ${openIndex === index ? "rotate-90" : "rtl:-rotate-180"}
                         ${openIndex === index && "rtl:rotate-90"}
                      `}
                    />
                  </div>

                  {/* Animated answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out text-gray-600 text-sm pl-8`}
                    style={{
                      maxHeight: openIndex === index ? "500px" : "0",
                    }}
                  >
                    <div className="py-3">{item?.answer}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-32 text-primary text-xl font-bold">
                No FAQs available.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FAQ;
