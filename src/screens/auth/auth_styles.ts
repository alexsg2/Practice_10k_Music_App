import { StyleSheet } from 'react-native';
import { colorPallete, fontSizes } from '../../assets/design_library';


// Styles for the containers
const containerStyles = StyleSheet.create(
{
    safeContainer: {
        flex: 1,
        backgroundColor: colorPallete.login_blue["default"],
    },
    innerContainer: {
        flex: 1,
        padding: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    introContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        width: '80%',
    },
    buttonContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


// Styles for the input section
const inputStyles = StyleSheet.create(
{
    labelText: {
        paddingLeft: '4%',
        fontSize: fontSizes.label,
        color: colorPallete.white_gradiant["default"],
    },
    inputBox: {
        width: '100%',
        padding: '7%',
        color: 'white',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        fontSize: fontSizes.normal,
        backgroundColor: colorPallete.white_gradiant["20%"],
    },
    forgotText: {
        marginTop: '-7%',
        marginBottom: '5%',
        paddingRight: '2%',
        textAlign: 'right',
        fontStyle: 'italic',
        fontSize: fontSizes.footer,
        color: colorPallete.white_gradiant["default"],
    },
});

// Styles for the button/footer section
const bottomStyles = StyleSheet.create(
{
    button: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPallete.black_gradiant["70%"],
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: fontSizes.button,
        color: colorPallete.white_gradiant["default"],
    },
    footerText: {
        fontSize: fontSizes.footer,
        textDecorationLine: 'underline',
        color: colorPallete.white_gradiant["default"],
    },
});


export { containerStyles, inputStyles, bottomStyles };
