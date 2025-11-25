import { useEffect, useRef, useState } from "react";
import RentalAgreement from "../../../assets/images/booking/rental-agreement.png";
import { DownloadIcon, EyeIcon, PDFIcon } from "../../../components/common/icons";
import { useTranslation } from "react-i18next";

// const rentalAgreements = [
//   {
//     id: 1,
//     title: "Rental Agreement",
//     date: "25-08-2025 AM",
//   },
//   // {
//   //   id: 2,
//   //   title: "Rental Agreement",
//   //   date: "25-08-2025 AM",
//   // },
//   // {
//   //   id: 3,
//   //   title: "Rental Agreement",
//   //   date: "25-08-2025 AM",
//   // },
// ];

const RentalAgreementTab: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:gap-5 gap-3">
        {bookingDetailData?.rental_agreement ? (
          <div className="col-span-1 shadow-[0px_0px_8px_-2px_#00000014] relative">
            <figure className="bg-[#EDEDED] 2xl:p-8 p-6 !pb-0 h-[113px] rounded-t-xl overflow-hidden">
              <img src={RentalAgreement} alt="rental-agreement" className="object-cover h-full w-full object-top" />
            </figure>
            <div className="bg-white p-3 rounded-b-xl relative">
              {/* Header with document icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center md:space-x-2 space-x-1">
                  <div className="flex items-center justify-center">
                    <PDFIcon />
                  </div>
                  <div>
                    <h3 className="font-medium xl:text-sm/4 text-xs/tight text-[#545454] xl:pb-1">
                      {t("bookingDetails.rentalAgreement")}
                    </h3>
                    <p className="lg:text-xs/tight text-[10px] font-medium text-[#7B7B7B]">
                      {bookingDetailData?.booking_start_date_time?.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* Three dots menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={(e) => toggleDropdown(1, e)}
                    className="transition-colors duration-150 cursor-pointer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.2422 12C10.2422 11.0335 11.0257 10.25 11.9922 10.25H12.0012C12.9677 10.25 13.7512 11.0335 13.7512 12C13.7512 12.9665 12.9677 13.75 12.0012 13.75H11.9922C11.0257 13.75 10.2422 12.9665 10.2422 12Z"
                        fill="#888888"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.2344 18C10.2344 17.0335 11.0179 16.25 11.9844 16.25H11.9934C12.9599 16.25 13.7434 17.0335 13.7434 18C13.7434 18.9665 12.9599 19.75 11.9934 19.75H11.9844C11.0179 19.75 10.2344 18.9665 10.2344 18Z"
                        fill="#888888"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.25 6C10.25 5.0335 11.0335 4.25 12 4.25H12.009C12.9755 4.25 13.759 5.0335 13.759 6C13.759 6.9665 12.9755 7.75 12.009 7.75H12C11.0335 7.75 10.25 6.9665 10.25 6Z"
                        fill="#888888"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdownId === 1 && (
                    <div className="absolute end-0 top-3 p-3 z-50 w-30 bg-popover bg-white rounded-lg shadow-[0px_0px_4.68px_-1.17px_#00000014]]">
                      <button
                        onClick={() => {
                          setOpenDropdownId(null);
                          window.open(bookingDetailData?.rental_agreement, "_blank");
                        }}
                        className="flex items-center gap-2 w-full pb-2 mb-2 text-xs font-medium text-[#7B7B7B] transition-colors duration-150 border-b last:border-b-0 border-[#EDEDED] cursor-pointer hover:text-black"
                      >
                        <EyeIcon className="h-4" />
                        {t("bookingDetails.view")}
                      </button>
                      {/* <a href={bookingDetailData?.rental_agreement} download>
                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            window.open(bookingDetailData?.rental_agreement, "_blank");
                          }}
                          className="flex items-center gap-2 w-full text-xs font-medium text-[#7B7B7B] transition-colors duration-150 border-b last:border-b-0 border-[#EDEDED] cursor-pointer hover:text-black"
                        >
                          <DownloadIcon className="h-4 text-primary" />
                          Download
                        </button>
                      </a> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center font-medium text-secondary">
            <p>{t("bookingDetails.noRentalAgreement")}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default RentalAgreementTab;
