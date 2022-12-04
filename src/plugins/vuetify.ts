import {createVuetify} from 'vuetify'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const myCustomLightTheme = {
    dark: false,
    colors: {
        // background: '#FFFFFF',
        // surface: '#FFFFFF',
        primary: '#6200EE',
        secondary: '#03DAC6',
        // error: '#B00020',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FB8C00',
    }
}

export default createVuetify({
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        }
    },
    components,
    directives,
});
