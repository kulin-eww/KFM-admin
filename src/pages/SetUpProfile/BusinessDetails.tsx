import { Autocomplete, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

const BusinessDetails: React.FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formik: any;
  handleNext: () => Promise<void>;
}> = ({ setCurrentStep, formik, handleNext }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (!debouncedInputValue) {
      setSuggestions([]);
      return;
    }
    fetchAutocomplete(debouncedInputValue);
  }, [debouncedInputValue]);

  const fetchAutocomplete = async (input) => {
    const url = `https://places.googleapis.com/v1/places:autocomplete?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    if (!response.ok) {
      console.error("Autocomplete error:", await response.text());
      return;
    }
    const data = await response.json();
    setSuggestions(data.suggestions || []);
  };

  const fetchPlaceDetails = async (placeId) => {
    const url = `https://places.googleapis.com/v1/places/${placeId}?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&fields=location,formattedAddress,addressComponents`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error("Place Details error:", await response.text());
      return null;
    }

    const data = await response.json();
    
    // Parse address components
    const addressComponents = data.addressComponents || [];
    const parsedComponents: {
      country?: string;
      state?: string;
      city?: string;
      street_name?: string;
      building_number?: string;
      pincode?: string;
    } = {};
    
    addressComponents.forEach((component: any) => {
      const types = component.types || [];
      
      if (types.includes('country')) {
        parsedComponents.country = component.longText;
      }
      if (types.includes('administrative_area_level_1')) {
        parsedComponents.state = component.longText;
      }
      if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        parsedComponents.city = component.longText;
      }
      if (types.includes('route')) {
        parsedComponents.street_name = component.longText;
      }
      if (types.includes('street_number')) {
        parsedComponents.building_number = component.longText;
      }
      if (types.includes('postal_code')) {
        parsedComponents.pincode = component.longText;
      }
    });

    return {
      address: data.formattedAddress,
      lat: data.location?.latitude,
      lng: data.location?.longitude,
      ...parsedComponents
    };
  };

  const handleSelect = async (suggestion) => {
    const placeId = suggestion?.placePrediction?.placeId;
    if (!placeId) return;
    const details = await fetchPlaceDetails(placeId);
    if (details) {
      // Set all address-related fields
      formik.setFieldValue("address", details.address);
      formik.setFieldValue("lat", details.lat);
      formik.setFieldValue("lng", details.lng);
      
      // Set parsed address components
      if (details.country) formik.setFieldValue("country", details.country);
      if (details.state) formik.setFieldValue("state", details.state);
      if (details.city) formik.setFieldValue("city", details.city);
      if (details.street_name) formik.setFieldValue("street_name", details.street_name);
      if (details.building_number) formik.setFieldValue("building_number", details.building_number);
      if (details.pincode) formik.setFieldValue("pincode", details.pincode);
      
      setInputValue(details.address);
    }
    setSuggestions([]);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full sm:w-100 md:w-120 lg:w-100 xl:w-120">
        <Autocomplete
          fullWidth
          disablePortal
          options={suggestions}
          getOptionLabel={(option) => option.placePrediction?.text?.text ?? option.queryPrediction?.text?.text}
          onChange={(event, value) => {
            if (!value) {
              setInputValue("");
              formik.setFieldValue("address", "");
              formik.setFieldValue("lat", "");
              formik.setFieldValue("lng", "");
              formik.setFieldValue("country", "");
              formik.setFieldValue("state", "");
              formik.setFieldValue("city", "");
              formik.setFieldValue("street_name", "");
              formik.setFieldValue("building_number", "");
              formik.setFieldValue("pincode", "");
              return;
            }
            handleSelect(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("auth.setupProfile.businessDetails.addressLabel")}
              name="address"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                formik.setFieldValue("address", "");
                formik.setFieldValue("lat", "");
                formik.setFieldValue("lng", "");
                formik.setFieldValue("country", "");
                formik.setFieldValue("state", "");
                formik.setFieldValue("city", "");
                formik.setFieldValue("street_name", "");
                formik.setFieldValue("building_number", "");
                formik.setFieldValue("pincode", "");
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              placeholder={t("auth.setupProfile.businessDetails.addressPlaceholder")}
            />
          )}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.businessDetails.countryLabel")}
          name="country"
          type="text"
          placeholder={t("auth.setupProfile.businessDetails.countryPlaceholder")}
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.businessDetails.stateLabel")}
          name="state"
          type="text"
          placeholder={t("auth.setupProfile.businessDetails.statePlaceholder")}
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.businessDetails.cityLabel")}
          name="city"
          type="text"
          placeholder={t("auth.setupProfile.businessDetails.cityPlaceholder")}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.businessDetails.streetNameLabel")}
          name="street_name"
          type="text"
          placeholder={t("auth.setupProfile.businessDetails.streetNamePlaceholder")}
          value={formik.values.street_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.street_name && Boolean(formik.errors.street_name)}
          helperText={formik.touched.street_name && formik.errors.street_name}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.businessDetails.buildingNumberLabel")}
          name="building_number"
          type="text"
          placeholder={t("auth.setupProfile.businessDetails.buildingNumberPlaceholder")}
          value={formik.values.building_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.building_number && Boolean(formik.errors.building_number)}
          helperText={formik.touched.building_number && formik.errors.building_number}
        />

        <TextField
          fullWidth
          label={t("auth.setupProfile.businessDetails.postalCodeLabel")}
          name="pincode"
          type="text"
          placeholder={t("auth.setupProfile.businessDetails.postalCodePlaceholder")}
          value={formik.values.pincode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
        />

        <div className="flex flex-col md:flex-row gap-2 w-full mt-4">
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => {
              setCurrentStep(1);
              navigate("/setup/account");
            }}
          >
            {t("auth.setupProfile.businessDetails.backButton")}
          </Button>
          <Button fullWidth variant="contained" color="primary" onClick={handleNext}>
            {t("auth.setupProfile.businessDetails.nextButton")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BusinessDetails;
