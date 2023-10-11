import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import ModalDropdown from 'react-native-modal-dropdown';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';


import authStyles from './authStyles';


const ProfileSetup = () =>
{
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    // const allAges = ["Select Your Age", "Under 12", "12-17", "18-24", "25-40", "41-65", "Above 65"];
    const [instrument, setInstrument] = useState('');
    const [instruments, setInstruments] = useState<string[]>([]);
    const [level, setLevel] = useState('');
    // const allLevels = ["Select Your Level", "Beginner/Amateur", "Intermediate", "Pre-collegiate", "University/Conservatory", "Professional"];
    

    async function handleSaveProfile() {
        // TODO: write the logic
    };

    const addInstrument = () => {
        if (instrument) {
          setInstruments([...instruments, instrument]);
          setInstrument('');
        }
    };
    
    const removeInstrument = (index) => {
        const updatedInstruments = [...instruments];
        updatedInstruments.splice(index, 1);
        setInstruments(updatedInstruments);
    };

    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={authStyles.innerContainer}>
                            <View style={authStyles.profilePictureContainer}>
                                <Image source={require('../../assets/images/blank-profile-picture.png')} style={authStyles.profilePicture}/>
                                <TouchableOpacity onPress={handleSaveProfile} style={authStyles.changeProfilePicture}>
                                    <Text style={authStyles.changeProfilePictureText}>Change Profile Picture</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={authStyles.inputContainer}>
                                <TextInput
                                    placeholder="Name"
                                    placeholderTextColor='white'
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                    style={authStyles.input}
                                />
                                {/* TODO: add age */}
                                <View style={authStyles.instrumentContainer}>
                                    <TextInput
                                        placeholder="Add Instrument"
                                        placeholderTextColor="white"
                                        onChangeText={(text) => setInstrument(text)}
                                        value={instrument}
                                        style={authStyles.instrumentInput}
                                        onSubmitEditing={addInstrument}
                                    />
                                    <TouchableOpacity onPress={addInstrument}>
                                        <Ionicons name="add-circle-outline" size={30} color="white"/>
                                    </TouchableOpacity>
                                </View>
                                {instruments.length > 0 && (
                                    <View style={authStyles.selectedInstrumentsContainer}>
                                        <Text style={authStyles.selectedInstrumentsText}>Added Instrument(s):</Text>
                                        <View style={authStyles.selectedInstrumentItems}>
                                            {instruments.map((instrument) => (
                                                <View key={instrument} style={authStyles.selectedInstrument}>
                                                    <Text style={authStyles.selectedInstrumentText}>{instrument}</Text>
                                                    <TouchableOpacity onPress={() => removeInstrument(instrument)}>
                                                        <Ionicons name="remove-circle-outline" size={30} color="white"/>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                )}
                                {/* TODO: add level */}
                                
                                {/* <ModalDropdown
                                    options={allAges}
                                    renderButtonText={(option) => option}
                                    defaultValue="Select Your Age"
                                    onSelect={(index, value) => setAge(value)}
                                    style={authStyles.dropdownContainer}
                                    textStyle={authStyles.dropdownText}
                                    ref={(ref) => (dropdownRef = ref)}
                                >
                                    {dropdownButton}
                                </ModalDropdown>
                                <ModalDropdown
                                    options={allLevels}
                                    defaultValue="Select Your Level"
                                    onSelect={(index, value) => setLevel(value)}
                                    style={authStyles.dropdownContainer}
                                    textStyle={authStyles.dropdownText}
                                /> */}
                            </View>
                            <View style={authStyles.buttonContainer}>
                                <TouchableOpacity onPress={handleSaveProfile} style={authStyles.button}>
                                    <Text style={authStyles.buttonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default ProfileSetup;
