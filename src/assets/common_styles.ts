import { StyleSheet } from 'react-native';


const color_pallete =
{
    // Start of gradiant colors
    black_gradiant: {
        'default': 'rgb(0, 0, 0)',
        '70%': 'rgba(0, 0, 0, 0.7)',
        '60%': 'rgba(0, 0, 0, 0.6)',
        '50%': 'rgba(0, 0, 0, 0.5)',
        '40%': 'rgba(0, 0, 0, 0.4)',
        '20%': 'rgba(0, 0, 0, 0.2)',
    },

    white_gradiant: {
        'default': 'rgb(255, 255, 255)',
        '60%': 'rgba(255, 255, 255, 0.6)',
        '20%': 'rgba(255, 255, 255, 0.2)',
    },

    blue_gradiant: {
        'default': 'rgb(62, 152, 255)',
        '60%': 'rgba(62, 152, 255, 0.7)',
    },
    // End of gradiant colors

    // Start of regular Colors
    darkBlue: '#5982C2',

    lightBlue: '#7BC3E9',

    lightGrey: 'rgba(204, 204, 204, 0.5)', 

    darkGrey: '#333333',

    lightWhite: '#ECF1F7',

    lightRed: 'rgba(209, 26, 42, 0.65)',

    darkRed: '#E74E4E',

    purple: '#7F079D',

    highlightYellow: 'rgba(252, 194, 53, 0.5)',

    transparent: 'rgba(0, 0, 0, 0.5)',
    // End of regular Colors
};

const font_sizes =
{
    title: 35,
    headers: 25,
    sections: 20,
    buttons: 18,
    touchables: 16,
    inputs: 14,
    footers: 11,
};


// Actual Styles
const containers = StyleSheet.create(
{
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: color_pallete.black_gradiant['default'],
    },
    back: {
        flex: 1,
        left: '-35%',
        alignItems: 'flex-start',
    },
    headerTitle: {
        flex: 1,
        left: '-200%',
        alignItems: 'center',
    },
    innerView: {
        flex: 1,
        padding: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        width: '90%',
    },
    singleButton: {
        flex: 1,
        width: '80%',
        marginVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    doubleButton: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    safeModal: {
        flex: 0.70,
        width: '90%',
        borderRadius: 10,
        backgroundColor: color_pallete.lightWhite,
    },
    backgroundModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color_pallete.transparent,
    },
    innerModal: {
        width: '95%',
        padding: '5%',
        alignSelf: 'center',
        backgroundColor: color_pallete.lightWhite,
    },
    innerInnerModal: {
        width: '95%',
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    closeModal: {
        marginTop: '2%',
        alignItems: 'flex-end',
    },
    list: {
        width: '75%',
        padding: '2%',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    goal: {
        width: '100%',
        alignItems: 'center',
    },
});

const onLightBackground = StyleSheet.create(
{
    safeArea: {
        flex: 1,
        backgroundColor: color_pallete.lightWhite,
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: '5%',
        fontSize: font_sizes.title,
        color: color_pallete.black_gradiant['default'],
    },
    sectionText: {
        paddingTop: '3%',
        paddingBottom: '2%',
        paddingHorizontal: '4%',
        fontSize: font_sizes.sections,
        color: color_pallete.black_gradiant['default'],
    },
    inputBox: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '7%',
        fontSize: font_sizes.inputs,
        color: color_pallete.white_gradiant['default'],
        backgroundColor: color_pallete.blue_gradiant['60%'],
    },
    notesInputBox: {
        width: '100%',
        padding: '2%',
        borderRadius: 10,
        fontWeight: '300',
        marginBottom: '7%',
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: font_sizes.touchables,
        backgroundColor: color_pallete.lightWhite,
        color: color_pallete.black_gradiant['default'],
    },
    dropdown: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color_pallete.blue_gradiant['60%'],
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: font_sizes.buttons,
        color: color_pallete.black_gradiant['default'],
    },
});

const onDarkBackground = StyleSheet.create(
{
    safeArea: {
        flex: 1,
        backgroundColor: color_pallete.darkBlue,
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: '5%',
        fontSize: font_sizes.title,
        color: color_pallete.white_gradiant['default'],
    },
    sectionText: {
        paddingLeft: '4%',
        fontSize: font_sizes.sections,
        color: color_pallete.white_gradiant['default'],
    },
    inputBox: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '7%',
        fontSize: font_sizes.inputs,
        color: color_pallete.white_gradiant['default'],
        backgroundColor: color_pallete.white_gradiant['20%'],
    },
    dropdown: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color_pallete.white_gradiant['20%'],
    },   
    footer: {
        fontSize: font_sizes.inputs,
        textDecorationLine: 'underline',
        color: color_pallete.white_gradiant['default'],
    },  
});

const texts = StyleSheet.create(
{
    header: {
        fontWeight: 'bold',
        fontSize: font_sizes.headers,
    },
    button: {
        fontWeight: 'bold',
        fontSize: font_sizes.buttons,
        color: color_pallete.white_gradiant['default'],
    },
    changePicture: {
        fontWeight: 'bold',
        marginVertical: '5%',
        fontSize: font_sizes.inputs,
        color: color_pallete.white_gradiant['default'],
    },   
    default: {
        alignSelf: 'center',
        fontSize: font_sizes.inputs,
        color: color_pallete.lightGrey,
    },
    selected: {
        alignSelf: 'center',
        fontSize: font_sizes.inputs,
        color: color_pallete.white_gradiant['default'],
    },  
    list: {
        alignSelf: 'center',
        paddingHorizontal: '5%',
        fontSize: font_sizes.touchables,
    }, 
    empty: {
        alignSelf: 'center',
        marginVertical: '20%',
        fontSize: font_sizes.sections,
    },  
    listTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: '5%',
        paddingHorizontal: '5%',
        fontSize: font_sizes.buttons,
    }, 
    listField: {
        padding: '2%',
        fontWeight: 'bold',
        fontSize: font_sizes.buttons,
    },  
    listValue: {
        padding: '2%',
        fontSize: font_sizes.touchables,
    },
    cardTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: '7%',
        fontSize: font_sizes.title,
    },
    cardField: {
        padding: '2%',
        fontWeight: 'bold',
        fontSize: font_sizes.headers,
    },  
    cardValue: {
        padding: '2%',
        fontSize: font_sizes.sections,
    },
});

const buttons = StyleSheet.create(
{
    changePicture: {
        width: '70%',
        borderRadius: 10,
        marginVertical: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color_pallete.black_gradiant['60%'],
    },
    blueList: {
        width: '98%',
        padding: '5%',
        marginTop: '5%',
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: color_pallete.blue_gradiant['60%'],
    },
    largeBlack: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '3%',
        justifyContent: 'center',
        backgroundColor: color_pallete.black_gradiant['70%'],
    },
    largeRed: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '3%',
        justifyContent: 'center',
        backgroundColor: color_pallete.lightRed,
    },
    smallBlack: {
        width: '40%',
        padding: '5%',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '2.5%',
        marginHorizontal: '5%',
        backgroundColor: color_pallete.black_gradiant['70%'],
    },
    smallRed: {
        width: '40%',
        padding: '5%',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '2.5%',
        marginHorizontal: '5%',
        backgroundColor: color_pallete.lightRed,
    }, 
    smallBlue: {
        width: '43%',
        padding: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '2.5%',
        justifyContent: 'center',
        backgroundColor: color_pallete.blue_gradiant['60%'],
    },        
});


export { color_pallete, font_sizes, containers, onLightBackground, onDarkBackground, texts, buttons };
