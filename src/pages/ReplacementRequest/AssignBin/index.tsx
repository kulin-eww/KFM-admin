import { useTranslation } from "react-i18next";

const AssignBin: React.FC<{ replacementRequestDetailData: any }> = ({ replacementRequestDetailData }) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl border border-gray-200 p-3">
      <div className="text-lg font-medium mb-2">{t("replacementRequestDetails.toReplace")}: {replacementRequestDetailData?.totalContainerForReplaceMent}</div>
      {replacementRequestDetailData?.binWiseContainer?.map((bin: any) => (
        <div key={bin.id} className="mb-4 last:mb-0 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex gap-1 items-center justify-between rounded-t-lg px-3 py-3 bg-[#F7F7F7]">
            <div className="flex justify-start md:gap-2 gap-1 items-center">
              <h4 className="md:text-base/tight text-sm/tight font-medium text-green-700">{bin?.bin_size_name?.en}</h4>
              <p className="text-sm text-gray-500 font-medium">(Req. Qty: {bin.quantity})</p>
            </div>
            {/* <button
              type="button"
              className="delete-icon rounded-full transition-colors cursor-pointer"
              onClick={() => addItem(bin.id)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 0.25C5.06294 0.25 0.25 5.06294 0.25 11C0.25 16.9371 5.06294 21.75 11 21.75C16.9371 21.75 21.75 16.9371 21.75 11C21.75 5.06294 16.9371 0.25 11 0.25ZM12 7C12 6.44772 11.5523 6 11 6C10.4477 6 10 6.44772 10 7V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H10V15C10 15.5523 10.4477 16 11 16C11.5523 16 12 15.5523 12 15V12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H12V7Z"
                  fill="#007A47"
                />
              </svg>
            </button> */}
          </div>
          {/* Expanded Content */}
          {bin?.containers?.length > 0 && (
            <div className="flex justify-between items-center border-gray-200 border-t-0 border rounded-b-lg bg-white">
              <div className="flex flex-wrap 2xl:gap-4 gap-2 2xl:gap-y-2 max-h-[104px] overflow-auto sidebar-scroll p-3">
                {bin?.containers?.map((container: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#EDEDED] rounded-sm gap-2 px-3 py-2 2xl:min-w-30 xl:min-w-26 min-w-22"
                  >
                    <span className="md:text-sm text-xs font-medium text-gray-600">{container?.container_code}</span>
                    {/* <button
                      type="button"
                      className="plus-icon cursor-pointer flex items-center justify-between transition-colors"
                      onClick={() => removeItem(bin.id, index)}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.99984 0.0410156C13.9474 0.0410156 17.9582 4.0518 17.9582 8.99935C17.9582 13.9469 13.9474 17.9577 8.99984 17.9577C4.05229 17.9577 0.0415039 13.9469 0.0415039 8.99935C0.0415039 4.0518 4.05229 0.0410156 8.99984 0.0410156ZM7.02555 5.85319C6.69825 5.58624 6.21574 5.60509 5.91065 5.91016C5.60565 6.21526 5.58675 6.69779 5.85368 7.02507L5.91065 7.08854L7.82142 8.99935L5.91146 10.9102C5.58615 11.2356 5.58604 11.7632 5.91146 12.0885C6.2369 12.4137 6.76449 12.4138 7.08985 12.0885L8.99984 10.1778L10.9098 12.0885L10.9733 12.1455C11.3005 12.4124 11.7831 12.3934 12.0883 12.0885C12.3933 11.7836 12.4127 11.3009 12.146 10.9736L12.0883 10.9102L10.1774 8.99935L12.089 7.08854L12.146 7.02507C12.4129 6.69778 12.394 6.21526 12.089 5.91016C11.7839 5.60509 11.3014 5.58624 10.9741 5.85319L10.9107 5.91016L8.99984 7.82093L7.08903 5.91016L7.02555 5.85319Z"
                          fill="#FF4D4D"
                        />
                      </svg>
                    </button> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Save Button */}
      {/* <button className="ms-auto block w-full bg-primary hover:bg-primary/80 text-white text-base/tight py-3 px-6 lg:max-w-40 rounded-xl font-medium transition-colors cursor-pointer">
        Save
      </button> */}
    </div>
  );
};
export default AssignBin;
