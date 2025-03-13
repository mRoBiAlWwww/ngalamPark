/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#01aed6",
                grayForm: "#B6B6B6",
                loginColor: "#F4FBF8",
            },
            fontFamily: {
                work: ["WorkSans"],
                workSemiBold: ["WorkSansSemiBold"],
                maison: ["Maison"],
            },
        },
    },
    plugins: [],
};
