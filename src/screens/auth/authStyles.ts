import { StyleSheet } from 'react-native';


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
        backgroundColor: '#5982C2',
    },
    innerContainer: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backContainer: {
        top: '10%',
        left: '-40%',
        position: 'relative',
    },
    back: {
        width: 30,
        height: 27,
        tintColor: 'white',
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
        fontSize: 30,
        color: 'white',
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
        fontSize: 14,
        color: 'yellow',
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
        color: 'white',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: '5%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 14,
        color: 'white',
        textDecorationLine: 'underline',
    },
});
