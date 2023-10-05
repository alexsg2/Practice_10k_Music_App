import { StyleSheet } from 'react-native';
import { DesignLibrary } from '../../assets/DesignLibrary';

// TODO: use library font and color themes

export default StyleSheet.create(
{
    scrollContainer: {
        // TODO: fix leftover space at bottom
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DesignLibrary.color_pallete.login_blue["default"],
    },
    innerContainer: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backContainer: {
        top: '7%',
        left: '-40%',
        position: 'relative',
    },
    logoContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        aspectRatio: 1,
        marginTop: '30%',
    },
    headerText: {
        fontSize: DesignLibrary.fontSizes.header,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
        textAlign: 'center',
        marginVertical: '5%',
    },
    errorContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '2.5%',
    },
    errorText: {
        fontSize: DesignLibrary.fontSizes.errorText,
        color: DesignLibrary.color_pallete.yellow_gradiant["default"],
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
        marginBottom: '5%',
    },
    input: {
        width: '100%',
        padding: '7%',
        color: DesignLibrary.color_pallete.white_gradiant["default"],
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '5%',
        justifyContent: 'center',
        backgroundColor: DesignLibrary.color_pallete.white_gradiant["20%"],
    },
    buttonContainer: {
        width: '80%',
        marginBottom: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DesignLibrary.color_pallete.white_gradiant["70%"],
    },
    buttonText: {
        fontSize: DesignLibrary.fontSizes.buttonText,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: DesignLibrary.fontSizes.footerText,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
        textDecorationLine: 'underline',
    },
});
