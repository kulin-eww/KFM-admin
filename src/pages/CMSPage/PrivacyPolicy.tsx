import { useTranslation } from "react-i18next";
import { cmsAPI } from "../../api/cms";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [cmsData, setCMSData] = useState<any>(null);
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["cms", "privacy_policy"],
    queryFn: cmsAPI,
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const cmsPageData = data?.data?.find((item: any) => item?.name === "privacy_policy");
      setCMSData(cmsPageData);
      setIsLoading(false);
    } else if (isError) {
      setCMSData([]);
      setIsLoading(false);
    }
  }, [data, isSuccess, isError]);

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <main className="flex-1">
        <section className="lg:py-16 py-10">
          <div className="max-w-[84rem] mx-auto px-4">
            <h1 className="text-primary text-2xl/tight font-extrabold md:mb-6 mb-4">{t("cms.privacyPolicy")}</h1>
            <div className="bg-white md:p-6 p-4 rounded-2xl">
              {isLoading && (
                <div className="flex justify-center items-center h-32 text-primary text-xl font-bold">
                  <Loader />
                </div>
              )}
              {isError && (
                <div className="flex justify-center items-center h-32 text-red-500 text-lg font-semibold">
                  <ErrorLottie />
                </div>
              )}
              {isSuccess && (
                <>
                  {cmsData ? (
                    <>
                      <h1 className="text-text-primary font-semibold text-lg">{cmsData?.show_name}</h1>
                      <div
                        className="flex flex-col cursor-pointer font-medium text-sm text-text-primary mt-2"
                        dangerouslySetInnerHTML={{ __html: cmsData?.value }}
                      ></div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-32 text-primary text-xl font-bold">
                      {t("cms.noData")}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
