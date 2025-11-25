import { CalendarBellIcon } from "../../components/common/icons";
import { useTranslation } from "react-i18next";

const Reminder: React.FC<{ data: any }> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      {data?.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-lg font-medium text-text-primary"> {t("dashboard.reminders")}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {data?.map((item: any) => {
              return (
                <div className="bg-bg-secondary p-5 rounded-xl shadow-md">
                  <div className="flex flex-col gap-2 items-center justify-between h-full">
                    <div className="self-start">
                      <CalendarBellIcon />
                    </div>
                    <div className="text-sm text-center break-words overflow-hidden text-ellipsis line-clamp-3 w-full">
                      {item?.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Reminder;
