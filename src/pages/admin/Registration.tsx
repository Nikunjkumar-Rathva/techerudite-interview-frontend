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
import { useCreateUserMutationMutation } from "../../generated/graphql";

interface IInitialValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter first name"),
  lastName: Yup.string().required("Please enter last name"),
  email: Yup.string().email().required("Please enter email"),
  password: Yup.string().min(6).max(12).required("Please enter password"),
});

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [createAdmin] = useCreateUserMutationMutation();

  const handleSubmit = async (
    values: IInitialValues,
    { setSubmitting, resetForm }: FormikHelpers<IInitialValues>
  ) => {
    try {
      setSubmitting(true);

      const response = await createAdmin({
        variables: {
          data: {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            isAdmin: true,
            isCustomer: false,
          },
        },
      });

      if (response.data?.createUser.success) {
        alert(response.data?.createUser.msg);
        navigate("/confirmation");
        resetForm();
      } else {
        alert(response.data?.createUser.msg);
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
            <CardTitle>Admin Registration</CardTitle>
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
                setFieldValue,
                touched,
                values,
              }) => {
                return (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="exampleFirstName">First Name</Label>
                        <Input
                          id="exampleFirstName"
                          name="firstName"
                          placeholder="enter first name"
                          type="text"
                          invalid={!!touched.firstName && !!errors.firstName}
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        {!!touched.firstName && !!errors.firstName && (
                          <FormFeedback>{errors.firstName}</FormFeedback>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="exampleLastName">Last Name</Label>
                        <Input
                          id="exampleLastName"
                          name="lastName"
                          placeholder="enter last name"
                          type="text"
                          invalid={!!touched.lastName && !!errors.lastName}
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {!!touched.lastName && !!errors.lastName && (
                          <FormFeedback>{errors.lastName}</FormFeedback>
                        )}
                      </FormGroup>

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
            <Link to={"/login"}>Login?</Link>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default AdminRegistration;
