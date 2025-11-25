import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "../common/icons";
import { useTranslation } from "react-i18next";

type Crumb = { label: string; to?: string };

const breadcrumbMap: Record<string, Crumb[]> = {
  "/player": [{ label: "palayersManagement" }],
  "/player/add": [{ label: "palayersManagement", to: "/player" }, { label: "addDriver" }],
  "/player/edit": [{ label: "palayersManagement", to: "/player" }, { label: "editDriver" }],
  "/player/view": [{ label: "palayersManagement", to: "/player" }, { label: "viewDriver" }],
  "/container": [{ label: "containerManagement" }],
  "/earnings": [{ label: "myEarnings" }],
  "/container/add": [{ label: "containerManagement", to: "/container" }, { label: "addContainer" }],
  "/container/edit": [{ label: "containerManagement", to: "/container" }, { label: "editContainer" }],
  "/container/view": [{ label: "containerManagement", to: "/container" }, { label: "viewContainer" }],
  "/users/edit": [{ label: "users", to: "/users" }, { label: "editUser" }],
  "/add-edit-user": [{ label: "users", to: "/users" }, { label: "editUser" }],
  "/cms": [{ label: "cmsManagement" }],
  "/edit-cms": [{ label: "cmsManagement", to: "/cms" }, { label: "editCMS" }],
  "/faq": [{ label: "faq" }],
  "/faq/add": [{ label: "faq", to: "/faq" }, { label: "addFAQ" }],
  "/faq/edit": [{ label: "faq", to: "/faq" }, { label: "editFAQ" }],
  "/contact-us": [{ label: "contactUs" }],
  "/contact-us/:id": [{ label: "contactUsDetails", to: "/contact-us" }, { label: "contactUsDetails" }],
  "/reports": [{ label: "reports" }],
  "/grace-period": [{ label: "gracePeriod" }],
  "/booking-renewal": [{ label: "bookingRenewalRequest" }],
  "/all-booking": [{ label: "allBookings" }],
  "/active-booking": [{ label: "activeBookings" }],
  "/upcoming-booking": [{ label: "upcomingBookings" }],
  "/past-booking": [{ label: "pastBookings" }],
  "/cancelled-booking": [{ label: "cancelledBookings" }],
  "/all-booking/detail": [{ label: "allBookings", to: "/all-booking" }, { label: "allBookingsDetail" }],
  "/operations": [{ label: "operations" }],
  "/penalty-payment": [{ label: "penaltyPayment" }],
  "/early-pickup": [{ label: "earlyPickup" }],
  "/removal-request": [{ label: "removalRequest" }],
  "/replacement-request": [{ label: "replacementRequest" }],
  "/replacement-request/detail": [
    { label: "replacementRequest", to: "/replacement-request" },
    { label: "replacementRequestDetail" },
  ],
  "/zone": [{ label: "zoneManagement" }],
  "/zone/add": [{ label: "zoneManagement", to: "/zone" }, { label: "addZone" }],
  "/zone/edit": [{ label: "zoneManagement", to: "/zone" }, { label: "editZone" }],
  "/zone/view": [{ label: "zoneManagement", to: "/zone" }, { label: "viewZone" }],
  "/new-booking": [{ label: "newBookings" }],
  "/profile": [{ label: "profile" }],
};

const BreadcrumbsNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const crumbs = breadcrumbMap[location.pathname];

  if (!crumbs) return null;

  return (
    <div className="mb-3">
      <Breadcrumbs
        separator={<ArrowRightIcon />}
        aria-label="breadcrumb"
        sx={{ fontSize: "0.875rem", display: "flex", alignItems: "center" }}
      >
        {/* Home breadcrumb item */}
        <Link
          component={RouterLink}
          to="/dashboard"
          color="inherit"
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.875rem",
          }}
        >
          {t("breadcrumbs.dashboard")}
        </Link>

        {/* Mapped crumbs */}
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          if (isLast || !crumb.to) {
            return (
              <Typography key={`${crumb.label}-${index}`} color="text.primary" sx={{ fontSize: "0.875rem" }}>
                {t(`breadcrumbs.${crumb.label}`)}
              </Typography>
            );
          }
          return (
            <Link
              key={`${crumb.label}-${index}`}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={crumb.to}
              sx={{ fontSize: "0.875rem" }}
            >
              {t(`breadcrumbs.${crumb.label}`)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsNav;
