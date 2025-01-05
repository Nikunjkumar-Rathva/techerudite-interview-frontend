import { Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import { useAuthAdminUserMutation } from "../../generated/graphql";

interface IInitialValues {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter email"),
  password: Yup.string().min(6).max(12).required("Please enter password"),
});

const Login = () => {
  const [authAdmin] = useAuthAdminUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (
    values: IInitialValues,
    { setSubmitting, resetForm }: FormikHelpers<IInitialValues>
  ) => {
    try {
      setSubmitting(true);

      const response = await authAdmin({
        variables: {
          data: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (response.data?.authAdminUser.success) {
        alert(response.data?.authAdminUser.msg);
        navigate("/dashboard");
        resetForm();
      } else {
        alert(response.data?.authAdminUser.msg);
      }

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);

      console.log(err);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="w-50 m-5 p-5">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>

          <CardBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => {
                return (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          id="exampleEmail"
                          name="email"
                          placeholder="enter email"
                          type="email"
                          invalid={!!touched.email && !!errors.email}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {!!touched.email && !!errors.email && (
                          <FormFeedback>{errors.email}</FormFeedback>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                          id="examplePassword"
                          name="password"
                          placeholder="enter password"
                          type="password"
                          invalid={!!touched.password && !!errors.password}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {!!touched.password && !!errors.password && (
                          <FormFeedback>{errors.password}</FormFeedback>
                        )}
                      </FormGroup>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-3 w-100"
                      >
                        Submit
                      </Button>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </CardBody>

          <CardFooter className="p-3 d-flex justify-content-evenly">
            <Link to={"/admin/registration"}>Admin Registration</Link>
            <Link to={"/customer/registration"}>Customer Registration</Link>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default Login;
