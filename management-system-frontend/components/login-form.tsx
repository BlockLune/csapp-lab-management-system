'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, Flex, Heading, Text, TextField, Button, IconButton } from "@radix-ui/themes";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '@/scripts/api';
import { getRouteFromRole } from '@/scripts/auth';
import * as motion from "framer-motion/client"

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    setLoading(true);
                    const data = await login(values.username, values.password);
                    if (data) {
                        router.push(getRouteFromRole(data.roles));
                    } else {
                        alert('Invalid username or password');
                    }
                    setLoading(false);
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
                                            <TextField.Root id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...field} placeholder="Enter your password" >
                                                <TextField.Slot side="right">
                                                    <IconButton size="1" variant="ghost" onClick={() => setShowPassword((prev) => !prev)}>
                                                        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                                    </IconButton>
                                                </TextField.Slot>
                                            </TextField.Root>
                                        )}
                                    </Field>
                                </Flex>
                                <Flex gap="2" width="100%">
                                    <Button loading={loading} type="submit" variant="solid" style={{ flex: 1, cursor: "pointer" }}>Sign in</Button>
                                </Flex>
                            </Flex>
                        </Card>
                    </Form>
                )}
            </Formik>
        </motion.div >
    );
}
