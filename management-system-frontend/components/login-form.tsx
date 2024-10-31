'use client';

import { Card, Flex, Heading, Text, TextField, Button } from "@radix-ui/themes";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Card variant="classic">
                        <Flex gap="5" direction="column" align="start" p="4" width="24rem">
                            <Heading as="h2">Sign in</Heading>
                            <Flex direction="column" gap="3" width="100%">
                                <Flex justify="between" align="center">
                                    <Text as="label" htmlFor="username">Username</Text>
                                    <ErrorMessage name="username" component="div" className="text-red-11 text-xs" />
                                </Flex>
                                <Field name="username">
                                    {({ field }: { field: any }) => (
                                        <TextField.Root id="username" {...field} placeholder="Enter your username" />
                                    )}
                                </Field>
                                <Flex justify="between" align="center">
                                    <Text as="label" htmlFor="password">Password</Text>
                                    <ErrorMessage name="password" component="div" className="text-red-11 text-xs" />
                                </Flex>
                                <Field name="password">
                                    {({ field }: { field: any }) => (
                                        <TextField.Root id="password" type="password" {...field} placeholder="Enter your password" />
                                    )}
                                </Field>
                            </Flex>
                            <Flex gap="2" width="100%">
                                <Button type="submit" variant="solid" style={{ flex: 1, cursor: "pointer" }}>Sign in</Button>
                            </Flex>
                        </Flex>
                    </Card>
                </Form>
            )}
        </Formik>
    );
}
