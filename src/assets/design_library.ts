const colorPallete =
{
    login_blue: {
        'default': '#5982C2',
    },
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
    grey_gradiant: {
        'default': 'rgb(204, 204, 204)', // Default white color without transparency
        '90%': 'rgba(204, 204, 204, 0.9)', // 90% occupancy color with 90% opacity
        '80%': 'rgba(204, 204, 204, 0.8)', // 80% occupancy color with 80% opacity
        '70%': 'rgba(204, 204, 204, 0.7)', // 70% occupancy color with 70% opacity
        '60%': 'rgba(204, 204, 204, 0.6)', // 60% occupancy color with 60% opacity
        '50%': 'rgba(204, 204, 204, 0.5)', // 50% occupancy color with 50% opacity
        '40%': 'rgba(204, 204, 204, 0.4)', // 40% occupancy color with 40% opacity
        '30%': 'rgba(204, 204, 204, 0.3)', // 30% occupancy color with 30% opacity
        '20%': 'rgba(204, 204, 204, 0.2))', // 20% occupancy color with 20% opacity
        '10%': 'rgba(204, 204, 204, 0.1)', // 10% occupancy color with 10% opacity
    },
};

const fontSizes =
{
    title: 35,
    name: 24,
    button: 18,
    label: 16,
    normal: 14,
    footer: 13,
};


export { colorPallete, fontSizes };
