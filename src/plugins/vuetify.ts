import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
  dark: false,
  colors: {
    // background: '#FFFFFF',
    // surface: '#FFFFFF',
    primary: "#6200ee",
    secondary: "#03dac5",
    // error: '#B00020',
    info: "#ff4f39",
    // success: '#4CAF50',
    // warning: '#FB8C00',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      myCustomLightTheme,
    },
  },
  components,
  directives,
});
