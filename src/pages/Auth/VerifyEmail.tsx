import { useQuery } from "@tanstack/react-query";
import { verifyEmailAPI } from "../../api/auth";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@mui/material";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { data, isPending } = useQuery({
    queryKey: ["verify-email"],
    queryFn: () => verifyEmailAPI({ token: token, email: email }),
  });

  const isVerified = data?.is_verified;

  return (
    <>
      <div className="flex flex-col gap-12 w-full sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]">
        <div className="flex flex-col gap-3">
          {/* <div className="font-bold text-center text-3xl">Verify Email</div> */}
          {isPending ? (
            <p className="font-medium tracking-wide text-center text-2xl text-secondary">
              Verifying your email...
            </p>
          ) : isVerified ? (
            <p className="font-medium tracking-wide text-center text-2xl text-green-600">
              Your email is verified
            </p>
          ) : (
            <p className="font-medium tracking-wide text-center text-2xl text-red-600">
              Your email is not verified
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Link to="/signin" className="w-full">
            <Button variant="contained" color="primary" fullWidth>
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
