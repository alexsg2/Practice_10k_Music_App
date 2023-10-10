const color_pallete = {
    yellow_gradiant: {
        'default': 'rgb(252, 194, 53)', // Default color without transparency
        '90%': 'rgba(252, 194, 53, 0.9)', // 90% occupancy color with 90% opacity
        '80%': 'rgba(252, 194, 53, 0.8)', // 80% occupancy color with 80% opacity
        '70%': 'rgba(252, 194, 53, 0.7)', // 70% occupancy color with 70% opacity
        '60%': 'rgba(252, 194, 53, 0.6)', // 60% occupancy color with 60% opacity
        '50%': 'rgba(252, 194, 53, 0.5)', // 50% occupancy color with 50% opacity
        '40%': 'rgba(252, 194, 53, 0.4)', // 40% occupancy color with 40% opacity
        '30%': 'rgba(252, 194, 53, 0.3)', // 30% occupancy color with 30% opacity
        '20%': 'rgba(252, 194, 53, 0.2)', // 20% occupancy color with 20% opacity
        '10%': 'rgba(252, 194, 53, 0.1)', // 10% occupancy color with 10% opacity
    },
    blue_gradiant: {
        'default': 'rgb(62, 152, 255)', // Default color without transparency
        '90%': 'rgba(62, 152, 255, 0.9)', // 90% occupancy color with 90% opacity
        '80%': 'rgba(62, 152, 255, 0.8)', // 80% occupancy color with 80% opacity
        '70%': 'rgba(62, 152, 255, 0.7)', // 70% occupancy color with 70% opacity
        '60%': 'rgba(62, 152, 255, 0.6)', // 60% occupancy color with 60% opacity
        '50%': 'rgba(62, 152, 255, 0.5)', // 50% occupancy color with 50% opacity
        '40%': 'rgba(62, 152, 255, 0.4)', // 40% occupancy color with 40% opacity
        '30%': 'rgba(62, 152, 255, 0.3)', // 30% occupancy color with 30% opacity
        '20%': 'rgba(62, 152, 255, 0.2)', // 20% occupancy color with 20% opacity
        '10%': 'rgba(62, 152, 255, 0.1)', // 10% occupancy color with 10% opacity
    },
    black_gradiant: {
        'default': 'rgb(0, 0, 0)', // Default color without transparency
        '90%': 'rgba(0, 0, 0, 0.9)', // 90% occupancy color with 90% opacity
        '80%': 'rgba(0, 0, 0, 0.8)', // 80% occupancy color with 80% opacity
        '70%': 'rgba(0, 0, 0, 0.7)', // 70% occupancy color with 70% opacity
        '60%': 'rgba(0, 0, 0, 0.6)', // 60% occupancy color with 60% opacity
        '50%': 'rgba(0, 0, 0, 0.5)', // 50% occupancy color with 50% opacity
        '40%': 'rgba(0, 0, 0, 0.4)', // 40% occupancy color with 40% opacity
        '30%': 'rgba(0, 0, 0, 0.3)', // 30% occupancy color with 30% opacity
        '20%': 'rgba(0, 0, 0, 0.2)', // 20% occupancy color with 20% opacity
        '10%': 'rgba(0, 0, 0, 0.1)', // 10% occupancy color with 10% opacity
    },
    cyan_gradiant: {
        'default': 'rgb(63, 116, 176)', // Default color without transparency
        '90%': 'rgba(63, 116, 176, 0.9)', // 90% occupancy color with 90% opacity
        '80%': 'rgba(63, 116, 176, 0.8)', // 80% occupancy color with 80% opacity
        '70%': 'rgba(63, 116, 176, 0.7)', // 70% occupancy color with 70% opacity
        '60%': 'rgba(63, 116, 176, 0.6)', // 60% occupancy color with 60% opacity
        '50%': 'rgba(63, 116, 176, 0.5)', // 50% occupancy color with 50% opacity
        '40%': 'rgba(63, 116, 176, 0.4)', // 40% occupancy color with 40% opacity
        '30%': 'rgba(63, 116, 176, 0.3)', // 30% occupancy color with 30% opacity
        '20%': 'rgba(63, 116, 176, 0.2)', // 20% occupancy color with 20% opacity
        '10%': 'rgba(63, 116, 176, 0.1)', // 10% occupancy color with 10% opacity
    },
    white_gradiant: {
        'default': 'rgb(255, 255, 255)', // Default white color without transparency
        '90%': 'rgba(255, 255, 255, 0.9)', // 90% occupancy color with 90% opacity
        '80%': 'rgba(255, 255, 255, 0.8)', // 80% occupancy color with 80% opacity
        '70%': 'rgba(255, 255, 255, 0.7)', // 70% occupancy color with 70% opacity
        '60%': 'rgba(255, 255, 255, 0.6)', // 60% occupancy color with 60% opacity
        '50%': 'rgba(255, 255, 255, 0.5)', // 50% occupancy color with 50% opacity
        '40%': 'rgba(255, 255, 255, 0.4)', // 40% occupancy color with 40% opacity
        '30%': 'rgba(255, 255, 255, 0.3)', // 30% occupancy color with 30% opacity
        '20%': 'rgba(255, 255, 255, 0.2)', // 20% occupancy color with 20% opacity
        '10%': 'rgba(255, 255, 255, 0.1)', // 10% occupancy color with 10% opacity
    },
    black: {
        'default': '#222425',
    },
    red: {
        'default': '#E64E4E',
    },
    green: {
        'default': '#079D94',
    },
    purple: {
        'default': '#7F079D',
    },
    login_blue: {
        'default': '#5982C2',
    }
};

const fontSizes = {
    header: 30,
    errorText: 14,
    buttonText: 18,
    footerText: 14,
};

//Call this in your Style sheet: import { DesignLibrary } from '../../assets/DesignLibrary'; <- This can change based on the folder
export const DesignLibrary = {
    color_pallete, //EXAMPLE: backgroundColor:  DesignLibrary.color_pallete.cyan_gradiant["default"]
                   //EXAMPLE 2: DesignLibrary.color_pallete.cyan_gradiant["40%"]
                   //EXAMPLE 3: DesignLibrary.color_pallete.red["default"]
    fontSizes, //EXAMPLE: fontSize: DesignLibrary.fontSizes.header
               //EXAMPLE 2: fontSize: DesignLibrary.fontSizes.buttonText
};
