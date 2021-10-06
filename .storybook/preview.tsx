import { Meta } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators: Meta["decorators"] = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];
