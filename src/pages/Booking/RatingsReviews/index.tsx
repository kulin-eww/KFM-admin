import { Rating } from "@mui/material";
import { ChevronRight } from "../../../components/common/icons";
import { useTranslation } from "react-i18next";

const RatingsReviews: React.FC<{ bookingDetailData: any }> = ({ bookingDetailData }) => {
  const { t } = useTranslation();
  return (
    <>
      {bookingDetailData?.reviewRating?.length > 0 && (
        <div className="rounded-xl border border-[#EDEDED] md:p-4 p-3 mt-4">
          <div className="flex justify-between gap-3 items-center pb-3 mb-3 border-b border-[#F7F7F7]">
            <h3 className="text-base/tight font-semibold text-primary">{t("bookingDetails.ratingAndReviews")}</h3>
          </div>

          <div className="flex gap-4">
            <img
              src={bookingDetailData?.reviewRating?.[0]?.user?.profile_image}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex justify-between items-start gap-2 pb-3 mb-3 border-b border-[#F7F7F7]">
              <div>
                <p className="font-medium text-base/tight text-[#363636] pb-1">
                  {bookingDetailData?.reviewRating?.[0]?.user?.name}
                </p>
                <p className="text-xs/tight font-medium text-[#676767]">
                  {bookingDetailData?.reviewRating?.[0]?.review}
                </p>
              </div>
              <div className="text-end">
                <p className="text-sm/tight font-semibold text-primary flex gap-1">
                  <Rating
                    name="half-rating"
                    readOnly
                    defaultValue={bookingDetailData?.reviewRating?.[0]?.rating}
                    precision={0.5}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingsReviews;
