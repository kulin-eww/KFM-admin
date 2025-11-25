import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { cmsAPI } from "../../api/cms";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";
import { useLocation } from "react-router-dom";

interface CMSPageProps {
  title: string;
}

const CMSPage: React.FC<CMSPageProps> = ({ title }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [cmsData, setCMSData] = useState<any>(null);
  const slug =
    title === "Privacy Policy"
      ? "privacy_policy"
      : title === "Terms & Conditions"
        ? "terms_and_conditions"
        : title === "About Us"
          ? "about_us"
          : "";
  const { data, isSuccess, isError, isFetched, isLoading } = useQuery({
    queryKey: ["cms", slug],
    queryFn: cmsAPI,
  });

  useEffect(() => {
    if (isSuccess) {
      const cmsPageData = data?.data?.find((item: any) => item?.name === slug);
      setCMSData(cmsPageData);
      setLoading(false);
    } else if (isError) {
      setCMSData([]);
      setLoading(false);
    }
  }, [data, isSuccess, isFetched, isError]);

  return (
    <>
      <div
        className={`bg-layout-bg shadow-md rounded-xl  ${location.pathname === "/privacy" || location.pathname === "/terms" || location.pathname === "/about" ? "px-8 md:px-16 lg:px-64 py-12 min-h-[calc(100vh-630px)]" : "px-4 py-4"}`}
      >
        <div className="">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <div className="border-b border-[#E2E2E2] mt-4 mb-4"></div>
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

          {/* Success */}
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
    </>
  );
};

export default CMSPage;
