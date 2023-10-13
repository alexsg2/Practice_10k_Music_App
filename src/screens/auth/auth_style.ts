import { StyleSheet } from 'react-native';
import { colorPallete, fontSizes } from '../../assets/DesignLibrary';


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
    errorContainer: {
        width: '90%',
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
    errorText: {
        fontWeight: 'bold',
        fontSize: fontSizes.normal,
        color: colorPallete.yellow_gradiant["default"],
    },
    labelText: {
        paddingLeft: '4%',
        fontSize: fontSizes.labels,
        color: colorPallete.white_gradiant["default"],
    },
    inputBox: {
        width: '100%',
        padding: '7%',
        color: 'white',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        backgroundColor: colorPallete.white_gradiant["20%"],
    },
    forgotText: {
        marginTop: '-7%',
        marginBottom: '5%',
        paddingRight: '2%',
        textAlign: 'right',
        fontStyle: 'italic',
        fontSize: fontSizes.footers,
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
        fontSize: fontSizes.buttons,
        color: colorPallete.white_gradiant["default"],
    },
    footerText: {
        fontSize: fontSizes.footers,
        textDecorationLine: 'underline',
        color: colorPallete.white_gradiant["default"],
    },
});


export { containerStyles, inputStyles, bottomStyles };
