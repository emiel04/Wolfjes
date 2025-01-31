import { createVuetify } from "vuetify";
import type { VuetifyOptions } from "vuetify";
import { en, nl } from "vuetify/locale";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const theme: VuetifyOptions = {};

const vuetify = createVuetify({
    ...theme,
    locale: {
        locale: "en",
        fallback: "en",
        messages: { en, nl },
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    components,
    directives,
});

export default vuetify;
