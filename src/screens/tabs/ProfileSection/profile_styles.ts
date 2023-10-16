import { StyleSheet } from 'react-native';
import { colorPallete, fontSizes } from '../../../assets/design_library';


// Styles for the containers
const containerStyles = StyleSheet.create(
{
    safeContainer: {
        flex: 1,
        backgroundColor: '#ECF1F7',
    },
    innerContainer: {
        flex: 1,
        padding: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editContainer: {
        flex: 1,
        width: '90%',
        borderRadius: 10,
        marginBottom: '2%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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


// Styles for the input/edit section
const inputStyles = StyleSheet.create(
{
    changeButton: {
        width: '70%',
        borderRadius: 10,
        marginVertical: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        // TODO : demsese yale kelem
        backgroundColor: '#5982C2',
    },
    editButton: {
        borderRadius: 10,
        paddingVertical: '3%',
        alignItems: 'flex-end',
        paddingHorizontal: '5%',
        justifyContent: 'flex-end',
        // TODO : demsese yale kelem
        backgroundColor: '#5982C2',
    },
    editText: {
        fontWeight: 'bold',
        fontSize: fontSizes.label,
        color: colorPallete.white_gradiant["default"],
    },
    labelText: {
        paddingLeft: '4%',
        fontSize: fontSizes.label,
        color: colorPallete.black_gradiant["default"],
    },
    // TODO : Don't like this at all.
    inputBox: {
        width: '100%',
        padding: '7%',
        color: 'white',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '7%',
        fontSize: fontSizes.normal,
        backgroundColor: '#7BC3E9',
    },
    calendarButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#7BC3E9',
    },
    selectorButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginTop: '2.5%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#7BC3E9'
    }
});

// Styles for the button section
const bottomStyles = StyleSheet.create(
{
    blueButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        // TODO : demsese yale kelem
        backgroundColor: '#5982C2',
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
    // TODO: maybe ??
    yellowButton: {
        width: '100%',
        padding: '7%',
        borderRadius: 10,
        marginVertical: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(209, 26, 42, 0.65)',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: fontSizes.button,
        color: colorPallete.white_gradiant["default"],
    },
});


export { containerStyles, inputStyles, bottomStyles };
