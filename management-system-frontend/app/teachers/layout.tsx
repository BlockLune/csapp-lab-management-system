import { Flex, Box } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex width="100vw" height="100vh"
      align="center" justify="center"
      className="heropattern"
    >
      <Box maxWidth="768px">
        {children}
      </Box>
    </Flex>
  );
}

