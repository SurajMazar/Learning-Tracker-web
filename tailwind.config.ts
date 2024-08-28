import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./container/**/*.{js,ts,jsx,tsx,mdx}",
        "./container/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#7B8CDE',
            },
            fontFamily: {
                'display': ['gilroy'],
                'body': ['gilroy']
            },
        },
    },
    plugins: [],
};
export default config;
