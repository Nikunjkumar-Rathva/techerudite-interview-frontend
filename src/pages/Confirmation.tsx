import { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import { useConfirmUserMutationMutation } from "../generated/graphql";

const Confirmation = () => {
  const [confirmUser] = useConfirmUserMutationMutation();
  const [isValidating, setIsValidating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    (async () => {
      setIsValidating(true);

      const searchParams = new URLSearchParams(window.location.search);

      const userId = searchParams.get("userId");

      if (userId) {
        await verifyUser();
      } else {
        setIsValidating(false);
      }
    })();
  }, []);

  const verifyUser = async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);

      const userId = searchParams.get("userId");

      if (userId) {
        const response = await confirmUser({
          variables: {
            userId: parseInt(userId),
          },
        });

        if (response.data?.confirmUser.success) {
          alert(response.data?.confirmUser.msg);

          setIsVerified(true);
        } else {
          alert(response.data?.confirmUser.msg);
        }
        setIsValidating(false);
      }

      setKey(Math.random());
    } catch (err) {
      setIsValidating(false);

      console.log(err);
    }
  };

  if (isValidating) {
    return (
      <>
        <Container className="d-flex justify-content-center align-items-center">
          <Spinner />
        </Container>
      </>
    );
  }

  return (
    <Container
      key={key}
      className="d-flex justify-content-center align-items-center"
    >
      {!isVerified ? "Please check your email to verify" : "verified"}
    </Container>
  );
};

export default Confirmation;
