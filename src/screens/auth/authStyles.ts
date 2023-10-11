import { StyleSheet } from 'react-native';
import { DesignLibrary } from '../../assets/DesignLibrary';


export default StyleSheet.create(
{
    safeContainer: {
        flex: 1,
        backgroundColor: DesignLibrary.color_pallete.login_blue["default"],
    },
    innerContainer: {
        flex: 1,
        padding: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePictureContainer: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 150,
        height: 150,
        marginTop: '10%',
        borderRadius: 75,
    },
    changeProfilePicture: {
        width: '70%',
        borderRadius: 10,
        marginVertical: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DesignLibrary.color_pallete.black_gradiant["50%"],
    },
    changeProfilePictureText: {
        marginVertical: '5%',
        fontSize: DesignLibrary.fontSizes.footerText,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
    },
    logoContainer: {
        // TODO : check what the following does
        // flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        aspectRatio: 1,
        marginTop: '10%',
    },
    titleText: {
        marginTop: '10%',
        marginBottom: '7.5%',
        textAlign: 'center',
        fontSize: DesignLibrary.fontSizes.header,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
    },
    errorContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontWeight: 'bold',
        fontSize: DesignLibrary.fontSizes.errorText,
        color: DesignLibrary.color_pallete.yellow_gradiant["default"],
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        backgroundColor: DesignLibrary.color_pallete.white_gradiant["20%"],
    },
    instrumentContainer: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: DesignLibrary.color_pallete.white_gradiant["default"],
        backgroundColor: DesignLibrary.color_pallete.white_gradiant["20%"],
    },
    instrumentInput: {
        width: '80%',
    },
    selectedInstrumentsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedInstrumentsText: {
        fontSize: 12,
        marginTop: '2.5%',
        color: DesignLibrary.color_pallete.white_gradiant["default"],
    },
    selectedInstrumentItems: {
        width: '100%',
        paddingHorizontal: '7%',
        borderRadius: 10,
        marginVertical: '5%',
        color: DesignLibrary.color_pallete.white_gradiant["default"],
        backgroundColor: DesignLibrary.color_pallete.white_gradiant["50%"],
    },
    selectedInstrument: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '7%',
        justifyContent: 'space-between',
    },
    selectedInstrumentText: {
        fontSize: 14,
        color: DesignLibrary.color_pallete.black_gradiant["default"],
    },
    buttonContainer: {
        width: '80%',
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
        backgroundColor: DesignLibrary.color_pallete.black_gradiant["70%"],
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: DesignLibrary.fontSizes.buttonText,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
    },
    footerText: {
        textDecorationLine: 'underline',
        fontSize: DesignLibrary.fontSizes.footerText,
        color: DesignLibrary.color_pallete.white_gradiant["default"],
    },

    // scrollContainer: {
    //     // TODO: fix leftover space at bottom
    //     flexGrow: 1,
    // },
});
