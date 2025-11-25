import { Accordion, AccordionDetails, AccordionSummary, Box, Chip } from "@mui/material";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useTranslation } from "react-i18next";
dayjs.extend(duration);

const LateDeliveries: React.FC<{ driverWiseLateDeliveries: any }> = ({ driverWiseLateDeliveries }) => {
  const { t } = useTranslation();
  // Function to format seconds to readable time
  const formatSeconds = (seconds) => {
    const d = dayjs.duration(seconds, 'seconds');
    return `${d.hours()}h ${d.minutes()}m ${d.seconds()}s`;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        sx={{
          mb: 2,
          borderRadius: 4,
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          "&:before": { display: "none" },
          overflow: "hidden",
          "&.Mui-expanded": {
            borderRadius: 4,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<IoChevronDown />}
          sx={{
            borderRadius: "inherit",
            backgroundColor: "#f8f9fa",
            "& .MuiAccordionSummary-expandIconWrapper": {
              transform: "rotate(0deg)",
              transition: "transform 0.2s ease-in-out",
            },
            "&.Mui-expanded .MuiAccordionSummary-expandIconWrapper": {
              transform: "rotate(180deg)",
            },
          }}
        >
          <div className="text-lg font-semibold text-[#363636]">{t("bookingDetails.lateDeliveries")}</div>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            borderTop: "1px solid #e0e0e0",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            p: 2,
          }}
        >
          <div>
            {driverWiseLateDeliveries.map((driver, driverIndex) => (
              <div key={driver?.driver_id || driverIndex}>
                {driver?.deliveries &&
                  Array.isArray(driver.deliveries) &&
                  driver.deliveries.length > 0 &&
                  driver.deliveries.map((delivery, deliveryIndex) => (
                    <div
                      key={`${driver?.driver_id}-${delivery?.booking_id}-${deliveryIndex}`}
                      className="flex items-center justify-between p-1.5 mb-1 rounded-md bg-[#fafafa] border border-[#e0e0e0]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold min-w-[120px] text-sm">
                          {driver?.driver_name || "Unknown Driver"}
                        </span>
                        <Chip
                          label={
                            <span className="capitalize">
                              {delivery?.delivery_type?.replace("_", " ")?.replace("_", " ")}
                            </span>
                          }
                          size="small"
                          sx={{
                            backgroundColor: "#9e9e9e",
                            color: "white",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                          }}
                        />
                      </div>
                      <span className="font-semibold text-[#d32f2f] text-sm">
                        {delivery?.late_seconds ? formatSeconds(delivery?.late_seconds) : "N/A"}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LateDeliveries;
