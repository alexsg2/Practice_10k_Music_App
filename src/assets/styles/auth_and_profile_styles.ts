import { StyleSheet } from 'react-native';
import { colorPallete, fontSizes } from '../design_library';


// Styles for containers (and component boxes)
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
    inputContainer: {
        flex: 1,
        width: '90%',
    },
    buttonContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// Styles for components
const componentStyles = StyleSheet.create(
{
    authTitleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: '5%',
        fontSize: fontSizes.title,
        color: colorPallete.white_gradiant["default"],
    },
    profileTitleText: {
        marginTop: '5%',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: fontSizes.title,
        color: colorPallete.black_gradiant["default"],
    },
    authChangePictureButton: {
        width: '70%',
        borderRadius: 10,
        marginVertical: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPallete.black_gradiant["50%"],
    },
    profileChangePictureButton: {
        width: '70%',
        borderRadius: 10,
        marginVertical: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPallete.black_gradiant["60%"],
    },
    authChangeText: {
        fontWeight: 'bold',
        marginVertical: '5%',
        fontSize: fontSizes.footer,
        color: colorPallete.white_gradiant["default"],
    },
    profileChangeText: {
        fontWeight: 'bold',
        marginVertical: '5%',
        fontSize: fontSizes.footer,
        color: colorPallete.white_gradiant["default"],
    },
    authComponentButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colorPallete.white_gradiant["20%"],
    },
    profileComponentButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colorPallete.blue_gradiant["60%"],
    },
    defaultText: {
        alignSelf: 'center',
        fontSize: fontSizes.normal,
        color: colorPallete.grey_gradiant["50%"],
    },
    selectedText: {
        alignSelf: 'center',
        fontSize: fontSizes.normal,
        color: colorPallete.white_gradiant["default"],
    },
});

// Styles for input section
const inputStyles = StyleSheet.create(
{
    authLabelText: {
        paddingLeft: '4%',
        fontSize: fontSizes.label,
        color: colorPallete.white_gradiant["default"],
    },
    profileLabelText: {
        paddingLeft: '4%',
        fontSize: fontSizes.label,
        color: colorPallete.black_gradiant["default"],
    },
    authInputBox: {
        width: '100%',
        padding: '7%',
        color: 'white',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '7%',
        fontSize: fontSizes.normal,
        backgroundColor: colorPallete.white_gradiant["20%"],
    },
    profileInputBox: {
        width: '100%',
        padding: '7%',
        color: 'white',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '7%',
        fontSize: fontSizes.normal,
        backgroundColor: colorPallete.blue_gradiant["60%"],
    },
});

// Styles for bottom section
const bottomStyles = StyleSheet.create(
{
    blackButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPallete.black_gradiant["70%"],
    },
    redButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(209, 26, 42, 0.65)',
    },
    yellowButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPallete.yellow_gradiant["70%"],
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


export { containerStyles, componentStyles, inputStyles, bottomStyles };
